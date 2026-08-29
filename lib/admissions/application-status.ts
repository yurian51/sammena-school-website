import type { AdmissionStatus } from "./application-schema"

export const admissionStatusTransitions: Record<AdmissionStatus, readonly AdmissionStatus[]> = {
  DRAFT: ["SUBMITTED"],
  SUBMITTED: ["UNDER_REVIEW"],
  UNDER_REVIEW: ["MORE_INFORMATION", "ACCEPTED", "REJECTED"],
  MORE_INFORMATION: ["SUBMITTED", "UNDER_REVIEW"],
  ACCEPTED: [],
  REJECTED: [],
}

export function canTransitionAdmissionStatus(from: AdmissionStatus, to: AdmissionStatus): boolean {
  return admissionStatusTransitions[from].includes(to)
}

export function transitionAdmissionStatus(from: AdmissionStatus, to: AdmissionStatus): AdmissionStatus {
  if (!canTransitionAdmissionStatus(from, to)) {
    throw new Error(`INVALID_ADMISSION_TRANSITION:${from}->${to}`)
  }
  return to
}

export function getAllowedAdmissionTransitions(status: AdmissionStatus): readonly AdmissionStatus[] {
  return admissionStatusTransitions[status]
}
