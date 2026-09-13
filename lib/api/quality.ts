import type { AuthContext } from "@/lib/auth/authorization"
import { requirePortalPermission } from "@/lib/auth/portal-permissions"
import { getQualitySummaryData } from "@/lib/api/portal-data"

export interface QualityDomain { name: string; score: number; indicators: string[] }
export interface QualitySummary { schoolId: string; overall: number; evidenceItems: number; domains: QualityDomain[]; openActions: number }

export async function getQualitySummary(context: AuthContext | null): Promise<QualitySummary> {
  const auth = requirePortalPermission(context, "quality:read")
  return getQualitySummaryData(auth)
}
