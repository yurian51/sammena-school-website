import { createHash, randomUUID } from "node:crypto"
import { getDbClient } from "@/lib/db/client"
import type { AuthContext } from "./authorization"
import { verifyPassword } from "./password"

export const SESSION_COOKIE = "sammena_session"
const SESSION_TTL_SECONDS = 8 * 60 * 60
const REMEMBERED_SESSION_TTL_SECONDS = 30 * 24 * 60 * 60
const LOGIN_MAX_FAILURES = 5

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

function loginThrottleKey(identifier: string, ip: string | null) {
  return createHash("sha256").update(`${identifier}|${ip ?? "unknown"}`).digest("hex")
}

async function assertLoginAllowed(db: ReturnType<typeof getDbClient>, key: string) {
  const result = await db.query<{ blocked_until: Date | null }>(
    "select blocked_until from auth_login_throttles where key = $1 limit 1",
    [key],
  )
  const blockedUntil = result.rows[0]?.blocked_until
  if (blockedUntil && blockedUntil.getTime() > Date.now()) throw new Error("LOGIN_RATE_LIMITED")
}

async function recordLoginFailure(db: ReturnType<typeof getDbClient>, key: string) {
  await db.query(
    `insert into auth_login_throttles (key, failures, first_failed_at, last_failed_at, blocked_until)
     values ($1, 1, now(), now(), null)
     on conflict (key) do update set
       failures = case
         when auth_login_throttles.first_failed_at < now() - interval '15 minutes' then 1
         else auth_login_throttles.failures + 1
       end,
       first_failed_at = case
         when auth_login_throttles.first_failed_at < now() - interval '15 minutes' then now()
         else auth_login_throttles.first_failed_at
       end,
       last_failed_at = now(),
       blocked_until = case
         when auth_login_throttles.first_failed_at >= now() - interval '15 minutes'
          and auth_login_throttles.failures + 1 >= ${LOGIN_MAX_FAILURES}
         then now() + interval '15 minutes'
         else auth_login_throttles.blocked_until
       end`,
    [key],
  )
}

async function clearLoginFailures(db: ReturnType<typeof getDbClient>, key: string) {
  await db.query("delete from auth_login_throttles where key = $1", [key])
}

export async function authenticateUser(
  identifier: string,
  password: string,
  audience: string,
  remember: boolean,
  request: Request,
  schoolSlug = process.env.SAMMENA_SCHOOL_SLUG ?? "sammena-primary",
) {
  const normalized = normalizeIdentifier(identifier)
  const db = getDbClient()
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null
  const throttleKey = loginThrottleKey(normalized, forwarded)
  await assertLoginAllowed(db, throttleKey)
  const result = await db.query<{
    id: string
    school_id: string
    password_hash: string
    role: AuthContext["role"]
    is_active: boolean
  }>(
    `select id::text, school_id::text, password_hash, role, is_active
     from app_users u
     join schools s on s.id = u.school_id
     where lower(u.identifier) = $1 and u.is_active = true and s.slug = $2
     limit 1`,
    [normalized, schoolSlug],
  )
  const user = result.rows[0]
  if (!user || !verifyPassword(password, user.password_hash)) {
    await recordLoginFailure(db, throttleKey)
    throw new Error("INVALID_CREDENTIALS")
  }
  await clearLoginFailures(db, throttleKey)

  const allowed =
    audience === "parent" ? user.role === "PARENT" :
    audience === "staff" ? ["TEACHER", "SCHOOL_ADMIN", "SUPER_ADMIN"].includes(user.role) :
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
