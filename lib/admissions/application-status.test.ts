import { describe, expect, it } from "vitest"
import { canTransitionAdmissionStatus } from "./application-status"

describe("admission status transitions", () => {
  it("allows a submitted application to enter review", () => {
    expect(canTransitionAdmissionStatus("SUBMITTED", "UNDER_REVIEW")).toBe(true)
  })

  it("allows review to request more information", () => {
    expect(canTransitionAdmissionStatus("UNDER_REVIEW", "MORE_INFORMATION")).toBe(true)
  })

  it("does not allow a rejected application to become accepted", () => {
    expect(canTransitionAdmissionStatus("REJECTED", "ACCEPTED")).toBe(false)
  })
})
