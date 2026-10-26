import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { getRuntimeDbClient, ensurePostgresDbClient } from "@/lib/db/runtime"
import { apiError, mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { auditAction } from "@/lib/api/admin-audit"
import { AUDIT_ACTIONS } from "@/lib/audit/events"
import { guardianInput, uuid } from "@/lib/enrollment/enrollment"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "sis:students:read")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const studentId = uuid.safeParse((await params).id)
    if (!studentId.success) return apiError("NOT_FOUND", "The student was not found.", 404, id)
    const { rows } = await getRuntimeDbClient().query(
      `select g.id, g.full_name as "fullName", g.phone, g.email, g.relationship, sg.is_primary as "isPrimary"
         from student_guardians sg
         join guardians g on g.id = sg.guardian_id
        where sg.student_id = $1 and g.school_id = $2
        order by sg.is_primary desc, g.full_name`,
      [studentId.data, context.schoolId],
    )
    return Response.json({ data: rows, requestId: id }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) {
    return mapDomainError(error, id)
  }
}

/** Creates a guardian and links them to the student. Setting a primary guardian demotes the previous one atomically. */
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = requestId(request)
  const client = await ensurePostgresDbClient().connect()
  try {
    const context = requireAuthorized(await getAuthContext(request), "sis:students:write")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const studentId = uuid.safeParse((await params).id)
    if (!studentId.success) return apiError("NOT_FOUND", "The student was not found.", 404, id)
    const parsed = guardianInput.safeParse(await request.json().catch((): null => null))
    if (!parsed.success) return apiError("VALIDATION_ERROR", "Check the guardian details and try again.", 400, id)
    const g = parsed.data

    await client.query("begin")
    const { rows: student } = await client.query(`select id from students where id = $1 and school_id = $2 for update`, [studentId.data, context.schoolId])
    if (!student[0]) { await client.query("rollback"); return apiError("NOT_FOUND", "The student was not found.", 404, id) }
    if (g.isPrimary) await client.query(`update student_guardians set is_primary = false where student_id = $1`, [studentId.data])
    const { rows: guardian } = await client.query<{ id: string }>(
      `insert into guardians (school_id, full_name, phone, email, relationship) values ($1, $2, $3, $4, $5) returning id`,
      [context.schoolId, g.fullName, g.phone, g.email || null, g.relationship],
    )
    await client.query(
      `insert into student_guardians (student_id, guardian_id, is_primary) values ($1, $2, $3)`,
      [studentId.data, guardian[0]?.id, g.isPrimary],
    )
    await client.query("commit")
    await auditAction(context, AUDIT_ACTIONS.GUARDIAN_LINKED, "student", studentId.data, id)
    return Response.json({ data: { id: guardian[0]?.id }, requestId: id }, { status: 201 })
  } catch (error) {
    await client.query("rollback").catch((): undefined => undefined)
    return mapDomainError(error, id)
  } finally {
    client.release()
  }
}
