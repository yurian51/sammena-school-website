import { describe, expect, it } from "vitest"
import { isValidAdmissionReference } from "./reference-validation"

describe("admission reference validation", () => {
  it("accepts the canonical format", () => expect(isValidAdmissionReference("SAM-2026-ABC123")).toBe(true))
  it("rejects malformed references", () => {
    expect(isValidAdmissionReference("SAM-2026-ABC12")).toBe(false)
    expect(isValidAdmissionReference("ABC123")).toBe(false)
  })
})
