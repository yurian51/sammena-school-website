import type { UserRole } from "./context"

export type Permission = "cms:read" | "cms:write" | "cms:publish" | "admissions:read" | "admissions:write" | "admissions:review"

const rolePermissions: Record<UserRole, readonly Permission[]> = {
  SUPER_ADMIN: ["cms:read", "cms:write", "cms:publish", "admissions:read", "admissions:write", "admissions:review"],
  SCHOOL_ADMIN: ["cms:read", "cms:write", "cms:publish", "admissions:read", "admissions:write", "admissions:review"],
  EDITOR: ["cms:read", "cms:write", "cms:publish"],
  TEACHER: ["admissions:read"],
  PARENT: [],
  STUDENT: [],
}

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return rolePermissions[role].includes(permission)
}

export function requirePermission(role: UserRole, permission: Permission): void {
  if (!hasPermission(role, permission)) throw new Error("FORBIDDEN")
}
