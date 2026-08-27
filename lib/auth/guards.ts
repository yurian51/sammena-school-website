import type { AuthContext } from "./authorization"
import type { Permission } from "./roles"
import { requirePermission } from "./authorization"

export function requireAuthenticated(context: AuthContext | null): AuthContext {
  if (!context) throw new Error("UNAUTHORIZED")
  return context
}

export function requireAuthorized(context: AuthContext | null, permission: Permission): AuthContext {
  return requirePermission(context, permission)
}
