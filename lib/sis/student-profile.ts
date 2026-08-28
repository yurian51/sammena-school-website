import type { Guardian, Student } from "./supporting-types"
import type { Enrollment } from "./types"

export interface StudentProfile {
  student: Student
  guardians: Guardian[]
  enrollments: Enrollment[]
}

export interface StudentProfileSources {
  findStudent(id: string): Promise<Student | null>
  listGuardians(studentId: string): Promise<Guardian[]>
  listEnrollments(studentId: string, academicYearId?: string): Promise<Enrollment[]>
}

export class StudentProfileService {
  constructor(
    private readonly schoolId: string,
    private readonly sources: StudentProfileSources,
  ) {}

  async get(id: string, academicYearId?: string): Promise<StudentProfile> {
    const student = await this.sources.findStudent(id)
    if (!student) throw new Error("SIS_STUDENT_NOT_FOUND")
    if (student.schoolId !== this.schoolId) {
      throw new Error("SIS_SCHOOL_SCOPE_VIOLATION")
    }

    const [guardians, enrollments] = await Promise.all([
      this.sources.listGuardians(id),
      this.sources.listEnrollments(id, academicYearId),
    ])

    return { student, guardians, enrollments }
  }
}
