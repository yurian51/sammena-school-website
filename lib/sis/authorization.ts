export type StudentProfileRole = "ADMIN" | "SCHOOL_ADMIN" | "TEACHER" | "PARENT" | "STUDENT"

const PROFILE_ROLES = new Set<StudentProfileRole>(["ADMIN", "SCHOOL_ADMIN", "TEACHER", "PARENT", "STUDENT"])

export type StudentProfileActor =
  | { role: "ADMIN" | "SCHOOL_ADMIN"; schoolId: string }
  | { role: "TEACHER"; schoolId: string; assignedStudentIds: readonly string[] }
  | { role: "PARENT"; schoolId: string; linkedStudentIds: readonly string[] }
  | { role: "STUDENT"; schoolId: string; studentId: string }

export interface StudentProfileTarget {
  schoolId: string
  studentId: string
}

export function canReadStudentProfile(role: StudentProfileRole): boolean {
  return PROFILE_ROLES.has(role)
}

export function assertStudentProfileAccess(role: StudentProfileRole): void {
  if (!canReadStudentProfile(role)) {
    throw new Error("SIS_PROFILE_FORBIDDEN")
  }
}

export function assertStudentProfileObjectAccess(
  actor: StudentProfileActor,
  target: StudentProfileTarget,
): void {
  if (actor.schoolId !== target.schoolId) {
    throw new Error("SIS_SCHOOL_SCOPE_VIOLATION")
  }

  switch (actor.role) {
    case "ADMIN":
    case "SCHOOL_ADMIN":
      return
    case "TEACHER":
      if (actor.assignedStudentIds.includes(target.studentId)) return
      break
    case "PARENT":
      if (actor.linkedStudentIds.includes(target.studentId)) return
      break
    case "STUDENT":
      if (actor.studentId === target.studentId) return
      break
  }

  throw new Error("SIS_PROFILE_FORBIDDEN")
}
