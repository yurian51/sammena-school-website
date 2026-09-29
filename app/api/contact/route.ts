import { NextResponse } from "next/server"
import { z } from "zod"
import { getRuntimeDbClient } from "@/lib/db/runtime"
import { readJson, requestId } from "@/lib/api/request"

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(7).max(40).optional().or(z.literal("")),
  subject: z.string().trim().min(2).max(160),
  message: z.string().trim().min(10).max(3000),
})

export async function POST(request: Request) {
  const id = requestId(request)
  try {
    const body = await readJson<unknown>(request)
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: { code: "VALIDATION_ERROR", message: "Please check the enquiry details and try again." }, id }, { status: 400 })
    }

    const db = getRuntimeDbClient()
    const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    const ip = forwarded || request.headers.get("x-real-ip")?.trim() || "unknown"
    const ipBytes = new TextEncoder().encode(ip)
    const ipDigest = await crypto.subtle.digest("SHA-256", ipBytes)
    const ipHash = Array.from(new Uint8Array(ipDigest)).map((byte) => byte.toString(16).padStart(2, "0")).join("")
    const school = await db.query<{ id: string }>("select id from schools where slug = $1 limit 1", ["sammena-pre-primary-school"])
    if (school.rows.length !== 1) throw new Error("SCHOOL_SCOPE_REQUIRED")

    const result = await db.query<{ accepted: boolean }>(
      `with rate as (
         insert into contact_message_rate_limits (ip_hash, window_started_at, submission_count)
         values ($1, now(), 1)
         on conflict (ip_hash) do update
         set window_started_at = case
               when contact_message_rate_limits.window_started_at <= now() - interval '15 minutes' then now()
               else contact_message_rate_limits.window_started_at
             end,
             submission_count = case
               when contact_message_rate_limits.window_started_at <= now() - interval '15 minutes' then 1
               else contact_message_rate_limits.submission_count + 1
             end
         returning submission_count, window_started_at
       ), inserted as (
         insert into contact_messages (school_id, sender_name, sender_email, sender_phone, subject, message)
         select $2, $3, $4, $5, $6, $7
         from rate
         where submission_count <= 5
         returning id
       )
       select exists(select 1 from inserted) as accepted`,
      [ipHash, school.rows[0].id, parsed.data.name, parsed.data.email, parsed.data.phone || null, parsed.data.subject, parsed.data.message],
    )

    if (!result.rows[0]?.accepted) {
      return NextResponse.json({ error: { code: "RATE_LIMITED", message: "Too many enquiries were submitted recently. Please try again later." }, id }, { status: 429 })
    }

    return NextResponse.json({ data: { accepted: true }, requestId }, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.message === "REQUEST_TOO_LARGE") return NextResponse.json({ error: { code: "REQUEST_TOO_LARGE", message: "The enquiry is too large to submit." }, requestId }, { status: 413 })
    if (error instanceof Error && error.message === "VALIDATION_ERROR") return NextResponse.json({ error: { code: "VALIDATION_ERROR", message: "Please check the enquiry details and try again." }, requestId }, { status: 400 })
    return NextResponse.json({ error: { code: "SERVICE_UNAVAILABLE", message: "The school contact service is temporarily unavailable." }, requestId }, { status: 503 })
  }
}
