import type { Enrollment, Student } from "./types"
import type { Guardian, StudentGuardian } from "./supporting-types"
import type {
  EnrollmentRepository,
  GuardianRepository,
  StudentRepository,
} from "./repository"
import { assertEnrollmentTransition } from "./enrollment-service"

export interface SisServiceContext {
  readonly schoolId: string
}

export class SisService {
  constructor(
    private readonly context: SisServiceContext,
    private readonly students: StudentRepository,
    private readonly guardians: GuardianRepository,
    private readonly enrollments: EnrollmentRepository,
  ) {}

  private assertScope(entitySchoolId: string): void {
    if (entitySchoolId !== this.context.schoolId) {
      throw new Error("SIS_SCHOOL_SCOPE_VIOLATION")
    }
  }

  async getStudent(id: string): Promise<Student | null> {
    return this.students.findById(id)
  }

  async createStudent(student: Student): Promise<Student> {
    this.assertScope(student.schoolId)
    return this.students.create(student)
  }

  async listStudentEnrollments(studentId: string, academicYearId?: string): Promise<Enrollment[]> {
    return this.enrollments.listForStudent(studentId, academicYearId)
  }

  async createEnrollment(enrollment: Enrollment): Promise<Enrollment> {
    this.assertScope(enrollment.schoolId)
    return this.enrollments.create(enrollment)
  }

  async changeEnrollmentStatus(
    enrollment: Enrollment,
    nextStatus: Enrollment["status"],
  ): Promise<Enrollment> {
    this.assertScope(enrollment.schoolId)
    assertEnrollmentTransition(enrollment.status, nextStatus)
    return { ...enrollment, status: nextStatus }
  }

  async listStudentGuardians(studentId: string): Promise<StudentGuardian[]> {
    return this.guardians.listForStudent(studentId)
  }

  async attachGuardian(relationship: StudentGuardian): Promise<StudentGuardian> {
    return this.guardians.attachToStudent(relationship)
  }
}
