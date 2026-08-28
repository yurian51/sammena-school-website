import type { AttendanceRecord } from "./supporting-types"

export interface AttendanceRepository {
  readonly schoolId: string
  findById(id: string): Promise<AttendanceRecord | null>
  listByStudent(studentId: string, academicYearId: string, termId?: string): Promise<AttendanceRecord[]>
  record(attendance: AttendanceRecord): Promise<AttendanceRecord>
}
