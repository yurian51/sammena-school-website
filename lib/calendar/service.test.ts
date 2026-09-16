import { describe, expect, it } from "vitest"
import { validateCreateSchoolEvent, validateEventStatus } from "./service"

describe("calendar validation", () => {
  it("accepts a valid event", () => {
    expect(validateCreateSchoolEvent({
      title: "Parent Meeting",
      slug: "parent-meeting",
      category: "MEETING",
      startsAt: "2026-10-10T08:00:00+03:00",
      endsAt: "2026-10-10T10:00:00+03:00",
      location: "Sammena School",
    })).toMatchObject({ title: "Parent Meeting", category: "MEETING", audience: undefined })
  })

  it("rejects an event whose end precedes its start", () => {
    expect(() => validateCreateSchoolEvent({
      title: "Invalid",
      slug: "invalid",
      category: "ACADEMIC",
      startsAt: "2026-10-10T10:00:00+03:00",
      endsAt: "2026-10-10T09:00:00+03:00",
    })).toThrow("VALIDATION_ERROR")
  })

  it("rejects malformed slugs", () => {
    expect(() => validateCreateSchoolEvent({
      title: "Valid title",
      slug: "Bad Slug",
      category: "ACADEMIC",
      startsAt: "2026-10-10T10:00:00+03:00",
    })).toThrow("VALIDATION_ERROR")
  })

  it("accepts only supported publication statuses", () => {
    expect(validateEventStatus("PUBLISHED")).toBe("PUBLISHED")
    expect(() => validateEventStatus("LIVE")).toThrow("VALIDATION_ERROR")
  })
})
