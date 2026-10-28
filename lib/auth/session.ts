import { createHmac, pbkdf2Sync, scryptSync, timingSafeEqual } from "node:crypto"
import type { AuthContext } from "./authorization"
import { getDatabaseAuthContext } from "./database-session-provider"
import { ROLES, type Role } from "./roles"
import { getRuntimeDbClient } from "@/lib/db/runtime"

export interface SessionProvider {
  getContext(request: Request): Promise<AuthContext | null>
}

const COOKIE_NAME = "sammena_session"
const DEFAULT_SESSION_SECONDS = 8 * 60 * 60
const REMEMBERED_SESSION_SECONDS = 30 * 24 * 60 * 60

type SignedSession = {
  sub: string
  role: Role
  email: string
  schoolId?: string | null
  exp: number
}

type SupabaseSession = {
  access_token: string
  refresh_token?: string
  expires_at?: number
  session_expires_at?: number
}

let provider: SessionProvider | null = null

function getAdminConfig() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const passwordHash = process.env.ADMIN_PASSWORD_HASH?.trim()
  const secret = process.env.ADMIN_SESSION_SECRET?.trim()
  const schoolId = process.env.SAMMENA_SCHOOL_ID?.trim()
  const roleValue = process.env.ADMIN_ROLE?.trim().toUpperCase() || "SUPER_ADMIN"
  const role: Role = roleValue === "SCHOOL_ADMIN" ? "SCHOOL_ADMIN" : "SUPER_ADMIN"

  if (!email || !passwordHash || !secret || secret.length < 32) {
    throw new Error("AUTH_PROVIDER_NOT_CONFIGURED")
  }
  return { email, passwordHash, secret, schoolId, role }
}

