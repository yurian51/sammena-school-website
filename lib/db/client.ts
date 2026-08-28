type QueryResult<T> = { rows: T[] }

export interface DbClient {
  query<T = unknown>(sql: string, params?: readonly unknown[]): Promise<QueryResult<T>>
}

let client: DbClient | null = null

export function configureDbClient(nextClient: DbClient) {
  client = nextClient
}

export function getDbClient(): DbClient {
  if (!client) throw new Error("DATABASE_CLIENT_NOT_CONFIGURED")
  return client
}
