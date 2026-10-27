export const ROLES = ["SUPER_ADMIN", "SCHOOL_ADMIN", "ADMIN", "EDITOR", "VIEWER", "TEACHER", "PARENT", "STUDENT"] as const
export type Role = typeof ROLES[number]

export type Permission =
  | "dashboard.view"
  | "cms:read" | "cms:write" | "cms:publish"
  | "admissions:read" | "admissions:write" | "admissions:review"
  | "sis:students:read" | "sis:students:write"
  | "sis:timetable:read" | "sis:timetable:write"
  | "inbox:read" | "inbox:write"
  | "attendance:read" | "attendance:write"
  | "library:read" | "library:write"
  | "results:read" | "results:write"
  | "finance:read" | "finance:write"
  | "communication:read" | "communication:write"
  | "messages:read" | "messages:write" | "audit:read" | "settings:read" | "settings:write"
  | "teaching:assign"

const ADMIN_ALL: readonly Permission[] = [
  "dashboard.view", "cms:read", "cms:write", "cms:publish",
  "admissions:read", "admissions:write", "admissions:review",
  "sis:students:read", "sis:students:write", "sis:timetable:read", "sis:timetable:write",
  "inbox:read", "inbox:write", "attendance:read", "attendance:write",
  "library:read", "library:write", "results:read", "results:write",
  "finance:read", "finance:write", "communication:read", "communication:write", "messages:read", "messages:write", "audit:read", "settings:read", "teaching:assign",
]

const permissions: Record<Role, readonly Permission[]> = {
  SUPER_ADMIN: [...ADMIN_ALL, "settings:write"],
  SCHOOL_ADMIN: ADMIN_ALL,
  ADMIN: ADMIN_ALL,
  EDITOR: ["dashboard.view", "cms:read", "cms:write", "admissions:read", "inbox:read", "inbox:write"],
  VIEWER: ["dashboard.view", "cms:read", "admissions:read", "sis:students:read", "sis:timetable:read", "inbox:read", "attendance:read", "library:read", "results:read", "finance:read", "communication:read", "messages:read", "audit:read", "settings:read"],
  // Teacher scope is further restricted by lib/auth/teacher-scope.ts.
  TEACHER: ["sis:timetable:read", "sis:timetable:write", "attendance:read", "attendance:write", "results:read", "results:write"],
  PARENT: [],
  STUDENT: [],
}

export function hasPermission(role: Role, permission: Permission) {
  return permissions[role]?.includes(permission) ?? false
}
