import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { getRuntimeDbClient } from "@/lib/db/runtime"
import { apiError, mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { auditAction } from "@/lib/api/admin-audit"
import { AUDIT_ACTIONS } from "@/lib/audit/events"
import { uuid } from "@/lib/enrollment/enrollment"

/** Removes the link between a student and a guardian. The guardian record is kept for other students. */
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string; guardianId: string }> }) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "sis:students:write")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const p = await params
    const studentId = uuid.safeParse(p.id)
    const guardianId = uuid.safeParse(p.guardianId)
    if (!studentId.success || !guardianId.success) return apiError("NOT_FOUND", "The guardian link was not found.", 404, id)
    const { rows } = await getRuntimeDbClient().query(
      `delete from student_guardians sg using guardians g
        where sg.student_id = $1 and sg.guardian_id = $2 and g.id = sg.guardian_id and g.school_id = $3
        returning sg.guardian_id as "guardianId"`,
      [studentId.data, guardianId.data, context.schoolId],
    )
    if (!rows[0]) return apiError("NOT_FOUND", "The guardian link was not found.", 404, id)
    await auditAction(context, AUDIT_ACTIONS.GUARDIAN_UNLINKED, "student", studentId.data, id)
    return Response.json({ data: rows[0], requestId: id })
  } catch (error) {
    return mapDomainError(error, id)
  }
}
