import { createHash, randomUUID } from "node:crypto"
import { getDbClient } from "@/lib/db/client"
import type { AuthContext } from "./authorization"
import { verifyPassword } from "./password"

export const SESSION_COOKIE = "sammena_session"
const SESSION_TTL_SECONDS = 8 * 60 * 60
const REMEMBERED_SESSION_TTL_SECONDS = 30 * 24 * 60 * 60

function parseCookies(header: string | null) {
  const cookies = new Map<string, string>()
  for (const part of (header ?? "").split(";")) {
    const index = part.indexOf("=")
    if (index <= 0) continue
    cookies.set(part.slice(0, index).trim(), decodeURIComponent(part.slice(index + 1).trim()))
  }
  return cookies
}

function normalizeIdentifier(value: string) {
  return value.trim().toLowerCase()
}

function hashIp(ip: string | null) {
  if (!ip) return null
  return createHash("sha256").update(ip).digest("hex")
}

export async function authenticateUser(
  identifier: string,
  password: string,
  audience: string,
  remember: boolean,
  request: Request,
) {
  const normalized = normalizeIdentifier(identifier)
  const db = getDbClient()
  const result = await db.query<{
    id: string
    school_id: string
    password_hash: string
    role: AuthContext["role"]
    is_active: boolean
  }>(
    `select id::text, school_id::text, password_hash, role, is_active
     from app_users
     where lower(identifier) = $1 and is_active = true
     limit 1`,
    [normalized],
  )
  const user = result.rows[0]
  if (!user || !verifyPassword(password, user.password_hash)) throw new Error("INVALID_CREDENTIALS")

  const allowed =
    audience === "parent" ? user.role === "PARENT" :
    audience === "staff" ? ["TEACHER", "SCHOOL_ADMIN", "SUPER_ADMIN", "EDITOR"].includes(user.role) :
    audience === "admin" ? ["SCHOOL_ADMIN", "SUPER_ADMIN"].includes(user.role) :
    audience === "email"

  if (!allowed) throw new Error("INVALID_CREDENTIALS")
  if (audience === "email") throw new Error("EMAIL_PROVIDER_NOT_CONFIGURED")

  const sessionId = randomUUID()
  const expiresAt = new Date(Date.now() + (remember ? REMEMBERED_SESSION_TTL_SECONDS : SESSION_TTL_SECONDS) * 1000)
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null

  await db.query(
    `insert into app_sessions (id, user_id, school_id, expires_at, user_agent, ip_hash)
     values ($1::uuid, $2::uuid, $3::uuid, $4, $5, $6)`,
    [sessionId, user.id, user.school_id, expiresAt, request.headers.get("user-agent"), hashIp(forwarded)],
  )

  return {
    cookie: `${SESSION_COOKIE}=${encodeURIComponent(sessionId)}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${remember ? REMEMBERED_SESSION_TTL_SECONDS : SESSION_TTL_SECONDS}`,
    redirectTo: user.role === "PARENT" ? "/portal/parent" : user.role === "STUDENT" ? "/portal/student" : "/portal",
  }
}

export async function getDatabaseAuthContext(request: Request): Promise<AuthContext | null> {
  const token = parseCookies(request.headers.get("cookie")).get(SESSION_COOKIE)
  if (!token) return null

  const sessionId = token
  const result = await getDbClient().query<{
    user_id: string
    school_id: string
    role: AuthContext["role"]
  }>(
    `select s.user_id::text, s.school_id::text, u.role
     from app_sessions s
     join app_users u on u.id = s.user_id and u.school_id = s.school_id
     where s.id = $1::uuid
       and s.revoked_at is null
       and s.expires_at > now()
       and u.is_active = true
     limit 1`,
    [sessionId],
  )
  const row = result.rows[0]
  if (!row) return null

  await getDbClient().query(
    "update app_sessions set last_seen_at = now() where id = $1::uuid",
    [sessionId],
  )
  return { userId: row.user_id, role: row.role, schoolId: row.school_id }
}

export async function revokeDatabaseSession(request: Request) {
  const token = parseCookies(request.headers.get("cookie")).get(SESSION_COOKIE)
  if (!token) return
  await getDbClient().query("update app_sessions set revoked_at = now() where id = $1::uuid", [token])
}

export function clearSessionCookie() {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=0`
}
