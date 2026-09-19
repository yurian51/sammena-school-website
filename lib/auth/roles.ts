export const ROLES = ["SUPER_ADMIN", "SCHOOL_ADMIN", "EDITOR", "TEACHER", "PARENT", "STUDENT"] as const
export type Role = typeof ROLES[number]

export type Permission =
  | "cms:read"
  | "cms:write"
  | "cms:publish"
  | "admissions:read"
  | "admissions:write"
  | "admissions:review"
  | "sis:students:read"
  | "sis:timetable:read"
  | "sis:timetable:write"

const permissions: Record<Role, readonly Permission[]> = {
  SUPER_ADMIN: ["cms:read", "cms:write", "cms:publish", "admissions:read", "admissions:write", "admissions:review", "sis:students:read", "sis:timetable:read", "sis:timetable:write"],
  SCHOOL_ADMIN: ["cms:read", "cms:write", "cms:publish", "admissions:read", "admissions:write", "admissions:review", "sis:students:read", "sis:timetable:read", "sis:timetable:write"],
  EDITOR: ["cms:read", "cms:write", "cms:publish"],
  TEACHER: ["sis:timetable:read", "sis:timetable:write"],
  PARENT: [],
  STUDENT: [],
}

export function hasPermission(role: Role, permission: Permission) {
  return permissions[role]?.includes(permission) ?? false
}
