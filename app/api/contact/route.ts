import { apiError } from "@/lib/api/errors"
import { getRuntimeDbClient } from "@/lib/db/runtime"
import { parseContactSubmission } from "@/lib/contact/inbox"

export async function POST(request: Request) {
  const requestId = crypto.randomUUID()

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return apiError("VALIDATION_ERROR", "Please check your contact details and try again.", 400, requestId)
  }

  const parsed = parseContactSubmission(body)
  if (!parsed.valid) return apiError("VALIDATION_ERROR", "error" in parsed ? parsed.error : "Please check your contact details and try again.", 400, requestId)

  try {
    const { rows } = await getRuntimeDbClient().query<{ id: string }>(
      `insert into contact_messages (school_id, name, email, phone, subject, message) values ($6, $1, $2, $3, $4, $5) returning id`,
      [parsed.value.name, parsed.value.email, parsed.value.phone, parsed.value.subject, parsed.value.message, process.env.SAMMENA_SCHOOL_ID ?? null],
    )
    return Response.json({ data: { id: rows[0]?.id }, requestId }, { status: 201, headers: { "Cache-Control": "no-store" } })
  } catch {
    // The form falls back to WhatsApp, so the enquiry is not lost when storage is unavailable.
    return apiError("SERVICE_UNAVAILABLE", "Messages cannot be saved right now. Please use WhatsApp or call the school.", 503, requestId)
  }
}
