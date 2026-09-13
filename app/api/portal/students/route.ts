import { NextRequest, NextResponse } from "next/server"
import { getAuthContext } from "@/lib/auth/session"
import { listPortalStudents } from "@/lib/api/students"
import { parsePagination } from "@/lib/api/pagination"
import { mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"

export async function GET(request: NextRequest) {
  const id = requestId(request)
  try {
    const context = await getAuthContext(request)
    const className = request.nextUrl.searchParams.get("class") ?? undefined
    const result = await listPortalStudents(context, className, parsePagination(request.nextUrl.searchParams))
    return NextResponse.json({ ...result, requestId: id }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) {
    return mapDomainError(error, id)
  }
}
