import type { AuthContext } from "./authorization"
import { getDatabaseAuthContext } from "./database-session-provider"

export interface SessionProvider {
  getContext(request: Request): Promise<AuthContext | null>
}

let provider: SessionProvider | null = null

export function configureSessionProvider(nextProvider: SessionProvider | null) {
  provider = nextProvider
}

export async function getAuthContext(request: Request): Promise<AuthContext | null> {
  if (provider) return provider.getContext(request)
  return getDatabaseAuthContext(request)
}
