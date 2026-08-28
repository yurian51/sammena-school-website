import type { Student } from "@/lib/sis"
import type { StudentRow } from "../sis-types"

export function mapStudentRow(row: StudentRow): Student {
  return {
    id: row.id,
    schoolId: row.school_id,
    admissionNumber: row.admission_number,
    firstName: row.first_name,
    middleName: row.middle_name ?? undefined,
    lastName: row.last_name,
    dateOfBirth: row.date_of_birth ?? undefined,
    isActive: row.is_active,
  }
}
