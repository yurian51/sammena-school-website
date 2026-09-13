import type { AuthContext } from "./authorization"

export interface SessionProvider {
  getContext(request: Request): Promise<AuthContext | null>
}

let provider: SessionProvider | null = null

export function configureSessionProvider(nextProvider: SessionProvider) {
  provider = nextProvider
}

export async function getAuthContext(request: Request): Promise<AuthContext | null> {
  if (!provider) throw new Error("AUTH_PROVIDER_NOT_CONFIGURED")
  return provider.getContext(request)
}
