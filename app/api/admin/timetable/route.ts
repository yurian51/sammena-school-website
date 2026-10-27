export const dynamic = "force-dynamic"
import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { getRuntimeDbClient } from "@/lib/db/runtime"
import { apiError, mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { auditAction } from "@/lib/api/admin-audit"
import { AUDIT_ACTIONS } from "@/lib/audit/events"
import { canActOnClass } from "@/lib/auth/teacher-scope"
import { periodsOverlap, timetableInput } from "@/lib/schedule/timetable"

export async function GET(request: Request) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "sis:timetable:read")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const classId = new URL(request.url).searchParams.get("classId") ?? ""
    if (!/^[0-9a-f-]{36}$/i.test(classId)) return apiError("VALIDATION_ERROR", "A class is required.", 400, id)
    if (!(await canActOnClass(context, classId))) return apiError("FORBIDDEN", "You are not assigned to this class.", 403, id)
    const { rows } = await getRuntimeDbClient().query(
      `select t.id, t.day_of_week as "dayOfWeek", t.period_number as "periodNumber", to_char(t.starts_at, 'HH24:MI') as "startsAt", to_char(t.ends_at, 'HH24:MI') as "endsAt", t.subject, t.teacher_name as "teacherName", t.room
         from student_timetable_entries t
         join academic_years y on y.id = t.academic_year_id and y.is_current
        where t.school_id = $1 and t.class_id = $2
        order by t.day_of_week, t.starts_at`,
      [context.schoolId, classId],
    )
    return Response.json({ data: rows, requestId: id }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) { return mapDomainError(error, id) }
}

export async function POST(request: Request) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "sis:timetable:write")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const parsed = timetableInput.safeParse(await request.json().catch((): null => null))
    if (!parsed.success) return apiError("VALIDATION_ERROR", parsed.error.issues[0]?.message ?? "Check the timetable entry.", 400, id)
    const t = parsed.data
    if (!(await canActOnClass(context, t.classId))) return apiError("FORBIDDEN", "You are not assigned to this class.", 403, id)
    const db = getRuntimeDbClient()
    const { rows: year } = await db.query<{ id: string }>(`select id from academic_years where school_id = $1 and is_current limit 1`, [context.schoolId])
    if (!year[0]) return apiError("VALIDATION_ERROR", "No current academic year is set for this school.", 400, id)
    const { rows: clash } = await db.query<{ startsAt: string; endsAt: string }>(
      `select to_char(starts_at,'HH24:MI') as "startsAt", to_char(ends_at,'HH24:MI') as "endsAt" from student_timetable_entries
        where school_id = $1 and class_id = $2 and academic_year_id = $3 and day_of_week = $4`,
      [context.schoolId, t.classId, year[0].id, t.dayOfWeek],
    )
    if (clash.some((c) => periodsOverlap(c.startsAt, c.endsAt, t.startsAt, t.endsAt))) {
      return apiError("CONFLICT", "This class already has a period at that time on this day.", 409, id)
    }
    const { rows } = await db.query<{ id: string }>(
      `insert into student_timetable_entries (school_id, academic_year_id, class_id, day_of_week, period_number, starts_at, ends_at, subject, teacher_name, room)
       values ($1,$2,$3,$4,$5,$6::time,$7::time,$8,nullif($9,''),nullif($10,'')) returning id`,
      [context.schoolId, year[0].id, t.classId, t.dayOfWeek, t.periodNumber, t.startsAt, t.endsAt, t.subject, t.teacherName, t.room],
    )
    await auditAction(context, AUDIT_ACTIONS.TIMETABLE_CHANGED, "timetable_entry", rows[0]?.id, id)
    return Response.json({ data: { id: rows[0]?.id }, requestId: id }, { status: 201 })
  } catch (error) { return mapDomainError(error, id) }
}
