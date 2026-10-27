import { describe, expect, it } from "vitest"
import { periodsOverlap, timetableInput } from "./timetable"

const base = { classId: "123e4567-e89b-12d3-a456-426614174000", dayOfWeek: 1, periodNumber: 1, startsAt: "08:00", endsAt: "08:40", subject: "Maths" }

describe("timetable", () => {
  it("requires the period to end after it starts", () => {
    expect(timetableInput.safeParse({ ...base, endsAt: "07:50" }).success).toBe(false)
    expect(timetableInput.safeParse(base).success).toBe(true)
  })

  it("detects overlapping periods and allows back-to-back ones", () => {
    expect(periodsOverlap("08:00", "08:40", "08:30", "09:00")).toBe(true)
    expect(periodsOverlap("08:00", "08:40", "08:40", "09:20")).toBe(false)
  })
})
