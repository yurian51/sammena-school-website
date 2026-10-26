export const AUDIT_ACTIONS = {
  APPLICATION_CREATED: "admissions.application.created",
  APPLICATION_STATUS_CHANGED: "admissions.application.status_changed",
  CALENDAR_CREATED: "calendar.event.created",
  CALENDAR_PUBLISHED: "calendar.event.published",
  CMS_UPDATED: "cms.content.updated",
  CMS_CREATED: "cms.content.created",
  CMS_PUBLISHED: "cms.content.published",
  CONTACT_STATUS_CHANGED: "contact.message.status_changed",
  ATTENDANCE_RECORDED: "attendance.recorded",
  LIBRARY_BOOK_SAVED: "library.book.saved",
  LIBRARY_BOOK_ISSUED: "library.book.issued",
  LIBRARY_BOOK_RETURNED: "library.book.returned",
} as const

export type AuditAction = (typeof AUDIT_ACTIONS)[keyof typeof AUDIT_ACTIONS]
