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

    const idempotencyKey = request.headers.get("Idempotency-Key")?.trim() || undefined
    if (idempotencyKey && (idempotencyKey.length < 16 || idempotencyKey.length > 128)) {
      return NextResponse.json(
        { ok: false, error: "INVALID_IDEMPOTENCY_KEY", requestId: id },
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
        ...(parsed.data.email ? { email: parsed.data.email } : {}),
        relationship: parsed.data.relationship,
      },
      learner: {
        fullName: parsed.data.learner,
        dateOfBirth: parsed.data.dob,
        entryLevel: parsed.data.entry,
        ...(parsed.data.previous ? { previousSchool: parsed.data.previous } : {}),
      },
      idempotencyKey,
      applicationData: {
        guardianNationality: parsed.data.guardianNationality || undefined,
        address: parsed.data.address || undefined,
        age: parsed.data.age || undefined,
        gender: parsed.data.gender,
        nationality: parsed.data.nationality || undefined,
        homeRegion: parsed.data.homeRegion || undefined,
        homeDistrict: parsed.data.homeDistrict || undefined,
        division: parsed.data.division || undefined,
        village: parsed.data.village || undefined,
        eyeColor: parsed.data.eyeColor || undefined,
        height: parsed.data.height || undefined,
        weight: parsed.data.weight || undefined,
        religion: parsed.data.religion || undefined,
        tribe: parsed.data.tribe || undefined,
        previousYear: parsed.data.previousYear || undefined,
        medical: parsed.data.medical || undefined,
        allergies: parsed.data.allergies || undefined,
        distance: parsed.data.distance || undefined,
        preferredStart: parsed.data.preferredStart || undefined,
        siblings: parsed.data.siblings || undefined,
        photoReady: parsed.data.photoReady,
        consentAccepted: true,
        consentAt: new Date().toISOString(),
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
