import type { AuthContext } from "@/lib/auth/authorization"
import { requirePortalPermission } from "@/lib/auth/portal-permissions"

export interface QualityDomain { name: string; score: number; indicators: string[] }
export interface QualitySummary { schoolId: string; overall: number; evidenceItems: number; domains: QualityDomain[]; openActions: number }

export function getQualitySummary(context: AuthContext | null): QualitySummary {
  requirePortalPermission(context, "quality:read")
  throw new Error("PORTAL_DATA_SOURCE_NOT_CONFIGURED")
}
