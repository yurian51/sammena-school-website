import { generateApplicationReference } from "./reference"
import type { AdmissionApplicationInput } from "./application-schema"

export type StoredApplicationInput = Omit<AdmissionApplicationInput, "consent">

export type StoredApplication = StoredApplicationInput & {
  reference: string
  status: "DRAFT" | "SUBMITTED" | "UNDER_REVIEW" | "MORE_INFORMATION" | "ACCEPTED" | "REJECTED"
  submittedAt: string
  createdAt: string
  updatedAt: string
}

const store = new Map<string, StoredApplication>()

export function submitApplication(input: StoredApplicationInput): StoredApplication {
  const now = new Date().toISOString()
  const application: StoredApplication = {
    ...input,
    reference: generateApplicationReference(),
    status: "SUBMITTED",
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

export function listApplications(status?: StoredApplication["status"]): StoredApplication[] {
  const applications = Array.from(store.values())
  return status ? applications.filter((application) => application.status === status) : applications
}

export function clearApplicationStore(): void {
  store.clear()
}
