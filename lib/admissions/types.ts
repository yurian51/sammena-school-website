export const APPLICATION_STATUSES = ["DRAFT", "SUBMITTED", "UNDER_REVIEW", "ASSESSMENT", "DECISION", "ACCEPTED", "WAITLISTED", "DECLINED", "ENROLLED"] as const
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number]

export type AdmissionApplication = {
  reference: string
  status: ApplicationStatus
  guardian: { fullName: string; phone: string; email?: string }
  learner: { fullName: string; dateOfBirth: string; entryLevel: string; previousSchool?: string }
  createdAt: string
  updatedAt: string
}

export type CreateApplicationInput = {
  guardian: AdmissionApplication["guardian"]
  learner: AdmissionApplication["learner"]
}
