import { NextResponse } from "next/server"
import { admissionApplicationSchema } from "@/lib/admissions/application-schema"
import { createAdmissionReference } from "@/lib/admissions/application-reference"

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json()
    const parsed = admissionApplicationSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION_ERROR", issues: parsed.error.flatten() },
        { status: 400 },
      )
    }

    return NextResponse.json({
      ok: true,
      reference: createAdmissionReference(),
      status: "VALIDATED",
      message: "Application data is valid and ready for secure persistence.",
    })
  } catch {
    return NextResponse.json(
      { ok: false, error: "INVALID_JSON", message: "Request body must be valid JSON." },
      { status: 400 },
    )
  }
}
