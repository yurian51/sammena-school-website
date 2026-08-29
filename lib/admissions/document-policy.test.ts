import { describe, expect, it } from "vitest"
import { canTransitionDocumentStatus } from "./document-policy"

describe("admission document policy", () => {
  it("allows pending review to become verified or rejected", () => {
    expect(canTransitionDocumentStatus("PENDING_REVIEW", "VERIFIED")).toBe(true)
    expect(canTransitionDocumentStatus("PENDING_REVIEW", "REJECTED")).toBe(true)
  })
  it("does not allow verified documents to change state", () => {
    expect(canTransitionDocumentStatus("VERIFIED", "REJECTED")).toBe(false)
  })
})
