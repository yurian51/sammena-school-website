import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { getRuntimeDbClient } from "@/lib/db/runtime"
import { apiError, mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { auditAction } from "@/lib/api/admin-audit"
import { AUDIT_ACTIONS } from "@/lib/audit/events"
import { placeInput, uuid } from "@/lib/enrollment/enrollment"

/** Active enrollments in the current academic year, optionally filtered to one class. */
export async function GET(request: Request) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "sis:students:read")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const classParam = new URL(request.url).searchParams.get("classId")
    const classId = classParam ? uuid.safeParse(classParam) : null
    if (classParam && (!classId || !classId.success)) return apiError("VALIDATION_ERROR", "A valid class is required.", 400, id)
    const { rows } = await getRuntimeDbClient().query(
      `select e.id, e.status, c.id as "classId", c.name as "className", s.id as "studentId", s.admission_number as "admissionNumber", s.first_name as "firstName", s.last_name as "lastName"
         from enrollments e
         join academic_years y on y.id = e.academic_year_id and y.is_current and y.school_id = e.school_id
         join classes c on c.id = e.class_id and c.school_id = e.school_id
         join students s on s.id = e.student_id and s.school_id = e.school_id
        where e.school_id = $1 and e.status = 'ACTIVE' and ($2::uuid is null or e.class_id = $2::uuid)
        order by c.level_order, s.first_name, s.last_name
        limit 1000`,
      [context.schoolId, classId?.success ? classId.data : null],
    )
    return Response.json({ data: rows, requestId: id }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) {
    return mapDomainError(error, id)
  }
}

/** Places an active student into a class for the current academic year. */
export async function POST(request: Request) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "sis:students:write")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const parsed = placeInput.safeParse(await request.json().catch((): null => null))
    if (!parsed.success) return apiError("VALIDATION_ERROR", "A student and a class are required.", 400, id)
    const db = getRuntimeDbClient()
    const { rows: year } = await db.query<{ id: string }>(`select id from academic_years where school_id = $1 and is_current limit 1`, [context.schoolId])
    if (!year[0]) return apiError("VALIDATION_ERROR", "No current academic year is set for this school.", 400, id)
    const { rows: found } = await db.query<{ ok: boolean }>(
      `select exists(select 1 from students s where s.id = $1 and s.school_id = $3 and s.is_active)
           and exists(select 1 from classes c where c.id = $2 and c.school_id = $3) as ok`,
      [parsed.data.studentId, parsed.data.classId, context.schoolId],
    )
    if (!found[0]?.ok) return apiError("NOT_FOUND", "The student or class was not found.", 404, id)
    const { rows } = await db.query<{ id: string }>(
      `insert into enrollments (school_id, student_id, academic_year_id, class_id, status)
       values ($1, $2, $3, $4, 'ACTIVE')
       on conflict (student_id, academic_year_id) do nothing
       returning id`,
      [context.schoolId, parsed.data.studentId, year[0].id, parsed.data.classId],
    )
    if (!rows[0]) return apiError("CONFLICT", "This student already has an enrollment for the current academic year.", 409, id)
    await auditAction(context, AUDIT_ACTIONS.ENROLLMENT_CHANGED, "enrollment", rows[0].id, id)
    return Response.json({ data: { id: rows[0].id }, requestId: id }, { status: 201 })
  } catch (error) {
    return mapDomainError(error, id)
  }
}
