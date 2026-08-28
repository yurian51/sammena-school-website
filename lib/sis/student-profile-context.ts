import type { Enrollment, Student } from "./types"
import type { Guardian, StudentGuardian } from "./supporting-types"
import { resolveStudentProfileContext } from "./student-profile-resolver"

export interface StudentProfileContextSources {
  findStudent(id: string): Promise<Student | null>
  listGuardians(studentId: string): Promise<Guardian[]>
  listGuardianRelationships(studentId: string): Promise<StudentGuardian[]>
  listEnrollments(studentId: string, academicYearId?: string): Promise<Enrollment[]>
}

export async function loadStudentProfileContext(
  schoolId: string,
  studentId: string,
  sources: StudentProfileContextSources,
  academicYearId?: string,
) {
  const student = await sources.findStudent(studentId)
  if (!student) throw new Error("SIS_STUDENT_NOT_FOUND")
  if (student.schoolId !== schoolId) throw new Error("SIS_SCHOOL_SCOPE_VIOLATION")

  const [guardians, relationships, enrollments] = await Promise.all([
    sources.listGuardians(studentId),
    sources.listGuardianRelationships(studentId),
    sources.listEnrollments(studentId, academicYearId),
  ])

  return resolveStudentProfileContext(student, guardians, enrollments, relationships)
}
