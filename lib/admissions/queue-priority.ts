import type { AdmissionApplicationRecord } from "./application-record"
import { calculateReviewSla } from "./review-sla"

const weight: Record<string, number> = { MORE_INFORMATION: 30, SUBMITTED: 20, UNDER_REVIEW: 10, ACCEPTED: 0, REJECTED: 0 }

export function admissionQueuePriority(record: AdmissionApplicationRecord, now = new Date()) {
  const sla = calculateReviewSla(record.submittedAt, 48, now)
  return weight[record.status] + (sla.overdue ? 100 : 0)
}
