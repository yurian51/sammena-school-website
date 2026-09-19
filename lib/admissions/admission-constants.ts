export const ADMISSION_STATUSES = ["DRAFT", "SUBMITTED", "UNDER_REVIEW", "MORE_INFORMATION", "ACCEPTED", "REJECTED"] as const
export const ENTRY_LEVELS = ["Pre-Primary", "Class I", "Class II", "Class III", "Class IV", "Class V", "Class VI", "Class VII"] as const

// Boarding availability is not currently verified in the institutional content register.
// Keep admissions truthful until the school provides an approved boarding offering.
export const STUDY_TYPES = ["Day"] as const

export const NOTIFICATION_EVENTS = ["SUBMITTED", "MORE_INFORMATION", "ACCEPTED", "REJECTED"] as const
export const DOCUMENT_STATUSES = ["MISSING", "PENDING_REVIEW", "VERIFIED", "REJECTED"] as const
