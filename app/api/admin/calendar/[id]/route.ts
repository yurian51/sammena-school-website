import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { createCalendarRepository, validateEventStatus } from "@/lib/calendar/service"
import { mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { auditAction } from "@/lib/api/admin-audit"
import { AUDIT_ACTIONS } from "@/lib/audit/events"

type RouteContext = { params: Promise<{ id: string }> }

export async function PATCH(request: Request, { params }: RouteContext) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "cms:publish")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const { id: eventId } = await params
    const body = await request.json()
    const status = validateEventStatus(body?.status)
    const event = await createCalendarRepository(context.schoolId).updateStatus(eventId, status)
    if (status === "PUBLISHED") await auditAction(context, AUDIT_ACTIONS.CALENDAR_PUBLISHED, "school_event", event.id, id)
    return Response.json({ data: event, requestId: id }, { status: 200, headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    return mapDomainError(error, id)
  }
}
