import { describe, expect, it } from "vitest"
import { isInterventionOverdue, recordInterventionStatusChange } from "./student-intervention-tracking"

const plan = {
  id: "p1",
  studentId: "s1",
  type: "attendance" as const,
  title: "Attendance follow-up",
  action: "Contact guardian",
  reason: "Attendance is below 75%",
  assignedTo: "teacher-1",
  dueAt: "2026-08-28T10:00:00Z",
  status: "in_progress" as const,
  createdAt: "2026-08-27T10:00:00Z",
  completedAt: null,
}

describe("student intervention tracking", () => {
  it("detects overdue active interventions", () => {
    expect(isInterventionOverdue(plan, "2026-08-28T11:00:00Z")).toBe(true)
    expect(isInterventionOverdue({ ...plan, status: "completed" }, "2026-08-28T11:00:00Z")).toBe(false)
  })

  it("records an auditable status change", () => {
    expect(recordInterventionStatusChange(plan, "admin-1", "2026-08-28T12:00:00Z", "Guardian contacted")).toEqual({
      interventionId: "p1",
      studentId: "s1",
      status: "in_progress",
      changedAt: "2026-08-28T12:00:00Z",
      changedBy: "admin-1",
      note: "Guardian contacted",
    })
  })
})
