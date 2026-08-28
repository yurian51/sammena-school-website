export type EducationLevelCode = "PRE_SCHOOL" | "PRIMARY" | "SECONDARY"

export type EnrollmentStatus =
  | "PENDING"
  | "ACTIVE"
  | "PROMOTED"
  | "REPEATED"
  | "TRANSFERRED"
  | "WITHDRAWN"
  | "GRADUATED"
  | "CANCELLED"

export interface School {
  id: string
  name: string
  code: string
  createdAt: string
  updatedAt: string
}

export interface Campus {
  id: string
  schoolId: string
  name: string
  code: string
  isActive: boolean
}

export interface EducationLevel {
  id: string
  schoolId: string
  code: EducationLevelCode
  name: string
  isActive: boolean
}

export interface AcademicYear {
  id: string
  schoolId: string
  name: string
  startsOn: string
  endsOn: string
  isCurrent: boolean
}

export interface Term {
  id: string
  academicYearId: string
  name: string
  startsOn: string
  endsOn: string
  sequence: number
}

export interface Class {
  id: string
  schoolId: string
  academicYearId: string
  educationLevelId: string
  name: string
  code: string
}

export interface Stream {
  id: string
  classId: string
  name: string
  code: string
  capacity?: number
}

export interface Student {
  id: string
  schoolId: string
  admissionNumber: string
  firstName: string
  middleName?: string
  lastName: string
  dateOfBirth?: string
  isActive: boolean
}

export interface Enrollment {
  id: string
  schoolId: string
  studentId: string
  academicYearId: string
  classId: string
  streamId?: string
  status: EnrollmentStatus
  enrolledAt: string
}
