import { describe, expect, it } from "vitest"
import { isInboxStatus, isUuid, parseContactSubmission, parseStatusFilter, parseStatusUpdate } from "./inbox"

const valid = {
  name: "Amina Juma",
  email: "amina@example.com",
  phone: "+255 712 345 678",
  subject: "Admissions Enquiry",
  message: "Please send me the admissions requirements.",
}

describe("contact submission", () => {
  it("accepts a complete enquiry and normalizes email", () => {
    const result = parseContactSubmission({ ...valid, email: "  AMINA@Example.com " })
    expect(result.valid).toBe(true)
    if (result.valid) expect(result.value.email).toBe("amina@example.com")
  })

  it("rejects non-object bodies", () => {
    expect(parseContactSubmission(null).valid).toBe(false)
    expect(parseContactSubmission("text").valid).toBe(false)
  })

  it("rejects missing or short fields", () => {
    expect(parseContactSubmission({ ...valid, message: "short" }).valid).toBe(false)
    expect(parseContactSubmission({ ...valid, email: "not-an-email" }).valid).toBe(false)
    expect(parseContactSubmission({ ...valid, name: undefined }).valid).toBe(false)
  })
})

describe("status values", () => {
  it("recognises only the three inbox statuses", () => {
    expect(isInboxStatus("NEW")).toBe(true)
    expect(isInboxStatus("IN_PROGRESS")).toBe(true)
    expect(isInboxStatus("RESOLVED")).toBe(true)
    expect(isInboxStatus("DELETED")).toBe(false)
    expect(isInboxStatus(undefined)).toBe(false)
  })

  it("validates status update bodies", () => {
    expect(parseStatusUpdate({ status: "RESOLVED" })).toEqual({ valid: true, status: "RESOLVED" })
    expect(parseStatusUpdate({ status: "drop table" }).valid).toBe(false)
    expect(parseStatusUpdate(null).valid).toBe(false)
  })

  it("ignores unknown filters rather than passing them to SQL", () => {
    expect(parseStatusFilter(null)).toBeUndefined()
    expect(parseStatusFilter("")).toBeUndefined()
    expect(parseStatusFilter("NEW")).toBe("NEW")
    expect(parseStatusFilter("NEW' OR '1'='1")).toBeUndefined()
  })

  it("accepts only canonical UUIDs for message ids", () => {
    expect(isUuid("123e4567-e89b-12d3-a456-426614174000")).toBe(true)
    expect(isUuid("../../etc/passwd")).toBe(false)
  })
})
