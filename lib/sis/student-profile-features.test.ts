import { describe, expect, it } from "vitest"
import { buildEnrollmentTimeline, calculateStudentProfileHealth } from "./student-profile-features"

describe("student profile features", () => {
  it("calculates a complete profile as 100", () => {
    const student = { id: "student-1" } as never
    const guardians = [{ id: "guardian-1" }] as never[]
    const primaryGuardian = guardians[0]
    const enrollment = {
      id: "enrollment-1",
      streamId: "stream-1",
    } as never

    expect(calculateStudentProfileHealth(student, guardians, primaryGuardian, enrollment)).toMatchObject({
      score: 100,
      hasGuardian: true,
      hasPrimaryGuardian: true,
      hasActiveEnrollment: true,
      hasStream: true,
      missing: [],
    })
  })

  it("reports missing profile data", () => {
    const student = { id: "student-1" } as never
    const health = calculateStudentProfileHealth(student, [], null, null)

    expect(health.score).toBe(20)
    expect(health.missing).toEqual([
      "guardian",
      "primary guardian",
      "active enrollment",
      "stream",
    ])
  })

  it("sorts enrollment timeline newest first", () => {
    const timeline = buildEnrollmentTimeline([
      { id: "old", enrolledAt: "2025-01-01", academicYearId: "2025", classId: "3" } as never,
      { id: "new", enrolledAt: "2026-01-01", academicYearId: "2026", classId: "4" } as never,
    ])

    expect(timeline.map(item => item.enrollmentId)).toEqual(["new", "old"])
  })
})
