import { describe, expect, it } from "vitest"
import { getAvailableStudentProfileActions } from "./student-profile-actions"

describe("student profile action policy", () => {
  it("keeps parent access limited to explicitly available actions", () => {
    expect(getAvailableStudentProfileActions({
      role: "parent",
      hasGuardian: true,
      hasEnrollment: true,
    })).toEqual([])
  })

  it("allows teachers to record attendance and view results only for enrolled students", () => {
    expect(getAvailableStudentProfileActions({
      role: "teacher",
      hasGuardian: true,
      hasEnrollment: true,
    })).toEqual(["record_attendance", "view_results", "generate_report_card", "contact_guardian"])

    expect(getAvailableStudentProfileActions({
      role: "teacher",
      hasGuardian: true,
      hasEnrollment: false,
    })).toEqual([])
  })

  it("keeps finance scoped to fee visibility", () => {
    expect(getAvailableStudentProfileActions({
      role: "finance",
      hasGuardian: true,
      hasEnrollment: true,
    })).toEqual(["view_fees"])
  })
})
