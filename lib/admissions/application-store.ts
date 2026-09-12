import { generateApplicationReference } from "./reference"
import type { AdmissionApplicationInput, AdmissionStatus } from "./application-schema"
import type { AdmissionApplicationRecord } from "./application-record"

export type StoredApplicationInput = AdmissionApplicationInput
export type StoredApplication = AdmissionApplicationRecord

const store = new Map<string, StoredApplication>()

export function submitApplication(input: StoredApplicationInput): StoredApplication {
  const now = new Date().toISOString()
  const { consent: _consent, ...data } = input
  const application: StoredApplication = {
    reference: generateApplicationReference(),
    status: "SUBMITTED",
    data,
    submittedAt: now,
    createdAt: now,
    updatedAt: now,
  }

  store.set(application.reference, application)
  return application
}

export function getApplication(reference: string): StoredApplication | undefined {
  return store.get(reference)
}

export function listApplications(status?: AdmissionStatus): StoredApplication[] {
  const applications = Array.from(store.values())
  return status ? applications.filter((application) => application.status === status) : applications
}

export function clearApplicationStore(): void {
  store.clear()
}
