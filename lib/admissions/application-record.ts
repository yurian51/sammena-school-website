import type { AdmissionApplicationInput, AdmissionStatus } from "./application-schema"

export type AdmissionApplicationRecord = {
  reference: string
  status: AdmissionStatus
  submittedAt: string
  data: AdmissionApplicationInput
  reviewerId?: string
  decisionReason?: string
}

export function createApplicationRecord(reference: string, data: AdmissionApplicationInput, status: AdmissionStatus = "SUBMITTED"): AdmissionApplicationRecord {
  return {
    reference,
    status,
    submittedAt: new Date().toISOString(),
    data,
  }
}
