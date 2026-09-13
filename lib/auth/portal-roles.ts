export const PORTAL_ROLES = ["SUPER_ADMIN", "SCHOOL_ADMIN", "TEACHER", "PARENT", "STUDENT"] as const
export type PortalRole = typeof PORTAL_ROLES[number]

export type PortalPermission =
  | "portal:read"
  | "students:read"
  | "students:write"
  | "attendance:read"
  | "attendance:write"
  | "assessments:read"
  | "assessments:write"
  | "library:read"
  | "library:write"
  | "quality:read"
  | "quality:write"

const permissions: Record<PortalRole, readonly PortalPermission[]> = {
  SUPER_ADMIN: ["portal:read", "students:read", "students:write", "attendance:read", "attendance:write", "assessments:read", "assessments:write", "library:read", "library:write", "quality:read", "quality:write"],
  SCHOOL_ADMIN: ["portal:read", "students:read", "students:write", "attendance:read", "attendance:write", "assessments:read", "assessments:write", "library:read", "library:write", "quality:read", "quality:write"],
  TEACHER: ["portal:read", "students:read", "attendance:read", "attendance:write", "assessments:read", "assessments:write", "library:read", "quality:read"],
  PARENT: ["portal:read", "students:read", "attendance:read", "assessments:read", "library:read"],
  STUDENT: ["portal:read", "students:read", "attendance:read", "assessments:read", "library:read"],
}

export function hasPortalPermission(role: PortalRole, permission: PortalPermission) {
  return permissions[role]?.includes(permission) ?? false
}
