import type { Student } from "./types"
import type { StudentRepository } from "./repository"

export class StudentService {
  constructor(
    private readonly schoolId: string,
    private readonly repository: StudentRepository,
  ) {}

  async getById(id: string): Promise<Student | null> {
    return this.repository.findById(id)
  }

  async getByAdmissionNumber(admissionNumber: string): Promise<Student | null> {
    return this.repository.findByAdmissionNumber(admissionNumber)
  }

  async create(student: Student): Promise<Student> {
    if (student.schoolId !== this.schoolId) {
      throw new Error("SIS_SCHOOL_SCOPE_VIOLATION")
    }
    return this.repository.create(student)
  }
}
