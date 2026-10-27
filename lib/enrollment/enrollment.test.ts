import { describe, expect, it } from "vitest"
import { closeInput, guardianInput, placeInput } from "./enrollment"

describe("enrollment input", () => {
  it("places a student in a class with valid ids", () => {
    expect(placeInput.safeParse({ studentId: "123e4567-e89b-12d3-a456-426614174000", classId: "223e4567-e89b-12d3-a456-426614174000" }).success).toBe(true)
  })

  it("only allows database-backed close statuses", () => {
    expect(closeInput.safeParse({ status: "TRANSFERRED" }).success).toBe(true)
    expect(closeInput.safeParse({ status: "PROMOTED" }).success).toBe(false)
  })
})

describe("guardian input", () => {
  const base = { fullName: "Neema Mollel", phone: "+255 754 000 111", relationship: "PARENT" as const }

  it("accepts a parent with a valid phone and optional blank email", () => {
    expect(guardianInput.safeParse({ ...base, email: "" }).success).toBe(true)
    expect(guardianInput.parse({ ...base }).isPrimary).toBe(false)
  })

  it("rejects unknown relationships and malformed phones", () => {
    expect(guardianInput.safeParse({ ...base, relationship: "UNCLE" }).success).toBe(false)
    expect(guardianInput.safeParse({ ...base, phone: "call me" }).success).toBe(false)
  })
})
