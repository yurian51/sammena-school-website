import { describe, expect, it } from "vitest"
import {
  buildAcademicSummary,
  buildAttendanceSummary,
  buildDocumentSummary,
  buildFeeSummary,
} from "./student-360-summary"

describe("student 360 summaries", () => {
  it("builds attendance rate from attendance counts", () => {
    expect(buildAttendanceSummary({ present: 18, absent: 1, late: 1, excused: 0 })).toEqual({
      present: 18,
      absent: 1,
      late: 1,
      excused: 0,
      total: 20,
      attendanceRate: 95,
    })
  })

  it("builds fee balance without allowing negative values", () => {
    expect(buildFeeSummary(100000, 120000)).toEqual({
      billed: 100000,
      paid: 120000,
      balance: 0,
      paymentRate: 100,
    })
  })

  it("builds document completeness", () => {
    expect(buildDocumentSummary(8, 5)).toEqual({ total: 8, verified: 5, missing: 3 })
  })

  it("normalizes academic values", () => {
    expect(buildAcademicSummary(7, 105, "A", 0)).toEqual({
      subjects: 7,
      average: 100,
      grade: "A",
      position: 1,
    })
  })
})
