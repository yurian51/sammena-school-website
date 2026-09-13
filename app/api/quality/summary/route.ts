import { getAuthContext } from "@/lib/auth/session"
import { getQualitySummary } from "@/lib/api/quality"
import { mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"

export async function GET(request: Request) {
  const id = requestId(request)
  try {
    const data = getQualitySummary(await getAuthContext(request))
    return Response.json({ data, requestId: id }, { status: 200, headers: { "Cache-Control": "private, no-store" } })
  } catch (error) {
    return mapDomainError(error, id)
  }
}
