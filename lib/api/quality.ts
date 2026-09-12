import type { AuthContext } from "@/lib/auth/authorization"
import { requirePortalPermission } from "@/lib/auth/portal-permissions"

export interface QualityDomain { name: string; score: number; indicators: string[] }
export interface QualitySummary { schoolId: string; overall: number; evidenceItems: number; domains: QualityDomain[]; openActions: number }

const domains: QualityDomain[] = [
  { name: "Teaching & Learning", score: 84, indicators: ["Lesson planning", "Assessment practice", "Learning materials"] },
  { name: "Learner Welfare", score: 89, indicators: ["Attendance", "Safeguarding", "Inclusion"] },
  { name: "Leadership & Management", score: 78, indicators: ["Records", "Planning", "Staff supervision"] },
  { name: "Infrastructure & Resources", score: 73, indicators: ["Classrooms", "Water & sanitation", "ICT & library"] },
]

export function getQualitySummary(context: AuthContext | null): QualitySummary {
  const auth = requirePortalPermission(context, "quality:read")
  return { schoolId: auth.schoolId ?? "sammena", overall: 81, evidenceItems: 12, domains, openActions: 7 }
}
