import { describe, expect, it } from "vitest"
import {
  assignStudentIntervention,
  completeStudentIntervention,
  createStudentInterventionPlan,
  dismissStudentIntervention,
} from "./student-intervention-plan"

const recommendation = {
  type: "academic" as const,
  priority: "high" as const,
  title: "Academic support",
  action: "Create a support plan",
  reason: "Academic average is below 50%",
}

describe("student intervention plan", () => {
  it("creates and assigns a plan", () => {
    const plan = createStudentInterventionPlan("p1", "s1", recommendation, "2026-08-28T10:00:00Z")
    expect(plan.status).toBe("open")
    expect(assignStudentIntervention(plan, "teacher-1")).toMatchObject({ assignedTo: "teacher-1", status: "in_progress" })
  })

  it("completes or dismisses a plan", () => {
    const plan = createStudentInterventionPlan("p1", "s1", recommendation, "2026-08-28T10:00:00Z")
    expect(completeStudentIntervention(plan, "2026-08-29T10:00:00Z")).toMatchObject({ status: "completed", completedAt: "2026-08-29T10:00:00Z" })
    expect(dismissStudentIntervention(plan).status).toBe("dismissed")
  })
})
