import { describe, expect, it } from "vitest"
import { validateAdmissionConsent } from "./consent"

describe("admission consent", () => {
  it("rejects missing consent", () => {
    expect(validateAdmissionConsent({}).valid).toBe(false)
  })
  it("accepts both required consents", () => {
    expect(validateAdmissionConsent({ privacyAccepted: true, termsAccepted: true }).valid).toBe(true)
  })
})
