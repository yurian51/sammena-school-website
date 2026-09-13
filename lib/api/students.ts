import type { AuthContext } from "@/lib/auth/authorization"
import { requirePortalPermission } from "@/lib/auth/portal-permissions"
import type { PaginationInput } from "@/lib/api/pagination"

export function listPortalStudents(context: AuthContext | null, _className?: string, _pagination?: PaginationInput) {
  requirePortalPermission(context, "students:read")
  throw new Error("PORTAL_DATA_SOURCE_NOT_CONFIGURED")
}
