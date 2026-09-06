import { NextResponse } from "next/server"
import { getApplication } from "@/lib/admissions/application-store"

export async function GET(_request: Request, { params }: { params: Promise<{ reference: string }> }) {
  const { reference: rawReference } = await params
  const reference = decodeURIComponent(rawReference)
  const application = getApplication(reference)
  if (!application) return NextResponse.json({ ok: false, error: "APPLICATION_NOT_FOUND" }, { status: 404 })
  return NextResponse.json({ ok: true, application })
}
