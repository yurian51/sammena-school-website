import { randomBytes, scryptSync } from "node:crypto"
import pg from "pg"

const args = new Map()
for (let i = 2; i < process.argv.length; i += 2) args.set(process.argv[i], process.argv[i + 1])

const identifier = args.get("--identifier")?.trim().toLowerCase()
const password = args.get("--password")
const role = args.get("--role")
const schoolId = args.get("--school-id")
const roles = new Set(["SUPER_ADMIN", "SCHOOL_ADMIN", "EDITOR", "TEACHER", "PARENT", "STUDENT"])

if (!identifier || !password || password.length < 8 || !role || !roles.has(role) || !schoolId) {
  console.error("Usage: node scripts/create-app-user.mjs --identifier EMAIL_OR_PHONE --password PASSWORD --role ROLE --school-id SCHOOL_UUID")
  process.exit(1)
}
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is required.")
  process.exit(1)
}

const salt = randomBytes(16)
const derived = scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1, maxmem: 32 * 1024 * 1024 })
const passwordHash = `scrypt$16384$8$1$${salt.toString("base64url")}$${derived.toString("base64url")}`
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })

try {
  const result = await pool.query(
    `insert into app_users (school_id, identifier, password_hash, role)
     values ($1::uuid, $2, $3, $4)
     on conflict (school_id, identifier) do update
       set password_hash = excluded.password_hash, role = excluded.role, is_active = true, updated_at = now()
     returning id::text, identifier, role`,
    [schoolId, identifier, passwordHash, role],
  )
  console.log(JSON.stringify(result.rows[0], null, 2))
} finally {
  await pool.end()
}
