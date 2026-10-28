import type { UserRole } from "./context"

export type Permission =
  | "cms:read" | "cms:write" | "cms:publish"
  | "admissions:read" | "admissions:write" | "admissions:review"
  | "messages:write" | "settings:write"

const ADMIN_PERMISSIONS: readonly Permission[] = [
  "cms:read", "cms:write", "cms:publish",
  "admissions:read", "admissions:write", "admissions:review",
  "messages:write",
]

const rolePermissions: Record<UserRole, readonly Permission[]> = {
  SUPER_ADMIN: [...ADMIN_PERMISSIONS, "settings:write"],
  SCHOOL_ADMIN: ADMIN_PERMISSIONS,
  ADMIN: ADMIN_PERMISSIONS,
  EDITOR: ["cms:read", "cms:write"],
  VIEWER: ["cms:read", "admissions:read"],
  TEACHER: ["admissions:read"],
  PARENT: [],
  STUDENT: [],
}

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false
}

export function requirePermission(role: UserRole, permission: Permission): void {
  if (!hasPermission(role, permission)) throw new Error("FORBIDDEN")
}
