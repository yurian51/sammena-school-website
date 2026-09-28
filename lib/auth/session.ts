import { createHmac, scryptSync, timingSafeEqual } from "node:crypto"
import type { AuthContext } from "./authorization"

export interface SessionProvider {
  getContext(request: Request): Promise<AuthContext | null>
}

const COOKIE_NAME = "sammena_session"
const DEFAULT_SESSION_SECONDS = 8 * 60 * 60
const REMEMBERED_SESSION_SECONDS = 30 * 24 * 60 * 60

let provider: SessionProvider | null = null

function base64Url(value: Buffer | string) {
  return Buffer.from(value).toString("base64url")
}

function sign(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url")
}

function getConfig() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const passwordHash = process.env.ADMIN_PASSWORD_HASH?.trim()
  const secret = process.env.ADMIN_SESSION_SECRET?.trim()
  const schoolId = process.env.SAMMENA_SCHOOL_ID?.trim()

  if (!email || !passwordHash || !secret) {
    throw new Error("AUTH_PROVIDER_NOT_CONFIGURED")
  }

  return { email, passwordHash, secret, schoolId }
}

function parseCookie(request: Request) {
  const header = request.headers.get("cookie") ?? ""
  const entry = header.split(";").map(part => part.trim()).find(part => part.startsWith(`${COOKIE_NAME}=`))
  return entry ? decodeURIComponent(entry.slice(COOKIE_NAME.length + 1)) : null
}

function verifyPassword(password: string, encoded: string) {
  const [scheme, nRaw, rRaw, pRaw, saltRaw, hashRaw] = encoded.split("$")
  if (scheme !== "scrypt" || !nRaw || !rRaw || !pRaw || !saltRaw || !hashRaw) return false

  const n = Number(nRaw)
  const r = Number(rRaw)
  const p = Number(pRaw)
  if (!Number.isInteger(n) || !Number.isInteger(r) || !Number.isInteger(p) || n <= 1 || r <= 0 || p <= 0) return false

  try {
    const salt = Buffer.from(saltRaw, "base64url")
    const expected = Buffer.from(hashRaw, "base64url")
    const actual = scryptSync(password, salt, expected.length, { N: n, r, p, maxmem: Math.max(32 * 1024 * 1024, n * r * 128 + 1024) })
    return expected.length === actual.length && timingSafeEqual(expected, actual)
  } catch {
    return false
  }
}

export function createAdminSessionCookie(options: { email: string; remember: boolean }) {
  const config = getConfig()
  if (options.email.trim().toLowerCase() !== config.email) throw new Error("INVALID_CREDENTIALS")

  const expiresAt = Math.floor(Date.now() / 1000) + (options.remember ? REMEMBERED_SESSION_SECONDS : DEFAULT_SESSION_SECONDS)
  const payload = base64Url(JSON.stringify({ sub: "admin", role: "SUPER_ADMIN", email: config.email, schoolId: config.schoolId ?? null, exp: expiresAt }))
  const value = `${payload}.${sign(payload, config.secret)}`
  const maxAge = options.remember ? REMEMBERED_SESSION_SECONDS : DEFAULT_SESSION_SECONDS
  return `${COOKIE_NAME}=${encodeURIComponent(value)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`
}

function getConfiguredProvider(): SessionProvider {
  return {
    async getContext(request: Request) {
      const config = getConfig()
      const raw = parseCookie(request)
      if (!raw) return null

      const [payload, signature] = raw.split(".")
      if (!payload || !signature || !timingSafeEqual(Buffer.from(signature), Buffer.from(sign(payload, config.secret)))) return null

      try {
        const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
          sub?: string
          role?: string
          email?: string
          schoolId?: string | null
          exp?: number
        }

        if (parsed.sub !== "admin" || parsed.role !== "SUPER_ADMIN" || parsed.email !== config.email || !parsed.exp || parsed.exp <= Math.floor(Date.now() / 1000)) return null

        return {
          userId: "admin",
          role: "SUPER_ADMIN",
          ...(parsed.schoolId ? { schoolId: parsed.schoolId } : {}),
        }
      } catch {
        return null
      }
    },
  }
}

export function configureSessionProvider(nextProvider: SessionProvider | null) {
  provider = nextProvider
}

export async function getAuthContext(request: Request): Promise<AuthContext | null> {
  const activeProvider = provider ?? getConfiguredProvider()
  return activeProvider.getContext(request)
}

export function authenticateAdmin(identifier: string, password: string) {
  const config = getConfig()
  const normalizedIdentifier = identifier.trim().toLowerCase()

  if (normalizedIdentifier !== config.email || !verifyPassword(password, config.passwordHash)) {
    throw new Error("INVALID_CREDENTIALS")
  }

  return { email: config.email }
}
