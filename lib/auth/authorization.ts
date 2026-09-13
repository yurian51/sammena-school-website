import type { Permission, Role } from "./roles"
import { hasPermission } from "./roles"

export interface AuthContext {
  userId: string
  role: Role
  schoolId?: string
}

export function requireAuthenticatedContext(context: AuthContext | null): AuthContext {
  if (!context) throw new Error("UNAUTHORIZED")
  return context
}

export function requirePermission(context: AuthContext | null, permission: Permission): AuthContext {
  const auth = requireAuthenticatedContext(context)
  if (!hasPermission(auth.role, permission)) throw new Error("FORBIDDEN")
  return auth
}
