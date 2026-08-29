import type { AdmissionApplicationRecord } from "./application-record"

export type AdmissionFilters = { query?: string; status?: string; entry?: string; studyType?: string }

export function filterAdmissionApplications(records: AdmissionApplicationRecord[], filters: AdmissionFilters = {}) {
  const query = filters.query?.trim().toLowerCase()
  return records.filter(record => {
    const data = record.data as Record<string, unknown>
    const haystack = [record.reference, data.learner, data.guardian, data.phone].map(value => String(value ?? "").toLowerCase())
    return (!query || haystack.some(value => value.includes(query))) && (!filters.status || record.status === filters.status) && (!filters.entry || String(data.entry ?? "") === filters.entry) && (!filters.studyType || String(data.studyType ?? "") === filters.studyType)
  })
}
