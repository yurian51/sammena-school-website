import { NextResponse } from "next/server"
import { getApplication } from "@/lib/admissions/application-store"

export async function GET(_request: Request, { params }: { params: { reference: string } }) {
  const reference = decodeURIComponent(params.reference)
  const application = getApplication(reference)
  if (!application) return NextResponse.json({ ok: false, error: "APPLICATION_NOT_FOUND" }, { status: 404 })
  return NextResponse.json({ ok: true, application })
}
