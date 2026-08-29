import { NextResponse } from "next/server"
import { listApplications } from "@/lib/admissions/application-store"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const status = url.searchParams.get("status")
  const applications = listApplications(status as Parameters<typeof listApplications>[0])
  return NextResponse.json({ ok: true, count: applications.length, applications })
}
