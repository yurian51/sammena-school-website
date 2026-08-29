import type { AdmissionApplicationRecord } from "./application-record"

export function admissionMetrics(records: AdmissionApplicationRecord[]) {
  const byStatus = records.reduce<Record<string, number>>((acc, record) => { acc[record.status] = (acc[record.status] ?? 0) + 1; return acc }, {})
  return { total: records.length, byStatus, submitted: byStatus.SUBMITTED ?? 0, underReview: byStatus.UNDER_REVIEW ?? 0, accepted: byStatus.ACCEPTED ?? 0, rejected: byStatus.REJECTED ?? 0, needsInformation: byStatus.MORE_INFORMATION ?? 0 }
}
