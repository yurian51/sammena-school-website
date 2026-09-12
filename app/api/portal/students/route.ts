import { NextRequest, NextResponse } from "next/server"
import { getAuthContext } from "@/lib/auth/session"
import { listPortalStudents } from "@/lib/api/students"
import { mapDomainError } from "@/lib/api/errors"

export async function GET(request: NextRequest) {
  const requestId = crypto.randomUUID()
  try {
    const context = await getAuthContext(request)
    const className = request.nextUrl.searchParams.get("class") ?? undefined
    const data = listPortalStudents(context, className)
    return NextResponse.json({ data, requestId }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) {
    return mapDomainError(error, requestId)
  }
}
