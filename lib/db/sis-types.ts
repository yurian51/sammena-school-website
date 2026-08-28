export interface StudentRow {
  id: string
  school_id: string
  admission_number: string
  first_name: string
  middle_name: string | null
  last_name: string
  date_of_birth: string | null
  is_active: boolean
}

export interface EnrollmentRow {
  id: string
  school_id: string
  student_id: string
  academic_year_id: string
  class_id: string
  stream_id: string | null
  status: string
  enrolled_at: string
}
