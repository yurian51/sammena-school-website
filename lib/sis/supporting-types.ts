export type GuardianRelationship =
  | "PARENT"
  | "GUARDIAN"
  | "SPONSOR"
  | "OTHER"

export interface Guardian {
  id: string
  schoolId: string
  firstName: string
  lastName: string
  phone: string
  email?: string
  isActive: boolean
}

export interface StudentGuardian {
  studentId: string
  guardianId: string
  relationship: GuardianRelationship
  isPrimary: boolean
}

export type StaffRole =
  | "TEACHER"
  | "SCHOOL_ADMIN"
  | "ADMISSIONS"
  | "FINANCE"
  | "EDITOR"
  | "SUPPORT"

export interface Staff {
  id: string
  schoolId: string
  firstName: string
  lastName: string
  employeeNumber: string
  isActive: boolean
}

export interface Subject {
  id: string
  schoolId: string
  code: string
  name: string
  educationLevelId: string
  isActive: boolean
}

export interface TeachingAssignment {
  id: string
  schoolId: string
  staffId: string
  subjectId: string
  classId: string
  streamId?: string
  academicYearId: string
}

export interface AttendanceRecord {
  id: string
  schoolId: string
  studentId: string
  academicYearId: string
  termId: string
  date: string
  status: "PRESENT" | "ABSENT" | "LATE" | "EXCUSED"
  note?: string
}

export interface Assessment {
  id: string
  schoolId: string
  academicYearId: string
  termId: string
  subjectId: string
  name: string
  maxScore: number
}

export interface Result {
  id: string
  schoolId: string
  assessmentId: string
  studentId: string
  score: number
  grade?: string
  publishedAt?: string
}

export interface FeeAccount {
  id: string
  schoolId: string
  studentId: string
  academicYearId: string
  balance: number
}

export interface Payment {
  id: string
  schoolId: string
  feeAccountId: string
  amount: number
  paidAt: string
  reference: string
  status: "PENDING" | "CONFIRMED" | "REVERSED"
}
