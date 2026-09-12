import type { AuthContext } from "@/lib/auth/authorization"
import { requirePermission } from "@/lib/auth/authorization"
import { hasPortalPermission, type PortalPermission, type PortalRole } from "@/lib/auth/portal-roles"

export function requirePortalPermission(context: AuthContext | null, permission: PortalPermission): AuthContext {
  const auth = requirePermission(context, "cms:read")
  if (!hasPortalPermission(auth.role as PortalRole, permission)) throw new Error("FORBIDDEN")
  return auth
}
