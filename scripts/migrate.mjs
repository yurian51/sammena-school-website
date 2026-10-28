import { readdir, readFile } from "node:fs/promises"
import { join } from "node:path"
import pg from "pg"

const { Pool } = pg
const connectionString = process.env.DATABASE_URL?.trim()

if (!connectionString) {
  console.warn("[db:migrate] DATABASE_URL is not configured; skipping migrations.")
  process.exit(0)
}

const url = new URL(connectionString)
const sslMode = url.searchParams.get("sslmode")?.toLowerCase()
const ssl = sslMode && sslMode !== "disable"
  ? { rejectUnauthorized: sslMode === "verify-full" }
  : undefined

const pool = new Pool({
  connectionString,
  max: 2,
  connectionTimeoutMillis: 10_000,
  ssl,
  application_name: "sammena-school-migrator",
})

try {
  await pool.query(`
    create table if not exists _sammena_migrations (
      id text primary key,
      applied_at timestamptz not null default now()
    )
  `)

  const dir = join(process.cwd(), "supabase", "migrations")
  const files = (await readdir(dir))
    .filter((name) => name.endsWith(".sql"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  for (const file of files) {
    const already = await pool.query(
      "select 1 from _sammena_migrations where id = $1",
      [file],
    )
    if (already.rowCount) continue

    const sql = await readFile(join(dir, file), "utf8")
    const client = await pool.connect()
    try {
      await client.query("begin")
      await client.query(sql)
      await client.query("insert into _sammena_migrations (id) values ($1)", [file])
      await client.query("commit")
      console.log(`[db:migrate] applied ${file}`)
    } catch (error) {
      await client.query("rollback")
      throw error
    } finally {
      client.release()
    }
  }

  const school = await pool.query(
    "select id from schools where slug = $1 limit 1",
    ["sammena-pre-primary-school"],
  )
  if (school.rowCount !== 1) {
    throw new Error("SAMMENA_SCHOOL_TENANT_NOT_FOUND")
  }

  console.log(`[db:migrate] Sammena tenant ready: ${school.rows[0].id}`)
} finally {
  await pool.end()
}
