export const EVENT_CATEGORIES = [
  "ACADEMIC",
  "EXAMINATION",
  "ACTIVITY",
  "MEETING",
  "ADMISSIONS",
  "HOLIDAY",
  "CEREMONY",
  "OTHER",
] as const

export type EventCategory = (typeof EVENT_CATEGORIES)[number]

export const EVENT_AUDIENCES = ["PUBLIC", "PARENTS", "STUDENTS", "TEACHERS", "STAFF"] as const
export type EventAudience = (typeof EVENT_AUDIENCES)[number]

export const EVENT_STATUSES = ["DRAFT", "REVIEW", "APPROVED", "PUBLISHED", "ARCHIVED"] as const
export type EventStatus = (typeof EVENT_STATUSES)[number]

export interface SchoolEvent {
  id: string
  schoolId: string
  title: string
  slug: string
  description: string
  category: EventCategory
  audience: EventAudience
  startsAt: string
  endsAt?: string
  allDay: boolean
  location?: string
  status: EventStatus
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

export interface CreateSchoolEventInput {
  title: string
  slug: string
  description?: string
  category: EventCategory
  audience?: EventAudience
  startsAt: string
  endsAt?: string
  allDay?: boolean
  location?: string
}
