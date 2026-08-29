import type { AdmissionStatus } from "./application-schema"
import { canTransitionAdmissionStatus } from "./application-status"

export function validateAdmissionTransition(from: AdmissionStatus, to: AdmissionStatus) {
  return { allowed: canTransitionAdmissionStatus(from, to), from, to }
}
