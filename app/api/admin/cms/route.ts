import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { PostgresCmsRepository } from "@/lib/db/repositories/cms-postgres"

export async function GET(request: Request) {
  const id = requestId(request)
  try {
    requireAuthorized(await getAuthContext(request), "cms:read")
    const data = await new PostgresCmsRepository().listAll()
    return Response.json({ data, requestId: id }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) {
    return mapDomainError(error, id)
  }
}
