import { loadStudentProfileContext, type StudentProfileContextSources } from "./student-profile-context"

export interface StudentProfileApiResponse {
  student: Awaited<ReturnType<StudentProfileContextSources["findStudent"]>>
  guardians: Awaited<ReturnType<StudentProfileContextSources["listGuardians"]>>
  enrollments: Awaited<ReturnType<StudentProfileContextSources["listEnrollments"]>>
  primaryGuardian: Awaited<ReturnType<StudentProfileContextSources["listGuardians"]>>[number] | null
  currentEnrollment: Awaited<ReturnType<StudentProfileContextSources["listEnrollments"]>>[number] | null
}

export async function getStudentProfile(
  schoolId: string,
  studentId: string,
  sources: StudentProfileContextSources,
  academicYearId?: string,
): Promise<StudentProfileApiResponse> {
  return loadStudentProfileContext(
    schoolId,
    studentId,
    sources,
    academicYearId,
  )
}
