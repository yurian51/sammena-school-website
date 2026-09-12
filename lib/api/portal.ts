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

const summary: PortalSummary = {
  schoolId: "sammena",
  role: "SCHOOL_ADMIN",
  students: { total: 188, prePrimary: 27, standardOne: 23 },
  attendance: { present: 177, absent: 8, late: 3, rate: 94.1 },
  academics: { average: 76.8 },
  library: { books: 612, available: 532, issued: 31 },
  quality: { overall: 81, openActions: 7 },
}

export function getPortalSummary(context: AuthContext | null): PortalSummary {
  const auth = requirePortalPermission(context, "portal:read")
  return { ...summary, role: auth.role, schoolId: auth.schoolId ?? summary.schoolId }
}
