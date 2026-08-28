import type { Permission, Role } from "./roles"
import { hasPermission } from "./roles"

export interface AuthContext {
  userId: string
  role: Role
  schoolId?: string
}

export function requirePermission(context: AuthContext | null, permission: Permission): AuthContext {
  if (!context) throw new Error("UNAUTHORIZED")
  if (!hasPermission(context.role, permission)) throw new Error("FORBIDDEN")
  return context
}
