import type { AdmissionApplicationInput } from "./application-schema"
import type { AdmissionApplicationRecord } from "./application-record"

export interface PersistentAdmissionsRepository {
  create(input: AdmissionApplicationInput): Promise<AdmissionApplicationRecord>
  findByReference(reference: string): Promise<AdmissionApplicationRecord | undefined>
  list(status?: string): Promise<AdmissionApplicationRecord[]>
}

export function assertRepositoryReady(repository: PersistentAdmissionsRepository) {
  if (!repository || typeof repository.create !== "function" || typeof repository.findByReference !== "function" || typeof repository.list !== "function") {
    throw new Error("ADMISSIONS_REPOSITORY_NOT_READY")
  }
}
