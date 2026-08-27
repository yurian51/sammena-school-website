import type { CreateApplicationInput } from "./types"

export function sanitizeAdmissionsInput(input: CreateApplicationInput): CreateApplicationInput {
  return {
    guardian: {
      fullName: input.guardian.fullName.trim(),
      phone: input.guardian.phone.trim(),
      email: input.guardian.email?.trim() || undefined,
    },
    learner: {
      fullName: input.learner.fullName.trim(),
      dateOfBirth: input.learner.dateOfBirth.trim(),
      entryLevel: input.learner.entryLevel.trim(),
      previousSchool: input.learner.previousSchool?.trim() || undefined,
    },
  }
}
