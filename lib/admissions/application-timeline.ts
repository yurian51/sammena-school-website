import type { AdmissionApplicationRecord } from "./application-record"

export type ApplicationTimelineEvent = { type: string; label: string; timestamp: string; actorId?: string }

export function buildApplicationTimeline(record: AdmissionApplicationRecord, events: ApplicationTimelineEvent[] = []) {
  return [{ type: "SUBMITTED", label: "Application submitted", timestamp: record.submittedAt }, ...events].sort((a, b) => a.timestamp.localeCompare(b.timestamp))
}
