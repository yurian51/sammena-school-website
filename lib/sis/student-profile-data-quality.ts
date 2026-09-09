import type { Enrollment, Student } from "./types"
import type { Guardian } from "./supporting-types"

export type StudentProfileRiskLevel = "low" | "medium" | "high"

export interface StudentProfileDataQualityIssue {
  code:
  | "MISSING_GUARDIAN"
  | "MISSING_PRIMARY_GUARDIAN"
  | "MISSING_ACTIVE_ENROLLMENT"
  | "MISSING_STREAM"
  | "MISSING_STUDENT_ID"
  severity: StudentProfileRiskLevel
  label: string
}

export interface StudentProfileDataQuality {
  score: number
  status: "complete" | "needs_attention" | "critical"
  issues: StudentProfileDataQualityIssue[]
}

const severityWeight: Record<StudentProfileRiskLevel, number> = {
  low: 10,
  medium: 20,
  high: 30,
}

export function assessStudentProfileDataQuality(
  student: Student,
  guardians: Guardian[],
  primaryGuardian: Guardian | null,
  currentEnrollment: Enrollment | null,
): StudentProfileDataQuality {
  const issues: StudentProfileDataQualityIssue[] = []

  if (!student.id) {
    issues.push({ code: "MISSING_STUDENT_ID", severity: "high", label: "Student identifier is missing" })
  }
  if (guardians.length === 0) {
    issues.push({ code: "MISSING_GUARDIAN", severity: "medium", label: "No guardian is linked" })
  }
  if (!primaryGuardian) {
    issues.push({ code: "MISSING_PRIMARY_GUARDIAN", severity: "medium", label: "Primary guardian is missing" })
  }
  if (!currentEnrollment) {
    issues.push({ code: "MISSING_ACTIVE_ENROLLMENT", severity: "high", label: "Active enrollment is missing" })
  } else if (!currentEnrollment.streamId) {
    issues.push({ code: "MISSING_STREAM", severity: "low", label: "Current stream is missing" })
  }

  const penalty = Math.min(100, issues.reduce((sum, issue) => sum + severityWeight[issue.severity], 0))
  const score = 100 - penalty
  const status = score >= 90 ? "complete" : score >= 60 ? "needs_attention" : "critical"

  return { score, status, issues }
}
