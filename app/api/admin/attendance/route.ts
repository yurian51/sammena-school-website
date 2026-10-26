import { z } from "zod"
import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { getRuntimeDbClient } from "@/lib/db/runtime"
import { apiError, mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { auditAction } from "@/lib/api/admin-audit"
import { AUDIT_ACTIONS } from "@/lib/audit/events"
import { attendanceRosterQuery, attendanceSubmission, findDuplicateStudents, isNotInFuture, isValidCalendarDate } from "@/lib/attendance/attendance"

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/** Roster for one class on one date: active students in the current academic year, with any saved status. */
export async function GET(request: Request) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "attendance:read")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const query = attendanceRosterQuery.safeParse(Object.fromEntries(new URL(request.url).searchParams))
    if (!query.success || !isValidCalendarDate(query.data.date)) return apiError("VALIDATION_ERROR", "A valid class and date are required.", 400, id)

    const { rows } = await getRuntimeDbClient().query(
      `select s.id as "studentId", s.admission_number as "admissionNumber", s.first_name as "firstName", s.last_name as "lastName", a.status as "status"
         from enrollments e
         join academic_years y on y.id = e.academic_year_id and y.is_current and y.school_id = e.school_id
         join students s on s.id = e.student_id and s.school_id = e.school_id
         left join attendance_records a on a.student_id = s.id and a.attendance_date = $3::date and a.school_id = e.school_id
        where e.school_id = $1 and e.class_id = $2 and e.status = 'ACTIVE' and s.is_active = true
        order by s.first_name, s.last_name`,
      [context.schoolId, query.data.classId, query.data.date],
    )
    return Response.json({ data: rows, requestId: id }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) {
    return mapDomainError(error, id)
  }
}

/** Saves a whole class roster for one date in a single statement. Every student must be enrolled in that class. */
export async function POST(request: Request) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "attendance:write")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const body: unknown = await request.json().catch((): null => null)
    const parsed = attendanceSubmission.safeParse(body)
    if (!parsed.success || !isValidCalendarDate(parsed.data.date)) return apiError("VALIDATION_ERROR", "Attendance could not be saved. Check the class, date and statuses.", 400, id)
    if (!isNotInFuture(parsed.data.date)) return apiError("VALIDATION_ERROR", "Attendance cannot be recorded for a future date.", 400, id)
    if (findDuplicateStudents(parsed.data.records).length > 0) return apiError("VALIDATION_ERROR", "A student appears more than once in this submission.", 400, id)

    const db = getRuntimeDbClient()
    const studentIds = parsed.data.records.map((record) => record.studentId)
    const { rows: enrolled } = await db.query<{ count: number }>(
      `select count(*)::int as count
         from enrollments e
         join academic_years y on y.id = e.academic_year_id and y.is_current and y.school_id = e.school_id
         join students s on s.id = e.student_id and s.school_id = e.school_id
        where e.school_id = $1 and e.class_id = $2 and e.status = 'ACTIVE' and s.is_active = true and e.student_id = any($3::uuid[])`,
      [context.schoolId, parsed.data.classId, studentIds],
    )
    if (enrolled[0]?.count !== studentIds.length) {
      return apiError("VALIDATION_ERROR", "Some students are not active members of this class in the current academic year.", 400, id)
    }

    const recordedBy = UUID.test(context.userId ?? "") ? context.userId : null
    await db.query(
      `insert into attendance_records (school_id, student_id, attendance_date, status, recorded_by)
       select $1, x.student_id, $2::date, x.status, $3::uuid
         from unnest($4::uuid[], $5::text[]) as x(student_id, status)
       on conflict (student_id, attendance_date)
       do update set status = excluded.status, recorded_by = excluded.recorded_by`,
      [context.schoolId, parsed.data.date, recordedBy, studentIds, parsed.data.records.map((record) => record.status)],
    )

    await auditAction(context, AUDIT_ACTIONS.ATTENDANCE_RECORDED, "attendance_class", parsed.data.classId, id)
    return Response.json({ data: { saved: studentIds.length }, requestId: id }, { status: 200 })
  } catch (error) {
    return mapDomainError(error, id)
  }
}

