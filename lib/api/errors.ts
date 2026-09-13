export type ApiErrorCode = "VALIDATION_ERROR" | "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "CONFLICT" | "RATE_LIMITED" | "INTERNAL_ERROR" | "REQUEST_TOO_LARGE" | "SERVICE_UNAVAILABLE"

export function apiError(code: ApiErrorCode, message: string, status: number, requestId = crypto.randomUUID()) {
  return Response.json({ error: { code, message, requestId } }, { status })
}

export function mapDomainError(error: unknown, requestId?: string) {
  const code = error instanceof Error ? error.message : "INTERNAL_ERROR"
  if (code === "VALIDATION_ERROR") return apiError("VALIDATION_ERROR", "The submitted information is invalid.", 400, requestId)
  if (code === "REQUEST_TOO_LARGE") return apiError("REQUEST_TOO_LARGE", "The submitted request is too large.", 413, requestId)
  if (code === "UNAUTHORIZED") return apiError("UNAUTHORIZED", "Authentication is required.", 401, requestId)
  if (code === "FORBIDDEN" || code === "SCHOOL_SCOPE_REQUIRED") return apiError("FORBIDDEN", "A valid school-scoped account is required.", 403, requestId)
  if (code === "APPLICATION_NOT_FOUND") return apiError("NOT_FOUND", "The requested application could not be found.", 404, requestId)
  if (code === "CMS_CONTENT_NOT_FOUND") return apiError("NOT_FOUND", "The requested content could not be found.", 404, requestId)
  if (code === "INVALID_STATUS_TRANSITION") return apiError("CONFLICT", "The application cannot be changed from its current status.", 409, requestId)
  if (code === "AUTH_PROVIDER_NOT_CONFIGURED" || code === "PORTAL_DATA_SOURCE_NOT_CONFIGURED" || code === "DATABASE_CLIENT_NOT_CONFIGURED") {
    return apiError("SERVICE_UNAVAILABLE", "This school service is not connected to its required backend yet.", 503, requestId)
  }
  return apiError("INTERNAL_ERROR", "An unexpected error occurred.", 500, requestId)
}
