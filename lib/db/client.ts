import { Pool } from "pg"

type QueryResult<T> = { rows: T[] }

export interface DbClient {
  query<T = unknown>(sql: string, params?: readonly unknown[]): Promise<QueryResult<T>>
}

declare global {
  // eslint-disable-next-line no-var
  var __sammenaPgPool: Pool | undefined
}

let client: DbClient | null = null

export function configureDbClient(nextClient: DbClient) {
  client = nextClient
}

function envInteger(name: string, fallback: number, minimum: number, maximum: number) {
  const parsed = Number.parseInt(process.env[name] ?? "", 10)
  if (!Number.isFinite(parsed)) return fallback
  return Math.min(maximum, Math.max(minimum, parsed))
}

function createPostgresClient(): DbClient | null {
  const connectionString = process.env.DATABASE_URL?.trim()
  if (!connectionString) return null

  const pool = globalThis.__sammenaPgPool ?? new Pool({
    connectionString,
    max: envInteger("DB_POOL_MAX", 10, 1, 20),
    idleTimeoutMillis: envInteger("DB_IDLE_TIMEOUT_MS", 30_000, 1_000, 300_000),
    connectionTimeoutMillis: envInteger("DB_CONNECTION_TIMEOUT_MS", 5_000, 1_000, 30_000),
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
  })

  if (process.env.NODE_ENV !== "production") globalThis.__sammenaPgPool = pool

  return {
    async query<T = unknown>(sql: string, params?: readonly unknown[]) {
      const result = await pool.query(sql, params ? [...params] : undefined)
      return { rows: result.rows as T[] }
    },
  }
}

const runtimeClient = createPostgresClient()
if (runtimeClient) configureDbClient(runtimeClient)

export function getDbClient(): DbClient {
  if (!client) throw new Error("DATABASE_CLIENT_NOT_CONFIGURED")
  return client
}
