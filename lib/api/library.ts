import type { AuthContext } from "@/lib/auth/authorization"
import { requirePortalPermission } from "@/lib/auth/portal-permissions"
import type { PaginationInput } from "@/lib/api/pagination"

export function listPortalLibrary(context: AuthContext | null, _category?: string, _pagination?: PaginationInput) {
  requirePortalPermission(context, "library:read")
  throw new Error("PORTAL_DATA_SOURCE_NOT_CONFIGURED")
}
