export const dynamic = "force-dynamic"
import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { getRuntimeDbClient } from "@/lib/db/runtime"
import { apiError, mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { auditAction } from "@/lib/api/admin-audit"
import { AUDIT_ACTIONS } from "@/lib/audit/events"
import { z } from "zod"

export async function DELETE(request: Request, { params }: { params: Promise<{ userId: string; classId: string }> }) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "teaching:assign")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const parsed = z.object({ userId: z.string().uuid(), classId: z.string().uuid() }).safeParse(await params)
    if (!parsed.success) return apiError("NOT_FOUND", "The assignment was not found.", 404, id)
    const { rows } = await getRuntimeDbClient().query(
      `delete from teacher_class_assignments where user_id = $1 and class_id = $2 and school_id = $3 returning class_id`,
      [parsed.data.userId, parsed.data.classId, context.schoolId],
    )
    if (!rows[0]) return apiError("NOT_FOUND", "The assignment was not found.", 404, id)
    await auditAction(context, AUDIT_ACTIONS.TEACHER_UNASSIGNED, "teacher_class", parsed.data.classId, id)
    return Response.json({ data: { removed: true }, requestId: id })
  } catch (error) { return mapDomainError(error, id) }
}
