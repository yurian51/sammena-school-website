import { describe, expect, it } from "vitest"
import { canTransition } from "@/lib/admissions/state-machine"

describe("admissions lifecycle", () => {
  it("allows draft to submitted", () => expect(canTransition("DRAFT", "SUBMITTED")).toBe(true))
  it("rejects submitted to draft", () => expect(canTransition("SUBMITTED", "DRAFT")).toBe(false))
  it("allows accepted to enrolled", () => expect(canTransition("ACCEPTED", "ENROLLED")).toBe(true))
})
