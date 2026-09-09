import { describe, expect, it } from "vitest"
import { rankStudentRisk, sortStudentRiskQueue } from "./student-risk-priority"

describe("student risk priority", () => {
  it("maps critical and high risks to actionable priorities", () => {
    expect(rankStudentRisk("s1", { score: 10, level: "critical", indicators: [] }).priority).toBe("urgent")
    expect(rankStudentRisk("s2", { score: 40, level: "high", indicators: [] }).priority).toBe("priority")
  })

  it("sorts students with the highest risk first", () => {
    const items = [
      rankStudentRisk("safe", { score: 90, level: "low", indicators: [] }),
      rankStudentRisk("risk", { score: 20, level: "critical", indicators: [{ code: "A", level: "high", label: "Attendance", score: 80 }] }),
    ]
    expect(sortStudentRiskQueue(items).map(item => item.studentId)).toEqual(["risk", "safe"])
  })
})
