import type { Guardian, StudentGuardian } from "./supporting-types"
import type { GuardianRepository } from "./repository"

export class GuardianService {
  constructor(
    private readonly schoolId: string,
    private readonly repository: GuardianRepository,
  ) {}

  async getById(id: string): Promise<Guardian | null> {
    return this.repository.findById(id)
  }

  async listForStudent(studentId: string): Promise<StudentGuardian[]> {
    return this.repository.listForStudent(studentId)
  }

  async attach(relationship: StudentGuardian): Promise<StudentGuardian> {
    if (relationship.studentId.length === 0 || relationship.guardianId.length === 0) {
      throw new Error("INVALID_GUARDIAN_RELATIONSHIP")
    }
    return this.repository.attachToStudent(relationship)
  }
}
