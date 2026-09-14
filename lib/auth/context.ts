import type { AuthContext as AuthorizationContext } from "./authorization"
import { requireAuthenticatedContext } from "./authorization"

export type UserRole = AuthorizationContext["role"]
export type AuthContext = AuthorizationContext

export function requireAuth(context: AuthContext | null): AuthContext {
  return requireAuthenticatedContext(context)
}
