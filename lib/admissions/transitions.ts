import type { ApplicationStatus } from "./types"

const transitions: Record<ApplicationStatus, readonly ApplicationStatus[]> = {
  DRAFT: ["SUBMITTED"],
  SUBMITTED: ["UNDER_REVIEW"],
  UNDER_REVIEW: ["ASSESSMENT", "DECISION"],
  ASSESSMENT: ["DECISION"],
  DECISION: ["ACCEPTED", "WAITLISTED", "DECLINED"],
  ACCEPTED: ["ENROLLED"],
  WAITLISTED: ["ACCEPTED", "DECLINED"],
  DECLINED: [],
  ENROLLED: [],
}

export function canTransition(from: ApplicationStatus, to: ApplicationStatus): boolean {
  return transitions[from].includes(to)
}
