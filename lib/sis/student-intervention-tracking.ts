import type { InterventionStatus, StudentInterventionPlan } from "./student-intervention-plan"

export interface InterventionHistoryEntry {
  interventionId: string
  studentId: string
  status: InterventionStatus
  changedAt: string
  changedBy: string
  note?: string
}

export function recordInterventionStatusChange(
  plan: StudentInterventionPlan,
  changedBy: string,
  changedAt: string,
  note?: string,
): InterventionHistoryEntry {
  return {
    interventionId: plan.id,
    studentId: plan.studentId,
    status: plan.status,
    changedAt,
    changedBy,
    ...(note ? { note } : {}),
  }
}

export function isInterventionOverdue(plan: StudentInterventionPlan, now: string): boolean {
  return plan.status !== "completed" && plan.status !== "dismissed" && plan.dueAt !== null && plan.dueAt < now
}
