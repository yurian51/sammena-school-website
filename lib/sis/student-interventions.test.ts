import { describe, expect, it } from "vitest"
import { recommendStudentInterventions } from "./student-interventions"

describe("student intervention recommendations", () => {
  it("recommends attendance and academic support", () => {
    const result = recommendStudentInterventions({
      score: 35,
      level: "high",
      indicators: [
        { code: "ATTENDANCE_RISK", level: "high", label: "Attendance is below 75%", score: 25 },
        { code: "ACADEMIC_RISK", level: "high", label: "Academic average is below 50%", score: 25 },
      ],
    })

    expect(result.map(item => item.type)).toEqual(["attendance", "academic"])
    expect(result.every(item => item.priority === "high")).toBe(true)
  })

  it("recommends finance and profile follow-up", () => {
    const result = recommendStudentInterventions({
      score: 75,
      level: "low",
      indicators: [
        { code: "FEE_ARREARS", level: "medium", label: "Outstanding fee balance exists", score: 15 },
        { code: "PROFILE_INCOMPLETE", level: "medium", label: "Student profile needs data completion", score: 10 },
      ],
    })

    expect(result.map(item => item.type)).toEqual(["finance", "profile"])
  })
})
