import type { AdmissionApplicationRecord } from "./application-record"

export function mapPrismaApplication(row: any): AdmissionApplicationRecord {
  return {
    reference: row.reference,
    status: row.status,
    submittedAt: row.submittedAt?.toISOString?.() ?? row.createdAt.toISOString(),
    data: { academicYear: row.academicYear, entry: row.entry, studyType: row.studyType, guardian: row.guardian?.fullName ?? "", phone: row.guardian?.phone ?? "", email: row.guardian?.email ?? "" },
  } as AdmissionApplicationRecord
}
