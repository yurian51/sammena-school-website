import { describe, expect, it } from "vitest"
import { evaluateAdmissionEligibility } from "./eligibility"

describe("admissions eligibility", () => {
  it("requires core admission information", () => {
    const result = evaluateAdmissionEligibility({ learner: "", guardian: "", phone: "", entry: "", studyType: "" } as any)
    expect(result.eligible).toBe(false)
    expect(result.reasons.length).toBeGreaterThan(0)
  })
  it("accepts an application with core information", () => {
    const result = evaluateAdmissionEligibility({ learner: "Amani", guardian: "Parent", phone: "0712345678", entry: "Class I", studyType: "Day" } as any)
    expect(result.eligible).toBe(true)
  })
})
