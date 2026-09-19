import type { StudentRiskAssessment } from "./student-risk-engine"

export type StudentInterventionType = "attendance" | "academic" | "finance" | "profile"

export interface StudentInterventionRecommendation {
  type: StudentInterventionType
  priority: "high" | "medium"
  title: string
  action: string
  reason: string
}

export function recommendStudentInterventions(
  assessment: StudentRiskAssessment,
): StudentInterventionRecommendation[] {
  return assessment.indicators.flatMap((indicator): StudentInterventionRecommendation[] => {
    if (indicator.code === "ATTENDANCE_RISK") {
      return [{ type: "attendance", priority: "high", title: "Attendance follow-up", action: "Review attendance and contact the guardian", reason: indicator.label }]
    }
    if (indicator.code === "ACADEMIC_RISK") {
      return [{ type: "academic", priority: "high", title: "Academic support", action: "Review weak subjects and create a support plan", reason: indicator.label }]
    }
    if (indicator.code === "FEE_ARREARS") {
      return [{ type: "finance", priority: "medium", title: "Fee follow-up", action: "Review the outstanding balance with the finance team", reason: indicator.label }]
    }
    if (indicator.code === "PROFILE_INCOMPLETE") {
      return [{ type: "profile", priority: "medium", title: "Complete student profile", action: "Resolve missing student or enrollment information", reason: indicator.label }]
    }
    return []
  })
}
