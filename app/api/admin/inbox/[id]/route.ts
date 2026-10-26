import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { getRuntimeDbClient } from "@/lib/db/runtime"
import { apiError, mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { auditAction } from "@/lib/api/admin-audit"
import { AUDIT_ACTIONS } from "@/lib/audit/events"
import { isUuid, parseStatusUpdate } from "@/lib/contact/inbox"

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "inbox:write")
    const { id: messageId } = await params
    if (!isUuid(messageId)) return apiError("NOT_FOUND", "The message was not found.", 404, id)

    const body: unknown = await request.json().catch((): null => null)
    const parsed = parseStatusUpdate(body)
    if (!parsed.valid) return apiError("VALIDATION_ERROR", "error" in parsed ? parsed.error : "A valid status is required.", 400, id)

    const { rows } = await getRuntimeDbClient().query(
      `update contact_messages set status = $1, updated_at = now() where id = $2 and school_id = $3 returning id, status, updated_at`,
      [parsed.status, messageId, context.schoolId],
    )
    if (!rows[0]) return apiError("NOT_FOUND", "The message was not found.", 404, id)

    await auditAction(context, AUDIT_ACTIONS.CONTACT_STATUS_CHANGED, "contact_message", messageId, id)
    return Response.json({ data: rows[0], requestId: id })
  } catch (error) {
    return mapDomainError(error, id)
  }
}
