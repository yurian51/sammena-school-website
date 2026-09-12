import { NextRequest, NextResponse } from "next/server"
import { getAuthContext } from "@/lib/auth/session"
import { listPortalLibrary } from "@/lib/api/library"
import { mapDomainError } from "@/lib/api/errors"

export async function GET(request: NextRequest) {
  const requestId = crypto.randomUUID()
  try {
    const context = await getAuthContext(request)
    const category = request.nextUrl.searchParams.get("category") ?? undefined
    const data = listPortalLibrary(context, category)
    return NextResponse.json({ data, requestId }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) {
    return mapDomainError(error, requestId)
  }
}
