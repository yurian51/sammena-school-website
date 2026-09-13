import type { AuthContext } from "@/lib/auth/authorization"
import { requirePortalPermission } from "@/lib/auth/portal-permissions"
import { listAssessmentsData } from "@/lib/api/portal-data"
import type { PaginationInput } from "@/lib/api/pagination"

export async function listPortalAssessments(context: AuthContext | null, studentId?: string, pagination?: PaginationInput) {
  const auth = requirePortalPermission(context, "assessments:read")
  if (!pagination) throw new Error("VALIDATION_ERROR")
  return listAssessmentsData(auth, studentId, pagination)
}
