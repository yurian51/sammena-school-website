import type { Enrollment, Student } from "./types"
import type { Guardian, StudentGuardian } from "./supporting-types"

const CURRENT_ENROLLMENT_STATUSES = new Set<Enrollment["status"]>(["ACTIVE"])

export interface StudentProfileContext {
  student: Student
  guardians: Guardian[]
  enrollments: Enrollment[]
  primaryGuardian: Guardian | null
  currentEnrollment: Enrollment | null
}

export function resolveStudentProfileContext(
  student: Student,
  guardians: Guardian[],
  enrollments: Enrollment[],
  relationships: StudentGuardian[] = [],
): StudentProfileContext {
  const primaryRelationship = relationships.find(relationship => relationship.isPrimary)
  const primaryGuardian = primaryRelationship
    ? guardians.find(guardian => guardian.id === primaryRelationship.guardianId) ?? null
    : null
  const currentEnrollment = enrollments.find(enrollment =>
    CURRENT_ENROLLMENT_STATUSES.has(enrollment.status),
  ) ?? null

  return {
    student,
    guardians,
    enrollments,
    primaryGuardian,
    currentEnrollment,
  }
}
