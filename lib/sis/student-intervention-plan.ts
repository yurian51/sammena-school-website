import type { StudentInterventionRecommendation } from "./student-interventions"

export type InterventionStatus = "open" | "in_progress" | "completed" | "dismissed"

export interface StudentInterventionPlan {
  id: string
  studentId: string
  type: StudentInterventionRecommendation["type"]
  title: string
  action: string
  reason: string
  assignedTo: string | null
  dueAt: string | null
  status: InterventionStatus
  createdAt: string
  completedAt: string | null
}

export function createStudentInterventionPlan(
  id: string,
  studentId: string,
  recommendation: StudentInterventionRecommendation,
  createdAt: string,
): StudentInterventionPlan {
  return {
    id,
    studentId,
    type: recommendation.type,
    title: recommendation.title,
    action: recommendation.action,
    reason: recommendation.reason,
    assignedTo: null,
    dueAt: null,
    status: "open",
    createdAt,
    completedAt: null,
  }
}

export function assignStudentIntervention(plan: StudentInterventionPlan, userId: string): StudentInterventionPlan {
  return { ...plan, assignedTo: userId, status: "in_progress" }
}

export function completeStudentIntervention(plan: StudentInterventionPlan, completedAt: string): StudentInterventionPlan {
  return { ...plan, status: "completed", completedAt }
}

export function dismissStudentIntervention(plan: StudentInterventionPlan): StudentInterventionPlan {
  return { ...plan, status: "dismissed" }
}
