import type { AdmissionApplicationRecord } from "./application-record"

export function buildApplicationSummary(record: AdmissionApplicationRecord) {
  const data = record.data as Record<string, unknown>
  return {
    reference: record.reference,
    status: record.status,
    learner: String(data.learner ?? ""),
    guardian: String(data.guardian ?? ""),
    phone: String(data.phone ?? ""),
    entry: String(data.entry ?? ""),
    studyType: String(data.studyType ?? ""),
    academicYear: String(data.academicYear ?? ""),
    submittedAt: record.submittedAt,
  }
}
