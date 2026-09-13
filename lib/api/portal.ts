import type { AuthContext } from "@/lib/auth/authorization"
import { requirePortalPermission } from "@/lib/auth/portal-permissions"
import { getPortalSummaryData } from "@/lib/api/portal-data"

export interface PortalSummary {
  schoolId: string
  role: AuthContext["role"]
  students: { total: number; prePrimary: number; standardOne: number }
  attendance: { present: number; absent: number; late: number; rate: number }
  academics: { average: number }
  library: { books: number; available: number; issued: number }
  quality: { overall: number; openActions: number }
}

export async function getPortalSummary(context: AuthContext | null): Promise<PortalSummary> {
  const auth = requirePortalPermission(context, "portal:read")
  return getPortalSummaryData(auth)
}
