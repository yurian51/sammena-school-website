export interface StudentProfileRequest {
  schoolId: string
  studentId: string
  academicYearId?: string
}

export interface StudentProfileError {
  code:
    | "SIS_STUDENT_NOT_FOUND"
    | "SIS_SCHOOL_SCOPE_VIOLATION"
    | "SIS_PROFILE_FORBIDDEN"
}

export const STUDENT_PROFILE_API = {
  method: "GET",
  path: "/api/sis/students/:studentId/profile",
  query: ["academicYearId"],
  errors: [
    "SIS_STUDENT_NOT_FOUND",
    "SIS_SCHOOL_SCOPE_VIOLATION",
    "SIS_PROFILE_FORBIDDEN",
  ],
} as const
