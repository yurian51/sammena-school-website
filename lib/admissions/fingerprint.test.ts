import { describe, expect, it } from "vitest"
import { createSubmissionFingerprint } from "./fingerprint"

const input = {
  academicYear: "2026",
  studyType: "Day",
  guardian: { fullName: "Jane Doe", phone: "+255700000000", email: "JANE@example.com", relationship: "Mother" },
  learner: { fullName: "John Doe", dateOfBirth: "2018-01-02", entryLevel: "Standard I", previousSchool: "Example School" },
}

describe("admission submission fingerprint", () => {
  it("is deterministic and normalization-safe", () => {
    const same = { ...input, guardian: { ...input.guardian, fullName: "  jane   doe " } }
    expect(createSubmissionFingerprint(input)).toBe(createSubmissionFingerprint(same))
  })
})
