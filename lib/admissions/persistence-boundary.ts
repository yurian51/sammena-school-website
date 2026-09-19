import type { AdmissionApplicationInput } from "./application-schema"
import type { AdmissionApplicationRecord } from "./application-record"
import { getApplication, listApplications, submitApplication } from "./application-store"

function toRecord(input: AdmissionApplicationInput) {
  const { consent: _consent, ...data } = input
  const stored = submitApplication(data)
  return {
    reference: stored.reference,
    status: stored.status,
    data,
    submittedAt: stored.submittedAt,
    createdAt: stored.createdAt,
    updatedAt: stored.updatedAt,
  } satisfies AdmissionApplicationRecord
}

/** Development repository boundary. Replace implementation with a transactional DB repository in production. */
export interface AdmissionsRepository {
  create(data: AdmissionApplicationInput): AdmissionApplicationRecord
  findByReference(reference: string): AdmissionApplicationRecord | undefined
  list(status?: string): AdmissionApplicationRecord[]
}

export const developmentAdmissionsRepository: AdmissionsRepository = {
  create: toRecord,
  findByReference: reference => {
    const stored = getApplication(reference)
    if (!stored) return undefined
    return {
      reference: stored.reference,
      status: stored.status,
      data: stored,
      submittedAt: stored.submittedAt,
      createdAt: stored.createdAt,
      updatedAt: stored.updatedAt,
    }
  },
  list: status => listApplications(status as Parameters<typeof listApplications>[0]).map(stored => ({
    reference: stored.reference,
    status: stored.status,
    data: stored,
    submittedAt: stored.submittedAt,
    createdAt: stored.createdAt,
    updatedAt: stored.updatedAt,
  })),
}
