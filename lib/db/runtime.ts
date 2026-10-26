import { Pool } from "pg"

import { configureDbClient, getDbClient } from "./client"
import { parseDatabaseUrl } from "./connection-string"

const DEFAULT_POOL_MAX = 10
const DEFAULT_CONNECTION_TIMEOUT_MS = 5_000
const DEFAULT_IDLE_TIMEOUT_MS = 30_000

function readPositiveInteger(value: string | undefined, fallback: number) {
  if (!value) return fallback
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

let pool: Pool | null = null

/**
 * Creates the process-local PostgreSQL pool exactly once when DATABASE_URL is
 * configured. Keeping initialization lazy prevents public pages from needing
 * a database connection while still making every server-side repository use
 * the same bounded pool once persistence is enabled.
 */
export function ensurePostgresDbClient() {
  if (pool) return pool

  const connectionString = process.env.DATABASE_URL?.trim()
  if (!connectionString) {
    throw new Error("DATABASE_CLIENT_NOT_CONFIGURED")
  }

  const config = parseDatabaseUrl(connectionString)
  if (!config) {
    throw new Error("DATABASE_URL_INVALID")
  }
  const sslMode = config.sslmode
  const ssl = sslMode && sslMode !== "disable"
    ? { rejectUnauthorized: sslMode === "verify-full" }
    : undefined

  pool = new Pool({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
    max: readPositiveInteger(process.env.DATABASE_POOL_MAX, DEFAULT_POOL_MAX),
    connectionTimeoutMillis: readPositiveInteger(
      process.env.DATABASE_CONNECTION_TIMEOUT_MS,
      DEFAULT_CONNECTION_TIMEOUT_MS,
    ),
    idleTimeoutMillis: readPositiveInteger(
      process.env.DATABASE_IDLE_TIMEOUT_MS,
      DEFAULT_IDLE_TIMEOUT_MS,
    ),
    ssl,
    application_name: "sammena-school-website",
  })

  configureDbClient(pool)
  return pool
}

export function getRuntimeDbClient() {
  ensurePostgresDbClient()
  return getDbClient()
}
