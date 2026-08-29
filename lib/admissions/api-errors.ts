export function admissionsErrorResponse(code: string) {
  const map: Record<string, { status: number; message: string }> = {
    NOT_FOUND: { status: 404, message: "Application not found." },
    DUPLICATE_REFERENCE: { status: 409, message: "Application reference already exists." },
    PERSISTENCE_FAILURE: { status: 503, message: "Admissions service is temporarily unavailable." },
    INVALID_STATUS_TRANSITION: { status: 409, message: "This application cannot move to the requested status." },
  }
  return map[code] ?? { status: 500, message: "An unexpected admissions error occurred." }
}
