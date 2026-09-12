import { NextResponse } from "next/server"
import { admissionApplicationSchema } from "@/lib/admissions/application-schema"
import { createServerServices } from "@/lib/server/repositories"
import { mapDomainError } from "@/lib/api/errors"
import { readJson, requestId } from "@/lib/api/request"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function POST(request: Request) {
  const id = requestId(request)

  try {
    const body = await readJson<unknown>(request)
    const parsed = admissionApplicationSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION_ERROR", issues: parsed.error.flatten(), requestId: id },
        { status: 400, headers: { "Cache-Control": "no-store", "x-request-id": id } },
      )
    }

    const services = createServerServices({ schoolId: process.env.SCHOOL_ID ?? "sammena-primary" })
    const application = await services.admissions.createDraft({
      academicYear: parsed.data.academicYear,
      studyType: parsed.data.studyType,
      guardian: {
        fullName: parsed.data.guardian,
        phone: parsed.data.phone,
        secondaryPhone: parsed.data.secondaryPhone || undefined,
        nidaNumber: parsed.data.nidaNumber,
        ...(parsed.data.email ? { email: parsed.data.email } : {}),
        relationship: parsed.data.relationship,
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
        requestId: id,
      },
      { status: 201, headers: { "Cache-Control": "no-store", "x-request-id": id } },
    )
  } catch (error) {
    return mapDomainError(error, id)
  }
}
