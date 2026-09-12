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
  const recommendations: StudentInterventionRecommendation[] = []

  for (const indicator of assessment.indicators) {
    if (indicator.code === "ATTENDANCE_RISK") {
      recommendations.push({ type: "attendance", priority: "high", title: "Attendance follow-up", action: "Review attendance and contact the guardian", reason: indicator.label })
    } else if (indicator.code === "ACADEMIC_RISK") {
      recommendations.push({ type: "academic", priority: "high", title: "Academic support", action: "Review weak subjects and create a support plan", reason: indicator.label })
    } else if (indicator.code === "FEE_ARREARS") {
      recommendations.push({ type: "finance", priority: "medium", title: "Fee follow-up", action: "Review the outstanding balance with the finance team", reason: indicator.label })
    } else if (indicator.code === "PROFILE_INCOMPLETE") {
      recommendations.push({ type: "profile", priority: "medium", title: "Complete student profile", action: "Resolve missing student or enrollment information", reason: indicator.label })
    }
  }

  return recommendations
}
