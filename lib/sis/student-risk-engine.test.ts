import { describe, expect, it } from "vitest"
import { calculateStudentRisk } from "./student-risk-engine"

const completeHealth = {
  score: 100,
  hasGuardian: true,
  hasPrimaryGuardian: true,
  hasActiveEnrollment: true,
  hasStream: true,
  missing: [],
}

describe("student risk engine", () => {
  it("returns low risk for a healthy student", () => {
    const assessment = calculateStudentRisk(completeHealth, {
      attendance: { present: 20, absent: 0, late: 0, excused: 0, total: 20, attendanceRate: 100 },
      academics: { subjects: 7, average: 80, grade: "A", position: 1 },
      fees: { billed: 100000, paid: 100000, balance: 0, paymentRate: 100 },
      documents: { total: 5, verified: 5, missing: 0 },
    })

    expect(assessment).toMatchObject({ score: 100, level: "low", indicators: [] })
  })

  it("flags attendance, academic and fee risks", () => {
    const assessment = calculateStudentRisk(completeHealth, {
      attendance: { present: 10, absent: 10, late: 0, excused: 0, total: 20, attendanceRate: 50 },
      academics: { subjects: 7, average: 40, grade: "F", position: 20 },
      fees: { billed: 100000, paid: 50000, balance: 50000, paymentRate: 50 },
      documents: { total: 5, verified: 5, missing: 0 },
    })

    expect(assessment.score).toBe(35)
    expect(assessment.level).toBe("high")
    expect(assessment.indicators.map(item => item.code)).toEqual([
      "ATTENDANCE_RISK",
      "ACADEMIC_RISK",
      "FEE_ARREARS",
    ])
  })
})
