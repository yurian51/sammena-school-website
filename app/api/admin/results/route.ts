export const dynamic = "force-dynamic"
import { z } from "zod"
import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { ensurePostgresDbClient, getRuntimeDbClient } from "@/lib/db/runtime"
import { apiError, mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { auditAction } from "@/lib/api/admin-audit"
import { AUDIT_ACTIONS } from "@/lib/audit/events"
import { canActOnClass } from "@/lib/auth/teacher-scope"

const assessmentKey = z.object({
  classId: z.string().uuid(),
  subject: z.string().trim().min(1).max(120),
  term: z.string().trim().min(1).max(40),
  assessmentName: z.string().trim().min(1).max(120),
})

const saveInput = assessmentKey.extend({
  maxScore: z.number().positive().max(10000),
  assessedOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  scores: z.array(z.object({ studentId: z.string().uuid(), score: z.number().min(0) })).min(1).max(1000),
})

/** Students in the class (current year) with their saved score for one assessment. */
export async function GET(request: Request) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "results:read")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const q = assessmentKey.safeParse(Object.fromEntries(new URL(request.url).searchParams))
    if (!q.success) return apiError("VALIDATION_ERROR", "Class, subject, term and assessment are required.", 400, id)
    if (!(await canActOnClass(context, q.data.classId))) return apiError("FORBIDDEN", "You are not assigned to this class.", 403, id)
    const { rows } = await getRuntimeDbClient().query(
      `select s.id as "studentId", s.admission_number as "admissionNumber", s.first_name as "firstName", s.last_name as "lastName", a.score, a.max_score as "maxScore"
         from enrollments e
         join academic_years y on y.id = e.academic_year_id and y.is_current and y.school_id = e.school_id
         join students s on s.id = e.student_id and s.school_id = e.school_id
         left join assessments a on a.student_id = s.id and a.school_id = e.school_id and a.subject = $3 and a.term = $4 and a.assessment_name = $5
        where e.school_id = $1 and e.class_id = $2 and e.status = 'ACTIVE' and s.is_active
        order by s.first_name, s.last_name`,
      [context.schoolId, q.data.classId, q.data.subject, q.data.term, q.data.assessmentName],
    )
    return Response.json({ data: rows, requestId: id }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) { return mapDomainError(error, id) }
}

/** Saves one assessment for a class in a single transaction. Replaces earlier scores for the same assessment. */
export async function POST(request: Request) {
  const id = requestId(request)
  const client = await ensurePostgresDbClient().connect()
  try {
    const context = requireAuthorized(await getAuthContext(request), "results:write")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const parsed = saveInput.safeParse(await request.json().catch((): null => null))
    if (!parsed.success) return apiError("VALIDATION_ERROR", "Check the assessment and scores.", 400, id)
    const d = parsed.data
    if (d.scores.some((s) => s.score > d.maxScore)) return apiError("VALIDATION_ERROR", "A score is higher than the maximum for this assessment.", 400, id)
    if (new Set(d.scores.map((s) => s.studentId)).size !== d.scores.length) return apiError("VALIDATION_ERROR", "A student appears more than once.", 400, id)
    if (!(await canActOnClass(context, d.classId))) return apiError("FORBIDDEN", "You are not assigned to this class.", 403, id)

    await client.query("begin")
    const { rows: enrolled } = await client.query<{ count: number }>(
      `select count(*)::int as count from enrollments e join academic_years y on y.id = e.academic_year_id and y.is_current
        where e.school_id = $1 and e.class_id = $2 and e.status = 'ACTIVE' and e.student_id = any($3::uuid[])`,
      [context.schoolId, d.classId, d.scores.map((s) => s.studentId)],
    )
    if (enrolled[0]?.count !== d.scores.length) { await client.query("rollback"); return apiError("VALIDATION_ERROR", "Some students are not active members of this class.", 400, id) }

    await client.query(
      `delete from assessments where school_id = $1 and subject = $2 and term = $3 and assessment_name = $4 and student_id = any($5::uuid[])`,
      [context.schoolId, d.subject, d.term, d.assessmentName, d.scores.map((s) => s.studentId)],
    )
    await client.query(
      `insert into assessments (school_id, student_id, subject, assessment_name, term, score, max_score, assessed_at)
       select $1, x.student_id, $2, $3, $4, x.score, $5, $6::date from unnest($7::uuid[], $8::numeric[]) as x(student_id, score)`,
      [context.schoolId, d.subject, d.assessmentName, d.term, d.maxScore, d.assessedOn, d.scores.map((s) => s.studentId), d.scores.map((s) => s.score)],
    )
    await client.query("commit")
    await auditAction(context, AUDIT_ACTIONS.RESULT_RECORDED, "assessment_class", d.classId, id)
    return Response.json({ data: { saved: d.scores.length }, requestId: id })
  } catch (error) {
    await client.query("rollback").catch((): undefined => undefined)
    return mapDomainError(error, id)
  } finally { client.release() }
}
