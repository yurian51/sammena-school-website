import { EnrollmentStatus } from "./types"

const allowedTransitions: Record<EnrollmentStatus, readonly EnrollmentStatus[]> = {
  PENDING: ["ACTIVE", "CANCELLED"],
  ACTIVE: ["PROMOTED", "REPEATED", "TRANSFERRED", "WITHDRAWN", "GRADUATED"],
  PROMOTED: [],
  REPEATED: [],
  TRANSFERRED: [],
  WITHDRAWN: [],
  GRADUATED: [],
  CANCELLED: [],
}

export function canTransitionEnrollment(
  from: EnrollmentStatus,
  to: EnrollmentStatus,
): boolean {
  return allowedTransitions[from].includes(to)
}

export function assertEnrollmentTransition(
  from: EnrollmentStatus,
  to: EnrollmentStatus,
): void {
  if (!canTransitionEnrollment(from, to)) {
    throw new Error(`INVALID_ENROLLMENT_TRANSITION:${from}:${to}`)
  }
}
