import type { Student } from "./types"
import type { Guardian } from "./supporting-types"
import type { Enrollment } from "./types"
import {
  assertStudentProfileObjectAccess,
  type StudentProfileActor,
} from "./authorization"

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
    const student = await this.requireStudent(id)
    return this.loadProfile(student, academicYearId)
  }

  async getForActor(
    actor: StudentProfileActor,
    id: string,
    academicYearId?: string,
  ): Promise<StudentProfile> {
    const student = await this.requireStudent(id)
    assertStudentProfileObjectAccess(actor, {
      schoolId: student.schoolId,
      studentId: student.id,
    })
    return this.loadProfile(student, academicYearId)
  }

  private async requireStudent(id: string): Promise<Student> {
    const student = await this.sources.findStudent(id)
    if (!student) throw new Error("SIS_STUDENT_NOT_FOUND")
    if (student.schoolId !== this.schoolId) {
      throw new Error("SIS_SCHOOL_SCOPE_VIOLATION")
    }
    return student
  }

  private async loadProfile(student: Student, academicYearId?: string): Promise<StudentProfile> {
    const [guardians, enrollments] = await Promise.all([
      this.sources.listGuardians(student.id),
      this.sources.listEnrollments(student.id, academicYearId),
    ])

    return { student, guardians, enrollments }
  }
}
