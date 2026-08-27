export type ApiErrorCode = "VALIDATION_ERROR" | "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "CONFLICT" | "RATE_LIMITED" | "INTERNAL_ERROR"

export function apiError(code: ApiErrorCode, message: string, status: number, requestId = crypto.randomUUID()) {
  return Response.json({ error: { code, message, requestId } }, { status })
}

export function mapDomainError(error: unknown, requestId?: string) {
  const code = error instanceof Error ? error.message : "INTERNAL_ERROR"
  if (code === "VALIDATION_ERROR") return apiError("VALIDATION_ERROR", "The submitted information is invalid.", 400, requestId)
  if (code === "APPLICATION_NOT_FOUND") return apiError("NOT_FOUND", "The requested application could not be found.", 404, requestId)
  if (code === "INVALID_STATUS_TRANSITION") return apiError("CONFLICT", "The application cannot be changed from its current status.", 409, requestId)
  return apiError("INTERNAL_ERROR", "An unexpected error occurred.", 500, requestId)
}
