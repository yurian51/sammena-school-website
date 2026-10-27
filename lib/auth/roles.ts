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
  | "sis:students:write"
  | "sis:timetable:read"
  | "sis:timetable:write"
  | "inbox:read"
  | "inbox:write"
  | "attendance:read"
  | "attendance:write"
  | "library:read"
  | "library:write"
  | "results:read"
  | "results:write"
  | "finance:read"
  | "finance:write"
  | "communication:read"
  | "communication:write"
  | "teaching:assign"

const ADMIN_ALL: readonly Permission[] = [
  "cms:read", "cms:write", "cms:publish",
  "admissions:read", "admissions:write", "admissions:review",
  "sis:students:read", "sis:students:write", "sis:timetable:read", "sis:timetable:write",
  "inbox:read", "inbox:write", "attendance:read", "attendance:write", "library:read", "library:write",
  "results:read", "results:write", "finance:read", "finance:write", "communication:read", "communication:write", "teaching:assign",
]

const permissions: Record<Role, readonly Permission[]> = {
 feat/sims-student-enrollment-core
  SUPER_ADMIN: ["cms:read", "cms:write", "cms:publish", "admissions:read", "admissions:write", "admissions:review", "sis:students:read", "sis:students:write", "sis:timetable:read", "sis:timetable:write"],
  SCHOOL_ADMIN: ["cms:read", "cms:write", "cms:publish", "admissions:read", "admissions:write", "admissions:review", "sis:students:read", "sis:students:write", "sis:timetable:read", "sis:timetable:write"],

  SUPER_ADMIN: ADMIN_ALL,
  SCHOOL_ADMIN: ADMIN_ALL,
 main
  EDITOR: ["cms:read", "cms:write"],
  // Teachers only act on classes they are assigned to (enforced in lib/auth/teacher-scope.ts).
  TEACHER: ["sis:timetable:read", "sis:timetable:write", "attendance:read", "attendance:write", "results:read", "results:write"],
  PARENT: [],
  STUDENT: [],
}

export function hasPermission(role: Role, permission: Permission) {
  return permissions[role]?.includes(permission) ?? false
}
