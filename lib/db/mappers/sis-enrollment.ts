import type { Enrollment, Guardian, GuardianRelationship, StudentGuardian } from "@/lib/sis"
import type { EnrollmentRow, GuardianRow, StudentGuardianRow } from "../sis-rows"

export function mapEnrollmentRow(row: EnrollmentRow): Enrollment {
  return {
    id: row.id,
    schoolId: row.school_id,
    studentId: row.student_id,
    academicYearId: row.academic_year_id,
    classId: row.class_id,
    streamId: row.stream_id ?? undefined,
    status: row.status,
    enrolledAt: row.enrolled_at,
  }
}

export function mapGuardianRow(row: GuardianRow): Guardian {
  return {
    id: row.id,
    schoolId: row.school_id,
    firstName: row.first_name,
    lastName: row.last_name,
    phone: row.phone,
    email: row.email ?? undefined,
    isActive: row.is_active,
  }
}

export function mapStudentGuardianRow(row: StudentGuardianRow): StudentGuardian {
  return {
    studentId: row.student_id,
    guardianId: row.guardian_id,
    relationship: row.relationship as GuardianRelationship,
    isPrimary: row.is_primary,
  }
}
