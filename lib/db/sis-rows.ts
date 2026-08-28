import type { EnrollmentStatus } from "@/lib/sis"

export interface EnrollmentRow {
  id: string
  school_id: string
  student_id: string
  academic_year_id: string
  class_id: string
  stream_id: string | null
  status: EnrollmentStatus
  enrolled_at: string
}

export interface GuardianRow {
  id: string
  school_id: string
  first_name: string
  last_name: string
  phone: string
  email: string | null
  is_active: boolean
}

export interface StudentGuardianRow {
  student_id: string
  guardian_id: string
  relationship: string
  is_primary: boolean
}
