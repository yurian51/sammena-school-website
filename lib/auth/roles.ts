export const ROLES = ["SUPER_ADMIN", "SCHOOL_ADMIN", "ADMIN", "EDITOR", "VIEWER", "TEACHER", "PARENT", "STUDENT"] as const
export type Role = typeof ROLES[number]

export type Permission =
  | "dashboard.view"
  | "cms:read"
  | "cms:write"
  | "cms:publish"
  | "admissions:read"
  | "admissions:write"
  | "admissions:review"
  | "sis:students:read"
  | "sis:timetable:read"
  | "sis:timetable:write"
  | "users:read"
  | "users:write"
  | "settings:read"
  | "settings:write"
  | "audit:read"
  | "messages:read"
  | "messages:write"

const permissions: Record<Role, readonly Permission[]> = {
  SUPER_ADMIN: ["dashboard.view", "cms:read", "cms:write", "cms:publish", "admissions:read", "admissions:write", "admissions:review", "sis:students:read", "sis:timetable:read", "sis:timetable:write", "users:read", "users:write", "settings:read", "settings:write", "audit:read", "messages:read", "messages:write"],
  SCHOOL_ADMIN: ["dashboard.view", "cms:read", "cms:write", "cms:publish", "admissions:read", "admissions:write", "admissions:review", "sis:students:read", "sis:timetable:read", "sis:timetable:write", "users:read", "settings:read", "audit:read", "messages:read", "messages:write"],
  ADMIN: ["dashboard.view", "cms:read", "cms:write", "cms:publish", "admissions:read", "admissions:write", "admissions:review", "sis:students:read", "sis:timetable:read", "sis:timetable:write", "settings:read", "audit:read", "messages:read", "messages:write"],
  EDITOR: ["dashboard.view", "cms:read", "cms:write", "admissions:read"],
  VIEWER: ["dashboard.view", "cms:read", "admissions:read", "sis:students:read", "audit:read"],
  TEACHER: ["dashboard.view", "sis:timetable:read", "sis:timetable:write", "sis:students:read"],
  PARENT: [],
  STUDENT: [],
}

export function hasPermission(role: Role, permission: Permission) {
  return permissions[role]?.includes(permission) ?? false
}
