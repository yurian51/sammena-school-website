export interface StudentProfileHttpError {
  code: "SIS_STUDENT_NOT_FOUND" | "SIS_SCHOOL_SCOPE_VIOLATION" | "SIS_PROFILE_FORBIDDEN"
  status: 403 | 404
}

export function toStudentProfileHttpError(error: unknown): StudentProfileHttpError {
  const code = error instanceof Error ? error.message : ""

  if (code === "SIS_STUDENT_NOT_FOUND") {
    return { code, status: 404 }
  }

  if (code === "SIS_PROFILE_FORBIDDEN" || code === "SIS_SCHOOL_SCOPE_VIOLATION") {
    return { code, status: 403 }
  }

  return { code: "SIS_PROFILE_FORBIDDEN", status: 403 }
}
