import { EVENT_CATEGORIES, type EventCategory } from "@/lib/calendar/types"
import { createCalendarRepository } from "@/lib/calendar/service"
import { apiError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"

function optionalIso(value: string | null) {
  if (!value) return undefined
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) throw new Error("VALIDATION_ERROR")
  return parsed.toISOString()
}

export async function GET(request: Request) {
  const id = requestId(request)
  try {
    const url = new URL(request.url)
    const categoryValue = url.searchParams.get("category")?.toUpperCase() || undefined
    if (categoryValue && !EVENT_CATEGORIES.includes(categoryValue as EventCategory)) throw new Error("VALIDATION_ERROR")
    const from = optionalIso(url.searchParams.get("from"))
    const to = optionalIso(url.searchParams.get("to"))
    if (from && to && new Date(from).getTime() > new Date(to).getTime()) throw new Error("VALIDATION_ERROR")

    const schoolId = process.env.SAMMENA_SCHOOL_ID?.trim()
    if (!schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const events = await createCalendarRepository(schoolId).listPublished(from, to, categoryValue as EventCategory | undefined)
    return Response.json({ data: events, requestId: id }, { status: 200, headers: { "Cache-Control": "public, max-age=60, s-maxage=300" } })
  } catch (error) {
    const code = error instanceof Error ? error.message : "INTERNAL_ERROR"
    if (code === "VALIDATION_ERROR") return apiError("VALIDATION_ERROR", "The calendar query is invalid.", 400, id)
    if (code === "SCHOOL_SCOPE_REQUIRED") return apiError("SERVICE_UNAVAILABLE", "The school calendar is not connected to a school record yet.", 503, id)
    if (code === "DATABASE_CLIENT_NOT_CONFIGURED") return apiError("SERVICE_UNAVAILABLE", "The school calendar backend is not connected yet.", 503, id)
    return apiError("INTERNAL_ERROR", "The school calendar could not be loaded.", 500, id)
  }
}
