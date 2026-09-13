import type { AuthContext } from "@/lib/auth/authorization"
import { requirePortalPermission } from "@/lib/auth/portal-permissions"
import { paginate, type PaginationInput } from "@/lib/api/pagination"
import type { PortalAssessment } from "@/lib/portal/types"

const assessments: PortalAssessment[] = [
  { id: "ASM-001", studentId: "STU-0001", studentName: "Amani Joseph", subject: "Mathematics", assessment: "Monthly Test", score: 42, maxScore: 50, percentage: 84, term: "Term II", assessedAt: "2026-08-28" },
  { id: "ASM-002", studentId: "STU-0002", studentName: "Neema Pamba", subject: "English", assessment: "Monthly Test", score: 45, maxScore: 50, percentage: 90, term: "Term II", assessedAt: "2026-08-28" },
  { id: "ASM-003", studentId: "STU-0003", studentName: "Baraka Mwita", subject: "Science", assessment: "Class Assessment", score: 36, maxScore: 50, percentage: 72, term: "Term II", assessedAt: "2026-08-27" },
  { id: "ASM-004", studentId: "STU-0004", studentName: "Rehema Elias", subject: "Kiswahili", assessment: "Monthly Test", score: 43, maxScore: 50, percentage: 86, term: "Term II", assessedAt: "2026-08-28" },
]

export function listPortalAssessments(context: AuthContext | null, studentId?: string, pagination?: PaginationInput) {
  requirePortalPermission(context, "assessments:read")
  const filtered = studentId?.trim() ? assessments.filter((item) => item.studentId === studentId.trim()) : assessments
  return pagination ? paginate(filtered, pagination) : { data: filtered, meta: { page: 1, pageSize: filtered.length || 1, total: filtered.length, totalPages: 1, hasNextPage: false, hasPreviousPage: false } }
}
