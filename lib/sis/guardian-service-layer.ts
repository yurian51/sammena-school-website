import type { Guardian, StudentGuardian } from "./supporting-types"
import type { GuardianRepository } from "./repository"

export class GuardianService {
  constructor(
    private readonly schoolId: string,
    private readonly repository: GuardianRepository,
  ) {
    if (repository.schoolId !== schoolId) {
      throw new Error("SIS_REPOSITORY_SCOPE_MISMATCH")
    }
  }

  async getById(id: string): Promise<Guardian | null> {
    const guardian = await this.repository.findById(id)
    if (!guardian) return null
    this.assertSchoolScope(guardian.schoolId)
    return guardian
  }

  async listForStudent(studentId: string): Promise<StudentGuardian[]> {
    return this.repository.listForStudent(studentId)
  }

  async attach(relationship: StudentGuardian): Promise<StudentGuardian> {
    if (relationship.studentId.trim().length === 0 || relationship.guardianId.trim().length === 0) {
      throw new Error("INVALID_GUARDIAN_RELATIONSHIP")
    }
    return this.repository.attachToStudent(relationship)
  }

  private assertSchoolScope(schoolId: string): void {
    if (schoolId !== this.schoolId) {
      throw new Error("SIS_SCHOOL_SCOPE_VIOLATION")
    }
  }
}
