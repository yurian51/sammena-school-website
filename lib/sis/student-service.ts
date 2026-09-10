import type { Student } from "./types"
import type { StudentRepository } from "./repository"

export type StudentStatus = "ACTIVE" | "INACTIVE" | "ARCHIVED"

export interface UpdateStudentInput {
  firstName?: string
  middleName?: string
  lastName?: string
  dateOfBirth?: string
  isActive?: boolean
}

export class StudentService {
  constructor(
    private readonly schoolId: string,
    private readonly repository: StudentRepository,
  ) {
    if (repository.schoolId !== schoolId) {
      throw new Error("SIS_REPOSITORY_SCOPE_MISMATCH")
    }
  }

  async getById(id: string): Promise<Student | null> {
    const student = await this.repository.findById(id)
    return student && this.inSchool(student) ? student : null
  }

  async getByAdmissionNumber(admissionNumber: string): Promise<Student | null> {
    const student = await this.repository.findByAdmissionNumber(admissionNumber)
    return student && this.inSchool(student) ? student : null
  }

  async create(student: Student): Promise<Student> {
    this.assertSchoolScope(student.schoolId)

    const existing = await this.repository.findByAdmissionNumber(student.admissionNumber)
    if (existing && this.inSchool(existing)) {
      throw new Error("SIS_ADMISSION_NUMBER_ALREADY_EXISTS")
    }

    return this.repository.create(student)
  }

  async update(id: string, input: UpdateStudentInput): Promise<Student> {
    const student = await this.requireStudent(id)
    this.assertSchoolScope(student.schoolId)

    const update = this.repository.update
    if (!update) {
      throw new Error("SIS_STUDENT_UPDATE_NOT_SUPPORTED")
    }

    return update(id, input)
  }

  private async requireStudent(id: string): Promise<Student> {
    const student = await this.repository.findById(id)
    if (!student) {
      throw new Error("SIS_STUDENT_NOT_FOUND")
    }
    this.assertSchoolScope(student.schoolId)
    return student
  }

  private inSchool(student: Student): boolean {
    return student.schoolId === this.schoolId
  }

  private assertSchoolScope(schoolId: string): void {
    if (schoolId !== this.schoolId) {
      throw new Error("SIS_SCHOOL_SCOPE_VIOLATION")
    }
  }
}
