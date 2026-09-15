export const APPLICATION_STATUSES = ["DRAFT", "SUBMITTED", "UNDER_REVIEW", "ASSESSMENT", "DECISION", "ACCEPTED", "WAITLISTED", "DECLINED", "ENROLLED"] as const
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number]

export type AdmissionApplicationData = {
  guardianNationality?: string
  address?: string
  age?: string
  gender?: "Male" | "Female"
  nationality?: string
  homeRegion?: string
  homeDistrict?: string
  division?: string
  village?: string
  eyeColor?: string
  height?: string
  weight?: string
  religion?: string
  tribe?: string
  previousYear?: string
  medical?: string
  allergies?: string
  distance?: string
  preferredStart?: string
  siblings?: string
  photoReady?: boolean
  consentAccepted?: boolean
  consentAt?: string
}

export type AdmissionApplication = {
  reference: string
  status: ApplicationStatus
  academicYear: string
  studyType: "Day" | "Boarding"
  guardian: { fullName: string; phone: string; email?: string; relationship?: string }
  learner: { fullName: string; dateOfBirth: string; entryLevel: string; previousSchool?: string }
  applicationData?: AdmissionApplicationData
  submittedAt?: string
  createdAt: string
  updatedAt: string
}

export type CreateApplicationInput = {
  academicYear: string
  studyType: AdmissionApplication["studyType"]
  guardian: AdmissionApplication["guardian"]
  learner: AdmissionApplication["learner"]
  applicationData?: AdmissionApplicationData
}
