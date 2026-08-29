import type { AdmissionApplicationRecord } from "./application-record"

export type ApplicationSearch = { query?: string; status?: string }

export function searchApplications(records: AdmissionApplicationRecord[], filters: ApplicationSearch = {}) {
  const query = filters.query?.trim().toLowerCase()
  return records.filter(record => {
    const matchesStatus = !filters.status || record.status === filters.status
    if (!matchesStatus) return false
    if (!query) return true
    const data = record.data as Record<string, unknown>
    return [record.reference, data.learner, data.guardian, data.phone].some(value => String(value ?? "").toLowerCase().includes(query))
  })
}
