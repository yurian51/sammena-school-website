export const APPLICATION_STATUSES = ["DRAFT", "SUBMITTED", "UNDER_REVIEW", "ASSESSMENT", "DECISION", "ACCEPTED", "WAITLISTED", "DECLINED", "ENROLLED"] as const
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number]

export type AdmissionApplication = {
  reference: string
  status: ApplicationStatus
  academicYear: string
  studyType: "Day" | "Boarding"
  guardian: { fullName: string; phone: string; email?: string; relationship?: string }
  learner: { fullName: string; dateOfBirth: string; entryLevel: string; previousSchool?: string }
  submittedAt?: string
  createdAt: string
  updatedAt: string
}

export type CreateApplicationInput = {
  academicYear: string
  studyType: AdmissionApplication["studyType"]
  guardian: AdmissionApplication["guardian"]
  learner: AdmissionApplication["learner"]
}
