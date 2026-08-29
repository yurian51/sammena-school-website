import type { AdmissionStatus } from "./application-schema"

export type AdmissionAuditEvent = {
  eventId: string
  reference: string
  action: "CREATED" | "SUBMITTED" | "STATUS_CHANGED" | "NOTE_ADDED" | "DOCUMENT_REQUESTED" | "DECISION_RECORDED"
  fromStatus?: AdmissionStatus
  toStatus?: AdmissionStatus
  actorId?: string
  reason?: string
  createdAt: string
}

export function createAdmissionAuditEvent(input: Omit<AdmissionAuditEvent, "eventId" | "createdAt">): AdmissionAuditEvent {
  return {
    ...input,
    eventId: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
}
