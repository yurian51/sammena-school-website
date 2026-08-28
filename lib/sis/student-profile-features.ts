import type { Enrollment, Student } from "./types"
import type { Guardian } from "./supporting-types"

export interface StudentProfileHealth {
  score: number
  hasGuardian: boolean
  hasPrimaryGuardian: boolean
  hasActiveEnrollment: boolean
  hasStream: boolean
  missing: string[]
}

export interface StudentEnrollmentTimelineItem {
  enrollmentId: string
  academicYearId: string
  classId: string
  streamId?: string
  status: Enrollment["status"]
  enrolledAt: string
}

export function calculateStudentProfileHealth(
  student: Student,
  guardians: Guardian[],
  primaryGuardian: Guardian | null,
  currentEnrollment: Enrollment | null,
): StudentProfileHealth {
  const checks = [
    ["student", Boolean(student.id)],
    ["guardian", guardians.length > 0],
    ["primary guardian", Boolean(primaryGuardian)],
    ["active enrollment", Boolean(currentEnrollment)],
    ["stream", Boolean(currentEnrollment?.streamId)],
  ] as const

  const passed = checks.filter(([, ok]) => ok).length
  return {
    score: Math.round((passed / checks.length) * 100),
    hasGuardian: guardians.length > 0,
    hasPrimaryGuardian: Boolean(primaryGuardian),
    hasActiveEnrollment: Boolean(currentEnrollment),
    hasStream: Boolean(currentEnrollment?.streamId),
    missing: checks.filter(([, ok]) => !ok).map(([label]) => label),
  }
}

export function buildEnrollmentTimeline(
  enrollments: Enrollment[],
): StudentEnrollmentTimelineItem[] {
  return [...enrollments]
    .sort((a, b) => b.enrolledAt.localeCompare(a.enrolledAt))
    .map(enrollment => ({
      enrollmentId: enrollment.id,
      academicYearId: enrollment.academicYearId,
      classId: enrollment.classId,
      streamId: enrollment.streamId,
      status: enrollment.status,
      enrolledAt: enrollment.enrolledAt,
    }))
}
