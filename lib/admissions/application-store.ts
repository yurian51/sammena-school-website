import type { AdmissionApplicationInput, AdmissionStatus } from "./application-schema"
import { createApplicationRecord, type AdmissionApplicationRecord } from "./application-record"
import { createAdmissionReference } from "./application-reference"

const records = new Map<string, AdmissionApplicationRecord>()

export function submitApplication(data: AdmissionApplicationInput): AdmissionApplicationRecord {
  const reference = createAdmissionReference()
  const record = createApplicationRecord(reference, data, "SUBMITTED")
  records.set(reference, record)
  return record
}

export function getApplication(reference: string): AdmissionApplicationRecord | undefined {
  return records.get(reference)
}

export function listApplications(status?: AdmissionStatus): AdmissionApplicationRecord[] {
  const values = Array.from(records.values())
  return status ? values.filter(record => record.status === status) : values
}

export function clearApplicationStore(): void {
  records.clear()
}
