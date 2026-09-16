import { createCalendarRepository } from "@/lib/calendar/service"
import { apiError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import type { SchoolEvent } from "@/lib/calendar/types"

function escapeIcs(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n")
}

function formatUtc(value: string) {
  return new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z")
}

function eventToIcs(event: SchoolEvent) {
  const start = formatUtc(event.startsAt)
  const end = event.endsAt ? formatUtc(event.endsAt) : start
  return [
    "BEGIN:VEVENT",
    `UID:${escapeIcs(event.id)}@sammena-school`,
    `DTSTAMP:${formatUtc(event.updatedAt)}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${escapeIcs(event.title)}`,
    `DESCRIPTION:${escapeIcs(event.description)}`,
    ...(event.location ? [`LOCATION:${escapeIcs(event.location)}`] : []),
    `CATEGORIES:${event.category}`,
    "END:VEVENT",
  ].join("\r\n")
}

export async function GET(request: Request) {
  const id = requestId(request)
  try {
    const schoolId = process.env.SAMMENA_SCHOOL_ID?.trim()
    if (!schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const url = new URL(request.url)
    const from = url.searchParams.get("from") || undefined
    const to = url.searchParams.get("to") || undefined
    const events = await createCalendarRepository(schoolId).listPublished(from, to)
    const calendar = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//SAMMENA School//School Calendar//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "X-WR-CALNAME:SAMMENA School Calendar",
      ...events.map(eventToIcs),
      "END:VCALENDAR",
      "",
    ].join("\r\n")
    return new Response(calendar, { status: 200, headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": "inline; filename=school-calendar.ics", "Cache-Control": "public, max-age=300, s-maxage=900" } })
  } catch (error) {
    const code = error instanceof Error ? error.message : "INTERNAL_ERROR"
    if (code === "SCHOOL_SCOPE_REQUIRED" || code === "DATABASE_CLIENT_NOT_CONFIGURED") return apiError("SERVICE_UNAVAILABLE", "The school calendar backend is not connected yet.", 503, id)
    return apiError("INTERNAL_ERROR", "The calendar export could not be generated.", 500, id)
  }
}
