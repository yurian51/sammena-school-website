import type { AdmissionApplicationRecord } from "./application-record"

const PUBLIC_STATUSES = new Set(["SUBMITTED", "UNDER_REVIEW", "MORE_INFORMATION", "ACCEPTED", "REJECTED"])

export function toPublicApplicationStatus(record: AdmissionApplicationRecord) {
  return { reference: record.reference, status: PUBLIC_STATUSES.has(record.status) ? record.status : "SUBMITTED", submittedAt: record.submittedAt }
}
