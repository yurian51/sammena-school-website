import { getAuthContext } from "@/lib/auth/session"
import { getPortalSummary } from "@/lib/api/portal"
import { mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"

export async function GET(request: Request) {
  const id = requestId(request)
  try {
    const data = getPortalSummary(await getAuthContext(request))
    return Response.json({ data, requestId: id }, { status: 200, headers: { "Cache-Control": "private, no-store" } })
  } catch (error) {
    return mapDomainError(error, id)
  }
}
