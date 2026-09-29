import { NextResponse } from "next/server"
import { z } from "zod"
import { getRuntimeDbClient } from "@/lib/db/runtime"

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(7).max(40).optional().or(z.literal("")),
  subject: z.string().trim().min(2).max(160),
  message: z.string().trim().min(10).max(3000),
})

export async function POST(request: Request) {
  const requestId = crypto.randomUUID()
  try {
    const body = await request.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: { code: "VALIDATION_ERROR", message: "Please check the enquiry details and try again." }, requestId }, { status: 400 })
    }

    const db = getRuntimeDbClient()
    const school = await db.query<{ id: string }>("select id from schools where slug = $1 limit 1", ["sammena-pre-primary-school"])
    if (school.rowCount !== 1) throw new Error("SCHOOL_SCOPE_REQUIRED")

    await db.query(
      "insert into contact_messages (school_id, sender_name, sender_email, sender_phone, subject, message) values ($1,$2,$3,$4,$5,$6)",
      [school.rows[0].id, parsed.data.name, parsed.data.email, parsed.data.phone || null, parsed.data.subject, parsed.data.message],
    )

    return NextResponse.json({ data: { accepted: true }, requestId }, { status: 201 })
  } catch {
    return NextResponse.json({ error: { code: "SERVICE_UNAVAILABLE", message: "The school contact service is temporarily unavailable." }, requestId }, { status: 503 })
  }
}
