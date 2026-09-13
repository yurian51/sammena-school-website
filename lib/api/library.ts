import type { AuthContext } from "@/lib/auth/authorization"
import { requirePortalPermission } from "@/lib/auth/portal-permissions"
import { listLibraryData } from "@/lib/api/portal-data"
import type { PaginationInput } from "@/lib/api/pagination"

export async function listPortalLibrary(context: AuthContext | null, category?: string, pagination?: PaginationInput) {
  const auth = requirePortalPermission(context, "library:read")
  if (!pagination) throw new Error("VALIDATION_ERROR")
  return listLibraryData(auth, category, pagination)
}
