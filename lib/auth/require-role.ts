import type { AuthContext } from "./authorization"
import type { Role } from "./roles"

export function requireRole(context: AuthContext | null, roles: readonly Role[]): AuthContext {
  if (!context) throw new Error("UNAUTHORIZED")
  if (!roles.includes(context.role)) throw new Error("FORBIDDEN")
  return context
}
