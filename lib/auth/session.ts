import type { AuthContext } from "./authorization"

export interface SessionProvider {
  getContext(request: Request): Promise<AuthContext | null>
}

const COOKIE_NAME = "sammena_session"
const DEFAULT_SESSION_SECONDS = 8 * 60 * 60
const REMEMBERED_SESSION_SECONDS = 30 * 24 * 60 * 60

type SupabaseSession = {
  access_token: string
  refresh_token: string
  expires_in?: number
  expires_at?: number
  token_type?: string
  remember?: boolean
  session_expires_at?: number
}

let provider: SessionProvider | null = null

function getConfig() {
  const url = (process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL)?.trim().replace(/\/$/, "")
  const key = (
    process.env.SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )?.trim()

  if (!url || !key) throw new Error("AUTH_PROVIDER_NOT_CONFIGURED")
  return { url, key }
}

function getSession(request: Request): SupabaseSession | null {
  const header = request.headers.get("cookie") ?? ""
  const entry = header.split(";").map(part => part.trim()).find(part => part.startsWith(`${COOKIE_NAME}=`))
  if (!entry) return null
  try {
    const parsed = JSON.parse(Buffer.from(decodeURIComponent(entry.slice(COOKIE_NAME.length + 1)), "base64url").toString("utf8")) as SupabaseSession
    if (!parsed.access_token || !parsed.refresh_token || !parsed.session_expires_at) return null
    if (parsed.session_expires_at <= Math.floor(Date.now() / 1000)) return null
    return parsed
  } catch {
    return null
  }
}

export function createAdminSessionCookie(session: SupabaseSession, remember: boolean) {
  const lifetime = remember ? REMEMBERED_SESSION_SECONDS : DEFAULT_SESSION_SECONDS
  const sessionExpiresAt = Math.floor(Date.now() / 1000) + lifetime
  const payload = Buffer.from(JSON.stringify({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    expires_in: session.expires_in,
    expires_at: session.expires_at ?? Math.floor(Date.now() / 1000) + (session.expires_in ?? 3600),
    token_type: session.token_type ?? "bearer",
    remember,
    session_expires_at: sessionExpiresAt,
  })).toString("base64url")
  return `${COOKIE_NAME}=${encodeURIComponent(payload)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${lifetime}`
}

export function createClearedSessionCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`
}

export function readSupabaseSession(request: Request) {
  return getSession(request)
}

function getConfiguredProvider(): SessionProvider {
  return {
    async getContext(request: Request) {
      const config = getConfig()
      const session = getSession(request)
      if (!session) return null

      const response = await fetch(`${config.url}/auth/v1/user`, {
        method: "GET",
        headers: { apikey: config.key, Authorization: `Bearer ${session.access_token}` },
        cache: "no-store",
      }).catch(() => null)

      if (!response?.ok) return null
      const user = await response.json().catch(() => null) as {
        id?: string
        app_metadata?: { role?: string; school_id?: string }
      } | null
      const role = user?.app_metadata?.role
      if (!user?.id || (role !== "SUPER_ADMIN" && role !== "SCHOOL_ADMIN")) return null

      const schoolId = user.app_metadata?.school_id ?? process.env.SAMMENA_SCHOOL_ID?.trim()
      return {
        userId: user.id,
        role,
        ...(schoolId ? { schoolId } : {}),
      }
    },
  }
}

export function configureSessionProvider(nextProvider: SessionProvider | null) {
  provider = nextProvider
}

export async function getAuthContext(request: Request): Promise<AuthContext | null> {
  return (provider ?? getConfiguredProvider()).getContext(request)
}
