import type { AuthContext } from "@/lib/auth/authorization"
import { requirePortalPermission } from "@/lib/auth/portal-permissions"
import { listStudentsData } from "@/lib/api/portal-data"
import type { PaginationInput } from "@/lib/api/pagination"

export async function listPortalStudents(context: AuthContext | null, className?: string, pagination?: PaginationInput) {
  const auth = requirePortalPermission(context, "students:read")
  if (!pagination) throw new Error("VALIDATION_ERROR")
  return listStudentsData(auth, className, pagination)
}