function getSupabaseConfig() {
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

function base64Url(value: string) {
  return Buffer.from(value, "utf8").toString("base64url")
}

function sign(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url")
}

function parseCookie(request: Request) {
  const header = request.headers.get("cookie") ?? ""
  const entry = header.split(";").map(part => part.trim()).find(part => part.startsWith(`${COOKIE_NAME}=`))
  if (!entry) return null
  try {
    return decodeURIComponent(entry.slice(COOKIE_NAME.length + 1))
  } catch {
    return null
  }
}

function decodeSupabaseSession(raw: string): SupabaseSession | null {
  try {
    const parsed = JSON.parse(Buffer.from(raw, "base64url").toString("utf8")) as Partial<SupabaseSession>
    if (typeof parsed.access_token !== "string" || !parsed.access_token) return null
    return {
      access_token: parsed.access_token,
      ...(typeof parsed.refresh_token === "string" ? { refresh_token: parsed.refresh_token } : {}),
      ...(typeof parsed.expires_at === "number" ? { expires_at: parsed.expires_at } : {}),
      ...(typeof parsed.session_expires_at === "number" ? { session_expires_at: parsed.session_expires_at } : {}),
    }
  } catch {
    return null
  }
}

export function readSupabaseSession(request: Request): SupabaseSession | null {
  const raw = parseCookie(request)
  if (!raw || raw.includes(".")) return null
  return decodeSupabaseSession(raw)
}

function verifyPassword(password: string, encoded: string) {
  const parts = encoded.split("$")
  if (parts[0] === "pbkdf2-sha256") {
    const [, iterationsRaw, saltRaw, hashRaw] = parts
    const iterations = Number(iterationsRaw)
    if (!Number.isInteger(iterations) || iterations < 100000 || !saltRaw || !hashRaw) return false
    try {
      const salt = Buffer.from(saltRaw, "base64url")
      const expected = Buffer.from(hashRaw, "base64url")
      const actual = pbkdf2Sync(password, salt, iterations, expected.length, "sha256")
      return expected.length === actual.length && timingSafeEqual(expected, actual)
    } catch {
      return false
    }
  }

  const [scheme, nRaw, rRaw, pRaw, saltRaw, hashRaw] = parts
  if (scheme !== "scrypt" || !nRaw || !rRaw || !pRaw || !saltRaw || !hashRaw) return false
  const n = Number(nRaw), r = Number(rRaw), p = Number(pRaw)
  if (!Number.isInteger(n) || !Number.isInteger(r) || !Number.isInteger(p) || n <= 1 || r <= 0 || p <= 0) return false
  try {
    const salt = Buffer.from(saltRaw, "base64url")
    const expected = Buffer.from(hashRaw, "base64url")
    const actual = scryptSync(password, salt, expected.length, {
      N: n,
      r,
      p,
      maxmem: Math.max(32 * 1024 * 1024, n * r * 128 + 1024),
    })
    return expected.length === actual.length && timingSafeEqual(expected, actual)
  } catch {
    return false
  }
}

function signedCookie(payloadValue: Omit<SignedSession, "exp">, remember: boolean, secret: string) {
  const lifetime = remember ? REMEMBERED_SESSION_SECONDS : DEFAULT_SESSION_SECONDS
  const payload = base64Url(JSON.stringify({ ...payloadValue, exp: Math.floor(Date.now() / 1000) + lifetime }))
  const value = `${payload}.${sign(payload, secret)}`
  return `${COOKIE_NAME}=${encodeURIComponent(value)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${lifetime}`
}

export function authenticateAdmin(identifier: string, password: string) {
  const config = getAdminConfig()
  if (identifier.trim().toLowerCase() !== config.email || !verifyPassword(password, config.passwordHash)) {
    throw new Error("INVALID_CREDENTIALS")
  }
  return { email: config.email, role: config.role, schoolId: config.schoolId }
}

export function createAdminSessionCookie(options: { email: string; remember: boolean }) {
  const config = getAdminConfig()
  if (options.email.trim().toLowerCase() !== config.email) throw new Error("INVALID_CREDENTIALS")
  return signedCookie({
    sub: "admin",
    role: config.role,
    email: config.email,
    schoolId: config.schoolId ?? null,
  }, options.remember, config.secret)
}

export function createSchoolSessionCookie(options: { userId: string; email: string; role: Role; schoolId: string; remember: boolean }) {
  const config = getAdminConfig()
  return signedCookie({
    sub: options.userId,
    role: options.role,
    email: options.email.trim().toLowerCase(),
    schoolId: options.schoolId,
  }, options.remember, config.secret)
}

export function createClearedSessionCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`
}

async function getSignedSessionContext(raw: string): Promise<AuthContext | null> {
  const [payload, signature, extra] = raw.split(".")
  const secret = process.env.ADMIN_SESSION_SECRET?.trim()
  if (!payload || !signature || extra || !secret || secret.length < 32) return null

  const expected = Buffer.from(sign(payload, secret))
  const received = Buffer.from(signature)
  if (received.length !== expected.length || !timingSafeEqual(received, expected)) return null

  let parsed: SignedSession
  try {
    parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as SignedSession
  } catch {
    return null
  }
  if (!parsed.sub || !parsed.role || !parsed.email || !parsed.exp || parsed.exp <= Math.floor(Date.now() / 1000)) return null

  if (parsed.sub === "admin") {
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
    const roleValue = process.env.ADMIN_ROLE?.trim().toUpperCase() || "SUPER_ADMIN"
    const role = roleValue === "SCHOOL_ADMIN" ? "SCHOOL_ADMIN" : "SUPER_ADMIN"
    if (!email || parsed.email !== email || parsed.role !== role) return null
    const schoolId = parsed.schoolId ?? process.env.SAMMENA_SCHOOL_ID
    return { userId: "admin", role: parsed.role, ...(schoolId ? { schoolId } : {}) }
  }

  if (!parsed.schoolId) return null
  try {
    const db = getRuntimeDbClient()
    const result = await db.query<{ id: string; role: Role; school_id: string; is_active: boolean }>(
      "select id, role, school_id, is_active from app_users where id = $1 and school_id = $2 limit 1",
      [parsed.sub, parsed.schoolId],
    )
    const account = result.rows[0]
    if (!account || !account.is_active || account.role !== parsed.role) return null
    return { userId: account.id, role: account.role, schoolId: account.school_id }
  } catch {
    return null
  }
}

function getConfiguredProvider(): SessionProvider {
  return {
    async getContext(request: Request) {
      const raw = parseCookie(request)
      if (raw?.includes(".")) return getSignedSessionContext(raw)

      const config = getSupabaseConfig()
      if (!raw) return null
      const session = decodeSupabaseSession(raw)
      if (!session) return null
      const now = Math.floor(Date.now() / 1000)
      if (session.session_expires_at && session.session_expires_at <= now) return null

      const response = await fetch(`${config.url}/auth/v1/user`, {
        headers: { apikey: config.key, Authorization: `Bearer ${session.access_token}` },
        cache: "no-store",
      }).catch((): null => null)
      if (!response?.ok) return null

      const user = await response.json().catch((): null => null) as {
        id?: string
        app_metadata?: { role?: string; school_id?: string }
      } | null
      const role = user?.app_metadata?.role
      const schoolId = user?.app_metadata?.school_id
      if (!user?.id || !role || !ROLES.includes(role as Role)) return null
      return { userId: user.id, role: role as Role, ...(schoolId ? { schoolId } : {}) }
    },
  }
}

export function configureSessionProvider(nextProvider: SessionProvider | null) {
  provider = nextProvider
}

function hasSupabaseConfig() {
  return Boolean(
    (process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL)?.trim() &&
    (
      process.env.SUPABASE_PUBLISHABLE_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
      process.env.SUPABASE_ANON_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )?.trim(),
  )
}

export async function getAuthContext(request: Request): Promise<AuthContext | null> {
  if (provider) return provider.getContext(request)
  if (hasSupabaseConfig()) return getConfiguredProvider().getContext(request)
  if (!process.env.DATABASE_URL?.trim() || !parseCookie(request)) {
    if (process.env.NODE_ENV === "test") throw new Error("AUTH_PROVIDER_NOT_CONFIGURED")
    return null
  }

  try {
    return await getDatabaseAuthContext(request)
  } catch (error) {
    if (error instanceof Error && error.message === "DATABASE_CLIENT_NOT_CONFIGURED") {
      throw new Error("AUTH_PROVIDER_NOT_CONFIGURED")
    }
    throw error
  }
}
