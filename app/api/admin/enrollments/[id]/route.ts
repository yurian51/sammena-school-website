import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { getRuntimeDbClient } from "@/lib/db/runtime"
import { apiError, mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { auditAction } from "@/lib/api/admin-audit"
import { AUDIT_ACTIONS } from "@/lib/audit/events"
import { closeInput, moveInput, uuid } from "@/lib/enrollment/enrollment"

/** Moves an active enrollment to another class in the same academic year. */
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "sis:students:write")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const enrollmentId = uuid.safeParse((await params).id)
    if (!enrollmentId.success) return apiError("NOT_FOUND", "The enrollment was not found.", 404, id)
    const parsed = moveInput.safeParse(await request.json().catch((): null => null))
    if (!parsed.success) return apiError("VALIDATION_ERROR", "A target class is required.", 400, id)
    const { rows } = await getRuntimeDbClient().query(
      `update enrollments e set class_id = $3
         from classes c
        where e.id = $1 and e.school_id = $2 and e.status = 'ACTIVE'
          and c.id = $3 and c.school_id = $2
        returning e.id, e.class_id as "classId"`,
      [enrollmentId.data, context.schoolId, parsed.data.classId],
    )
    if (!rows[0]) return apiError("NOT_FOUND", "The active enrollment or target class was not found.", 404, id)
    await auditAction(context, AUDIT_ACTIONS.ENROLLMENT_CHANGED, "enrollment", enrollmentId.data, id)
    return Response.json({ data: rows[0], requestId: id })
  } catch (error) {
    return mapDomainError(error, id)
  }
}

/** Closes an active enrollment (transferred out or made inactive). The row is kept for history. */
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "sis:students:write")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const enrollmentId = uuid.safeParse((await params).id)
    if (!enrollmentId.success) return apiError("NOT_FOUND", "The enrollment was not found.", 404, id)
    const parsed = closeInput.safeParse(await request.json().catch((): null => null))
    if (!parsed.success) return apiError("VALIDATION_ERROR", "A closing status is required.", 400, id)
    const { rows } = await getRuntimeDbClient().query(
      `update enrollments set status = $3, ended_on = current_date where id = $1 and school_id = $2 and status = 'ACTIVE' returning id, status`,
      [enrollmentId.data, context.schoolId, parsed.data.status],
    )
    if (!rows[0]) return apiError("NOT_FOUND", "The active enrollment was not found.", 404, id)
    await auditAction(context, AUDIT_ACTIONS.ENROLLMENT_CHANGED, "enrollment", enrollmentId.data, id)
    return Response.json({ data: rows[0], requestId: id })
  } catch (error) {
    return mapDomainError(error, id)
  }
}
