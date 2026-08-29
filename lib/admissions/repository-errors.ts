export class AdmissionsRepositoryError extends Error {
  constructor(public readonly code: "NOT_FOUND" | "DUPLICATE_REFERENCE" | "PERSISTENCE_FAILURE", message: string) {
    super(message)
    this.name = "AdmissionsRepositoryError"
  }
}

export function isAdmissionsRepositoryError(error: unknown): error is AdmissionsRepositoryError {
  return error instanceof AdmissionsRepositoryError
}
