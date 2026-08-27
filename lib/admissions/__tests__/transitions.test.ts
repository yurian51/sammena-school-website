import { describe, expect, it } from "vitest"
import { canTransition } from "../transitions"

describe("admission status transitions", () => {
  it("allows the normal submission flow", () => {
    expect(canTransition("DRAFT", "SUBMITTED")).toBe(true)
    expect(canTransition("SUBMITTED", "UNDER_REVIEW")).toBe(true)
    expect(canTransition("UNDER_REVIEW", "ASSESSMENT")).toBe(true)
    expect(canTransition("ASSESSMENT", "DECISION")).toBe(true)
    expect(canTransition("DECISION", "ACCEPTED")).toBe(true)
    expect(canTransition("ACCEPTED", "ENROLLED")).toBe(true)
  })

  it("rejects backwards or terminal-state transitions", () => {
    expect(canTransition("DRAFT", "ACCEPTED")).toBe(false)
    expect(canTransition("ENROLLED", "DRAFT")).toBe(false)
    expect(canTransition("DECLINED", "ENROLLED")).toBe(false)
  })
})
