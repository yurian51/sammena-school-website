import type { AdmissionApplicationInput, AdmissionStatus } from "./application-schema"

export type AdmissionApplicationRecord = {
  reference: string
  status: AdmissionStatus
  data: Omit<AdmissionApplicationInput, "consent">
  submittedAt: string
  createdAt: string
  updatedAt: string
}
