export type StudentStatus = "ACTIVE" | "TRANSFERRED" | "GRADUATED" | "INACTIVE"

export interface PortalStudent {
  id: string
  admissionNumber: string
  fullName: string
  gender: "MALE" | "FEMALE"
  className: string
  status: StudentStatus
  attendanceRate: number
  academicAverage: number
}

export interface PortalAssessment {
  id: string
  studentId: string
  studentName: string
  subject: string
  assessment: string
  score: number
  maxScore: number
  percentage: number
  term: string
  assessedAt: string
}

export interface PortalLibraryBook {
  id: string
  accessionNumber: string
  title: string
  author: string
  category: string
  quantity: number
  available: number
  issued: number
}
