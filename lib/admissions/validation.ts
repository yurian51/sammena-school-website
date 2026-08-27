import type { AdmissionsApplication } from "./types"

export type ValidationResult =
  | { ok: true }
  | { ok: false; code: "VALIDATION_ERROR"; fields: string[] }

export function validateAdmissionsApplication(input: Partial<AdmissionsApplication>): ValidationResult {
  const fields: string[] = []
  if (!input.guardian?.fullName?.trim()) fields.push("guardian.fullName")
  if (!input.guardian?.phone?.trim()) fields.push("guardian.phone")
  if (!input.learner?.fullName?.trim()) fields.push("learner.fullName")
  if (!input.learner?.dateOfBirth?.trim()) fields.push("learner.dateOfBirth")
  if (!input.learner?.requestedEntryLevel?.trim()) fields.push("learner.requestedEntryLevel")
  return fields.length ? { ok: false, code: "VALIDATION_ERROR", fields } : { ok: true }
}
