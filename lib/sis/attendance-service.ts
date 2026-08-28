import type { AttendanceRecord } from "./supporting-types"
import type { AttendanceRepository } from "./attendance-repository"

export class AttendanceService {
  constructor(
    private readonly schoolId: string,
    private readonly repository: AttendanceRepository,
  ) {}

  async record(attendance: AttendanceRecord): Promise<AttendanceRecord> {
    if (attendance.schoolId !== this.schoolId) {
      throw new Error("SIS_SCHOOL_SCOPE_VIOLATION")
    }
    return this.repository.record(attendance)
  }

  listForStudent(studentId: string, academicYearId: string, termId?: string) {
    return this.repository.listByStudent(studentId, academicYearId, termId)
  }
}
