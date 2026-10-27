import { describe, expect, it } from "vitest"
import { attendanceSubmission, findDuplicateStudents, isNotInFuture, isValidCalendarDate, todayInTanzania } from "./attendance"

const classId = "123e4567-e89b-12d3-a456-426614174000"
const studentA = "223e4567-e89b-12d3-a456-426614174000"
const studentB = "323e4567-e89b-12d3-a456-426614174000"

describe("attendance dates", () => {
  it("rejects impossible calendar dates", () => {
    expect(isValidCalendarDate("2026-02-28")).toBe(true)
    expect(isValidCalendarDate("2026-02-30")).toBe(false)
    expect(isValidCalendarDate("2026-13-01")).toBe(false)
  })

  it("uses Tanzania time for 'today', so late-evening UTC is already tomorrow", () => {
    expect(todayInTanzania(new Date("2026-10-26T22:30:00Z"))).toBe("2026-10-27")
    expect(todayInTanzania(new Date("2026-10-26T08:00:00Z"))).toBe("2026-10-26")
  })

  it("blocks future dates", () => {
    expect(isNotInFuture("2026-10-26", "2026-10-26")).toBe(true)
    expect(isNotInFuture("2026-10-27", "2026-10-26")).toBe(false)
  })
})

describe("attendance submission", () => {
  it("accepts a valid roster submission", () => {
    const result = attendanceSubmission.safeParse({
      classId,
      date: "2026-10-26",
      records: [{ studentId: studentA, status: "PRESENT" }, { studentId: studentB, status: "LATE" }],
    })
    expect(result.success).toBe(true)
  })

  it("rejects unknown statuses and malformed ids", () => {
    expect(attendanceSubmission.safeParse({ classId, date: "2026-10-26", records: [{ studentId: studentA, status: "SICK" }] }).success).toBe(false)
    expect(attendanceSubmission.safeParse({ classId: "not-a-uuid", date: "2026-10-26", records: [{ studentId: studentA, status: "PRESENT" }] }).success).toBe(false)
  })

  it("detects a student listed twice in one submission", () => {
    expect(findDuplicateStudents([{ studentId: studentA }, { studentId: studentB }, { studentId: studentA }])).toEqual([studentA])
  })
})
