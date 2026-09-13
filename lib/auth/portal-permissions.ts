import type { AuthContext } from "@/lib/auth/authorization"
import { requireAuthenticatedContext } from "@/lib/auth/authorization"
import { hasPortalPermission, type PortalPermission, type PortalRole } from "@/lib/auth/portal-roles"

export function requirePortalPermission(context: AuthContext | null, permission: PortalPermission): AuthContext {
  const auth = requireAuthenticatedContext(context)
  if (!hasPortalPermission(auth.role as PortalRole, permission)) throw new Error("FORBIDDEN")
  return auth
}
