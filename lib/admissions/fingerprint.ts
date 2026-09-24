import { createHash } from "node:crypto"
import type { CreateApplicationInput } from "./types"

function normalize(value: string | undefined | null) {
  return (value ?? "").trim().toLowerCase().replace(/\s+/g, " ")
}

export function createSubmissionFingerprint(input: CreateApplicationInput): string {
  const canonical = JSON.stringify({
    academicYear: normalize(input.academicYear),
    studyType: normalize(input.studyType),
    guardian: {
      fullName: normalize(input.guardian.fullName),
      phone: normalize(input.guardian.phone),
      email: normalize(input.guardian.email),
      relationship: normalize(input.guardian.relationship),
    },
    learner: {
      fullName: normalize(input.learner.fullName),
      dateOfBirth: normalize(input.learner.dateOfBirth),
      entryLevel: normalize(input.learner.entryLevel),
      previousSchool: normalize(input.learner.previousSchool),
    },
  })
  return createHash("sha256").update(canonical).digest("hex")
}
