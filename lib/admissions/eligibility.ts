import type { AdmissionApplicationInput } from "./application-schema"

export type EligibilityResult = { eligible: boolean; reasons: string[] }

export function evaluateAdmissionEligibility(input: AdmissionApplicationInput): EligibilityResult {
  const reasons: string[] = []
  if (!input.learner.trim()) reasons.push("Learner name is required")
  if (!input.guardian.trim()) reasons.push("Guardian name is required")
  if (!input.phone.trim()) reasons.push("Guardian phone is required")
  if (!input.entry) reasons.push("Entry level is required")
  if (!input.studyType) reasons.push("Study type is required")
  return { eligible: reasons.length === 0, reasons }
}
