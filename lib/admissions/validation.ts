import type { CreateApplicationInput } from "./types"
import { admissionEntryLevels, guardianRelationships } from "./options"

export type ValidationResult =
  | { ok: true }
  | { ok: false; code: "VALIDATION_ERROR"; fields: string[] }

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/
const GUARDIAN_RELATIONSHIPS = new Set<string>(guardianRelationships)
const ENTRY_LEVELS = new Set<string>(admissionEntryLevels)

function isCalendarDate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false
  const date = new Date(`${value}T00:00:00.000Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
}

function isValidAcademicYear(value: string): boolean {
  const match = value.trim().match(/^(\d{4})(?:\/(\d{4}))?$/)
  if (!match) return false
  if (!match[2]) return true
  return Number(match[2]) === Number(match[1]) + 1
}

export function validateAdmissionsApplication(input: Partial<CreateApplicationInput>): ValidationResult {
  const fields: string[] = []
  const guardian = input.guardian
  const learner = input.learner

  if (!guardian?.fullName?.trim() || guardian.fullName.trim().length < 2) fields.push("guardian.fullName")
  if (!guardian?.phone?.trim() || guardian.phone.trim().length < 7) fields.push("guardian.phone")
  if (!guardian?.relationship?.trim() || !GUARDIAN_RELATIONSHIPS.has(guardian.relationship.trim())) fields.push("guardian.relationship")

  if (!input.academicYear?.trim() || !isValidAcademicYear(input.academicYear)) fields.push("academicYear")
  if (input.studyType !== "Day" && input.studyType !== "Boarding") fields.push("studyType")

  if (!learner?.fullName?.trim() || learner.fullName.trim().length < 2) fields.push("learner.fullName")
  if (!learner?.dateOfBirth?.trim() || !isCalendarDate(learner.dateOfBirth)) fields.push("learner.dateOfBirth")
  if (learner?.dateOfBirth && isCalendarDate(learner.dateOfBirth) && learner.dateOfBirth > new Date().toISOString().slice(0, 10)) {
    fields.push("learner.dateOfBirth")
  }
  if (!learner?.entryLevel?.trim() || !ENTRY_LEVELS.has(learner.entryLevel.trim())) fields.push("learner.entryLevel")

  return fields.length ? { ok: false, code: "VALIDATION_ERROR", fields: [...new Set(fields)] } : { ok: true }
}
