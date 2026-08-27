export const AUDIT_ACTIONS = {
  APPLICATION_CREATED: "admissions.application.created",
  APPLICATION_STATUS_CHANGED: "admissions.application.status_changed",
  CMS_PUBLISHED: "cms.content.published",
} as const

export type AuditAction = (typeof AUDIT_ACTIONS)[keyof typeof AUDIT_ACTIONS]
