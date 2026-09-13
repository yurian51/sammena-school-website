import type { AuthContext } from "@/lib/auth/authorization"
import { requirePortalPermission } from "@/lib/auth/portal-permissions"
import type { PaginationInput } from "@/lib/api/pagination"

export function listPortalAssessments(context: AuthContext | null, _studentId?: string, _pagination?: PaginationInput) {
  requirePortalPermission(context, "assessments:read")
  throw new Error("PORTAL_DATA_SOURCE_NOT_CONFIGURED")
}
