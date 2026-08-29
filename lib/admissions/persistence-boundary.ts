import type { AdmissionApplicationInput } from "./application-schema"
import type { AdmissionApplicationRecord } from "./application-record"
import { submitApplication } from "./application-store"

/** Development repository boundary. Replace implementation with a transactional DB repository in production. */
export interface AdmissionsRepository {
  create(data: AdmissionApplicationInput): AdmissionApplicationRecord
  findByReference(reference: string): AdmissionApplicationRecord | undefined
  list(status?: string): AdmissionApplicationRecord[]
}

export const developmentAdmissionsRepository: AdmissionsRepository = {
  create: submitApplication,
  findByReference: reference => requireApplication(reference),
  list: status => {
    const { listApplications } = require("./application-store") as typeof import("./application-store")
    return listApplications(status as Parameters<typeof listApplications>[0])
  },
}

function requireApplication(reference: string) {
  const { getApplication } = require("./application-store") as typeof import("./application-store")
  return getApplication(reference)
}
