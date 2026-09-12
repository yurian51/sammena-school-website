import { NextRequest, NextResponse } from "next/server"
import { getAuthContext } from "@/lib/auth/session"
import { listPortalAssessments } from "@/lib/api/assessments"
import { mapDomainError } from "@/lib/api/errors"

export async function GET(request: NextRequest) {
  const requestId = crypto.randomUUID()
  try {
    const context = await getAuthContext(request)
    const studentId = request.nextUrl.searchParams.get("studentId") ?? undefined
    const data = listPortalAssessments(context, studentId)
    return NextResponse.json({ data, requestId }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) {
    return mapDomainError(error, requestId)
  }
}
