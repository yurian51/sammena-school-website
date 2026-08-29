export const admissionStatusTransitions = {
  DRAFT: ["SUBMITTED"],
  SUBMITTED: ["UNDER_REVIEW"],
  UNDER_REVIEW: ["MORE_INFORMATION", "ACCEPTED", "REJECTED"],
  MORE_INFORMATION: ["SUBMITTED", "UNDER_REVIEW"],
  ACCEPTED: [],
  REJECTED: [],
} as const

export function canTransitionAdmissionStatus(from: keyof typeof admissionStatusTransitions, to: string): boolean {
  return (admissionStatusTransitions[from] as readonly string[]).includes(to)
}
