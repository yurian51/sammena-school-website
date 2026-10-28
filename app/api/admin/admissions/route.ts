import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { PostgresAdmissionsRepository } from "@/lib/db/repositories/admissions-postgres"
import { mapDomainError, apiError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { APPLICATION_STATUSES, type ApplicationStatus } from "@/lib/admissions/types"

export async function GET(request: Request) {
  const id = requestId(request)
  try {
    requireAuthorized(await getAuthContext(request), "admissions:read")
    const url = new URL(request.url)
    const status = url.searchParams.get("status")?.toUpperCase() || undefined
    const search = url.searchParams.get("q") || undefined
    if (status && !APPLICATION_STATUSES.includes(status as ApplicationStatus)) return apiError("VALIDATION_ERROR", "Invalid application status.", 400, id)
    const data = await new PostgresAdmissionsRepository().list(status as ApplicationStatus | undefined, search)
    return Response.json({ data, requestId: id }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) {
    return mapDomainError(error, id)
  }
}
