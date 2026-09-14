import { getAuthContext } from "@/lib/auth/session"
import { requirePortalPermission } from "@/lib/auth/portal-permissions"
import { mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"

export async function GET(request: Request) {
  const id = requestId(request)
  try {
    const context = await getAuthContext(request)
    const auth = requirePortalPermission(context, "portal:read")
    if (!auth.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    return Response.json(
      { data: { status: "ok", schoolId: auth.schoolId, role: auth.role }, requestId: id },
      { status: 200, headers: { "Cache-Control": "private, no-store" } },
    )
  } catch (error) {
    return mapDomainError(error, id)
  }
}
