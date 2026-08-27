export const ROLES = ["SUPER_ADMIN", "SCHOOL_ADMIN", "EDITOR", "TEACHER", "PARENT", "STUDENT"] as const
export type Role = typeof ROLES[number]

export type Permission =
  | "cms:read"
  | "cms:write"
  | "cms:publish"
  | "admissions:read"
  | "admissions:write"
  | "admissions:review"

const permissions: Record<Role, readonly Permission[]> = {
  SUPER_ADMIN: ["cms:read", "cms:write", "cms:publish", "admissions:read", "admissions:write", "admissions:review"],
  SCHOOL_ADMIN: ["cms:read", "cms:write", "cms:publish", "admissions:read", "admissions:write", "admissions:review"],
  EDITOR: ["cms:read", "cms:write", "cms:publish"],
  TEACHER: ["cms:read"],
  PARENT: ["cms:read"],
  STUDENT: ["cms:read"],
}

export function hasPermission(role: Role, permission: Permission) {
  return permissions[role].includes(permission)
}
