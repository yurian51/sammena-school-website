import { getAuthContext } from "../auth/session"
import { requirePermission, type AuthContext } from "../auth/authorization"
import type { Permission } from "../auth/roles"

export async function authorizeRequest(request: Request, permission: Permission): Promise<AuthContext> {
  const context = await getAuthContext(request)
  return requirePermission(context, permission)
}
