import type { AuthContext } from "@/lib/auth/authorization"
import { requirePortalPermission } from "@/lib/auth/portal-permissions"

export interface PortalSummary {
  schoolId: string
  role: AuthContext["role"]
  students: { total: number; prePrimary: number; standardOne: number }
  attendance: { present: number; absent: number; late: number; rate: number }
  academics: { average: number }
  library: { books: number; available: number; issued: number }
  quality: { overall: number; openActions: number }
}

export function getPortalSummary(context: AuthContext | null): PortalSummary {
  requirePortalPermission(context, "portal:read")
  throw new Error("PORTAL_DATA_SOURCE_NOT_CONFIGURED")
}
