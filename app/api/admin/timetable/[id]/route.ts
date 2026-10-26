import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { getRuntimeDbClient } from "@/lib/db/runtime"
import { apiError, mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { auditAction } from "@/lib/api/admin-audit"
import { AUDIT_ACTIONS } from "@/lib/audit/events"
import { canActOnClass } from "@/lib/auth/teacher-scope"

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "sis:timetable:write")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const entryId = (await params).id
    if (!/^[0-9a-f-]{36}$/i.test(entryId)) return apiError("NOT_FOUND", "The entry was not found.", 404, id)
    const db = getRuntimeDbClient()
    const { rows: found } = await db.query<{ class_id: string }>(`select class_id from student_timetable_entries where id = $1 and school_id = $2`, [entryId, context.schoolId])
    if (!found[0]) return apiError("NOT_FOUND", "The entry was not found.", 404, id)
    if (!(await canActOnClass(context, found[0].class_id))) return apiError("FORBIDDEN", "You are not assigned to this class.", 403, id)
    await db.query(`delete from student_timetable_entries where id = $1 and school_id = $2`, [entryId, context.schoolId])
    await auditAction(context, AUDIT_ACTIONS.TIMETABLE_CHANGED, "timetable_entry", entryId, id)
    return Response.json({ data: { deleted: true }, requestId: id })
  } catch (error) { return mapDomainError(error, id) }
}
