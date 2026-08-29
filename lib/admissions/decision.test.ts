import { describe, expect, it } from "vitest"
import { validateDecision } from "./decision"

describe("admission decisions", () => {
  it("requires a decision reason", () => {
    const result = validateDecision("UNDER_REVIEW", "ACCEPT", "")
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.error).toBe("DECISION_REASON_REQUIRED")
  })
  it("rejects invalid terminal transitions", () => {
    const result = validateDecision("REJECTED", "ACCEPT", "Changed mind")
    expect(result.ok).toBe(false)
  })
})
