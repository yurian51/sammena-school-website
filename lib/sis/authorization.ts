export type StudentProfileRole = "ADMIN" | "SCHOOL_ADMIN" | "TEACHER" | "PARENT" | "STUDENT"

const PROFILE_ROLES = new Set<StudentProfileRole>(["ADMIN", "SCHOOL_ADMIN", "TEACHER", "PARENT", "STUDENT"])

export function canReadStudentProfile(role: StudentProfileRole): boolean {
  return PROFILE_ROLES.has(role)
}

export function assertStudentProfileAccess(role: StudentProfileRole): void {
  if (!canReadStudentProfile(role)) {
    throw new Error("SIS_PROFILE_FORBIDDEN")
  }
}
