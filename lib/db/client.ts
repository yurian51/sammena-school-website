import { Pool } from "pg"

type QueryResult<T> = { rows: T[] }

export interface DbClient {
  query<T = unknown>(sql: string, params?: readonly unknown[]): Promise<QueryResult<T>>
}

let client: DbClient | null = null

export function configureDbClient(nextClient: DbClient) {
  client = nextClient
}

function createPostgresClient(): DbClient | null {
  const connectionString = process.env.DATABASE_URL?.trim()
  if (!connectionString) return null

  const pool = new Pool({
    connectionString,
    max: Number(process.env.DB_POOL_MAX ?? 10),
    idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS ?? 30_000),
    connectionTimeoutMillis: Number(process.env.DB_CONNECTION_TIMEOUT_MS ?? 5_000),
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
  })

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
