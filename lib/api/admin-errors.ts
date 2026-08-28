import { mapDomainError } from "./errors"

export function mapAdminError(error: unknown, requestId: string) {
  if (error instanceof Error && error.message === "FORBIDDEN") {
    return mapDomainError(new Error("FORBIDDEN"), requestId)
  }
  return mapDomainError(error, requestId)
}
