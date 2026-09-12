export const admissionEntryLevels = [
  "Baby",
  "Pre-Unity",
  "Class I",
  "Class II",
  "Class III",
  "Class IV",
  "Class V",
  "Class VI",
  "Class VII",
] as const

export const guardianRelationships = [
  "Father",
  "Mother",
  "Aunt",
  "Uncle",
  "Brother",
  "Sister",
  "Grandfather",
  "Grandmother",
  "Guardian",
  "Other authorized caregiver",
] as const

export const guardianOccupations = [
  "Farmer",
  "Driver",
  "Teacher",
  "Business owner",
  "Trader",
  "Civil servant",
  "Health worker",
  "Engineer",
  "Technician",
  "Police officer",
  "Military personnel",
  "Construction worker",
  "Fisherman",
  "Pastor",
  "Imam",
  "Lawyer",
  "Accountant",
  "Banker",
  "Student",
  "Self-employed",
  "Unemployed",
  "Other",
] as const

export type AdmissionEntryLevel = (typeof admissionEntryLevels)[number]
export type GuardianRelationship = (typeof guardianRelationships)[number]
export type GuardianOccupation = (typeof guardianOccupations)[number]
