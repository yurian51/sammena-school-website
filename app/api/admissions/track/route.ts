import { NextResponse } from "next/server"
import { mapDomainError } from "../../../../lib/api/errors"
import { createServerServices } from "../../../../lib/server/repositories"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const reference = url.searchParams.get("reference")?.trim().toUpperCase()

  if (!reference || !/^SAM-[0-9]{4}-[A-Z0-9]{6,12}$/.test(reference)) {
    return NextResponse.json({ ok: false, error: "Enter a valid Sammena application reference." }, { status: 400 })
  }

  try {
    const application = await createServerServices({ schoolId: process.env.SCHOOL_ID ?? "sammena-primary" }).admissions.getByReference(reference)
    if (!application) {
      return NextResponse.json({ ok: false, error: "Application not found." }, { status: 404 })
    }

    return NextResponse.json({ ok: true, data: { reference: application.reference, status: application.status, createdAt: application.createdAt, updatedAt: application.updatedAt } })
  } catch (error) {
    return mapDomainError(error, crypto.randomUUID())
  }
}
