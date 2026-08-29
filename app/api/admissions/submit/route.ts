import { NextResponse } from "next/server"
import { admissionApplicationSchema } from "@/lib/admissions/application-schema"
import { submitApplication } from "@/lib/admissions/application-store"

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json()
    const parsed = admissionApplicationSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "VALIDATION_ERROR", issues: parsed.error.flatten() }, { status: 400 })
    }
    const record = submitApplication(parsed.data)
    return NextResponse.json({ ok: true, reference: record.reference, status: record.status, submittedAt: record.submittedAt }, { status: 201 })
  } catch {
    return NextResponse.json({ ok: false, error: "INVALID_JSON", message: "Request body must be valid JSON." }, { status: 400 })
  }
}
