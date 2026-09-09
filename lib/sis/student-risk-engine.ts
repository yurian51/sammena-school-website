import type { Student360Summary } from "./student-360-summary"
import type { StudentProfileHealth } from "./student-profile-features"

export type StudentRiskLevel = "low" | "medium" | "high" | "critical"

export interface StudentRiskIndicator {
  code: string
  level: StudentRiskLevel
  label: string
  score: number
}

export interface StudentRiskAssessment {
  score: number
  level: StudentRiskLevel
  indicators: StudentRiskIndicator[]
}

function levelForScore(score: number): StudentRiskLevel {
  if (score >= 75) return "low"
  if (score >= 50) return "medium"
  if (score >= 25) return "high"
  return "critical"
}

export function calculateStudentRisk(
  health: StudentProfileHealth,
  summary: Student360Summary,
): StudentRiskAssessment {
  const indicators: StudentRiskIndicator[] = []

  if (summary.attendance.total > 0 && summary.attendance.attendanceRate < 75) {
    indicators.push({ code: "ATTENDANCE_RISK", level: "high", label: "Attendance is below 75%", score: 25 })
  }
  if (summary.academics.average !== null && summary.academics.average < 50) {
    indicators.push({ code: "ACADEMIC_RISK", level: "high", label: "Academic average is below 50%", score: 25 })
  }
  if (summary.fees.balance > 0) {
    indicators.push({ code: "FEE_ARREARS", level: "medium", label: "Outstanding fee balance exists", score: 15 })
  }
  if (health.missing.length > 0) {
    indicators.push({ code: "PROFILE_INCOMPLETE", level: "medium", label: "Student profile needs data completion", score: 10 })
  }

  const score = Math.max(0, 100 - indicators.reduce((total, indicator) => total + indicator.score, 0))
  return { score, level: levelForScore(score), indicators }
}
