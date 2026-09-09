import type { StudentRiskAssessment } from "./student-risk-engine"

export type StudentRiskPriority = "routine" | "watch" | "priority" | "urgent"

export interface StudentRiskQueueItem {
  studentId: string
  score: number
  level: StudentRiskAssessment["level"]
  priority: StudentRiskPriority
  reasons: string[]
}

const priorityFor = (level: StudentRiskAssessment["level"]): StudentRiskPriority => {
  if (level === "critical") return "urgent"
  if (level === "high") return "priority"
  if (level === "medium") return "watch"
  return "routine"
}

export function rankStudentRisk(studentId: string, assessment: StudentRiskAssessment): StudentRiskQueueItem {
  return {
    studentId,
    score: assessment.score,
    level: assessment.level,
    priority: priorityFor(assessment.level),
    reasons: assessment.indicators.map(indicator => indicator.label),
  }
}

export function sortStudentRiskQueue(items: StudentRiskQueueItem[]): StudentRiskQueueItem[] {
  return [...items].sort((a, b) => a.score - b.score)
}
