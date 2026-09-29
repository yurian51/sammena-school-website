export const AUDIT_ACTIONS = {
  APPLICATION_CREATED: "admissions.application.created",
  APPLICATION_STATUS_CHANGED: "admissions.application.status_changed",
  CALENDAR_CREATED: "calendar.event.created",
  CALENDAR_PUBLISHED: "calendar.event.published",
  CMS_CREATED: "cms.content.created",
  CMS_PUBLISHED: "cms.content.published",
} as const

export type AuditAction = (typeof AUDIT_ACTIONS)[keyof typeof AUDIT_ACTIONS]
