import { loadStudentProfileContext, type StudentProfileContextSources } from "./student-profile-context"
import {
  buildEnrollmentTimeline,
  calculateStudentProfileHealth,
  type StudentEnrollmentTimelineItem,
  type StudentProfileHealth,
} from "./student-profile-features"

export interface StudentProfileApiResponse {
  student: Awaited<ReturnType<StudentProfileContextSources["findStudent"]>>
  guardians: Awaited<ReturnType<StudentProfileContextSources["listGuardians"]>>
  enrollments: Awaited<ReturnType<StudentProfileContextSources["listEnrollments"]>>
  primaryGuardian: Awaited<ReturnType<StudentProfileContextSources["listGuardians"]>>[number] | null
  currentEnrollment: Awaited<ReturnType<StudentProfileContextSources["listEnrollments"]>>[number] | null
  health: StudentProfileHealth
  enrollmentTimeline: StudentEnrollmentTimelineItem[]
}

export async function getStudentProfile(
  schoolId: string,
  studentId: string,
  sources: StudentProfileContextSources,
  academicYearId?: string,
): Promise<StudentProfileApiResponse> {
  const profile = await loadStudentProfileContext(
    schoolId,
    studentId,
    sources,
    academicYearId,
  )

  return {
    ...profile,
    health: calculateStudentProfileHealth(
      profile.student,
      profile.guardians,
      profile.primaryGuardian,
      profile.currentEnrollment,
    ),
    enrollmentTimeline: buildEnrollmentTimeline(profile.enrollments),
  }
}
