import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto"
import { getRuntimeDbClient } from "@/lib/db/runtime"
import type { Role } from "./roles"

export type ManagedRole = Exclude<Role, "SUPER_ADMIN">

export type SchoolAccount = {
  id: string
  school_id: string
  email: string
  display_name: string
  role: ManagedRole
  password_hash: string
  is_active: boolean
}

export function hashSchoolPassword(password: string) {
  const salt = randomBytes(16)
  const derived = scryptSync(password, salt, 64)
  return `scrypt$16384$8$1$${salt.toString("base64url")}$${derived.toString("base64url")}`
}

export function verifySchoolPassword(password: string, encoded: string) {
  const [scheme, nRaw, rRaw, pRaw, saltRaw, hashRaw] = encoded.split("$")
  if (scheme !== "scrypt" || !nRaw || !rRaw || !pRaw || !saltRaw || !hashRaw) return false
  const n = Number(nRaw), r = Number(rRaw), p = Number(pRaw)
  if (!Number.isInteger(n) || n < 2 || !Number.isInteger(r) || r < 1 || !Number.isInteger(p) || p < 1) return false
  try {
    const salt = Buffer.from(saltRaw, "base64url")
    const expected = Buffer.from(hashRaw, "base64url")
    const actual = scryptSync(password, salt, expected.length, { N: n, r, p, maxmem: 64 * 1024 * 1024 })
    return expected.length === actual.length && timingSafeEqual(expected, actual)
  } catch {
    return false
  }
}

export async function findSchoolAccount(identifier: string) {
  const email = identifier.trim().toLowerCase()
  const db = getRuntimeDbClient()
  const result = await db.query<SchoolAccount>(
    `select id, school_id, email, display_name, role, password_hash, is_active
       from app_users
      where email = $1
      limit 2`,
    [email],
  )
  if (result.rows.length !== 1 || !result.rows[0].is_active) return null
  return result.rows[0]
}

export async function createSchoolAccount(input: {
  schoolId: string
  email: string
  displayName: string
  role: ManagedRole
  password: string
  createdBy: string
}) {
  const db = getRuntimeDbClient()
  const email = input.email.trim().toLowerCase()
  const result = await db.query<{ id: string; email: string; display_name: string; role: ManagedRole; is_active: boolean; created_at: string }>(
    `insert into app_users (school_id, email, display_name, role, password_hash, created_by)
     values ($1, $2, $3, $4, $5, $6)
     returning id, email, display_name, role, is_active, created_at`,
    [input.schoolId, email, input.displayName.trim(), input.role, hashSchoolPassword(input.password), input.createdBy],
  )
  const account = result.rows[0]
  await db.query(
    `insert into app_auth_audit (school_id, actor_id, action, target_user_id, metadata)
     values ($1, $2, 'ACCOUNT_CREATED', $3, $4::jsonb)`,
    [input.schoolId, input.createdBy, account.id, JSON.stringify({ email: account.email, role: account.role })],
  )
  return account
}
