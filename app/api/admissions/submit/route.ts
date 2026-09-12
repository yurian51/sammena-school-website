import { NextResponse } from "next/server"
import { admissionApplicationSchema } from "@/lib/admissions/application-schema"
import { createServerServices } from "@/lib/server/repositories"
import { mapDomainError } from "@/lib/api/errors"
import { parseJsonBody } from "@/lib/api/request"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function POST(request: Request) {
  const requestId = request.headers.get("x-request-id")?.trim() || crypto.randomUUID()

  try {
    const body = await parseJsonBody(request)
    const parsed = admissionApplicationSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION_ERROR", issues: parsed.error.flatten(), requestId },
        { status: 400, headers: { "Cache-Control": "no-store", "x-request-id": requestId } },
      )
    }

    const services = createServerServices({ schoolId: process.env.SCHOOL_ID ?? "sammena-primary" })
    const application = await services.admissions.createDraft({
      guardian: {
        fullName: parsed.data.guardian,
        phone: parsed.data.phone,
        ...(parsed.data.email ? { email: parsed.data.email } : {}),
      },
      learner: {
        fullName: parsed.data.learner,
        dateOfBirth: parsed.data.dob,
        entryLevel: parsed.data.entry,
        ...(parsed.data.previous ? { previousSchool: parsed.data.previous } : {}),
      },
    })
    const submitted = await services.admissions.updateStatus(application.reference, "SUBMITTED")

    return NextResponse.json(
      {
        ok: true,
        data: {
          reference: submitted.reference,
          status: submitted.status,
          createdAt: submitted.createdAt,
          updatedAt: submitted.updatedAt,
        },
        requestId,
      },
      { status: 201, headers: { "Cache-Control": "no-store", "x-request-id": requestId } },
    )
  } catch (error) {
    return mapDomainError(error, requestId)
  }
}
