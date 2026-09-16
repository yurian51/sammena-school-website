import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { createCalendarRepository, validateCreateSchoolEvent } from "@/lib/calendar/service"
import { apiError, mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"

export async function POST(request: Request) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "cms:write")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const body = await request.json()
    const input = validateCreateSchoolEvent(body)
    const event = await createCalendarRepository(context.schoolId).create(input, context.userId)
    return Response.json({ data: event, requestId: id }, { status: 201, headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    if (error instanceof SyntaxError) return apiError("VALIDATION_ERROR", "The submitted event body is invalid JSON.", 400, id)
    return mapDomainError(error, id)
  }
}
