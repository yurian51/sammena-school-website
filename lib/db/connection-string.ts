export type PgConnectionConfig = {
  user: string
  password: string
  host: string
  port: number
  database: string
  sslmode: string | null
}

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value)
  } catch {
    // A literal % that is not an escape sequence: keep it as typed.
    return value
  }
}

/**
 * Parses postgresql://user:password@host:port/database?sslmode=...
 *
 * The password may contain unescaped characters such as @, #, : or /. The password ends at
 * the LAST @ in the authority, so @ inside the password is accepted. Returns null when the
 * string cannot be read as a PostgreSQL URL, so callers never pass a half-parsed value on.
 */
export function parseDatabaseUrl(input: string): PgConnectionConfig | null {
  const match = input.trim().match(/^postgres(?:ql)?:\/\/(.+)$/i)
  if (!match) return null
  const rest = match[1] ?? ""

  const at = rest.lastIndexOf("@")
  if (at <= 0) return null
  const userinfo = rest.slice(0, at)
  const afterAt = rest.slice(at + 1)

  const colon = userinfo.indexOf(":")
  if (colon <= 0) return null
  const user = safeDecode(userinfo.slice(0, colon))
  const password = safeDecode(userinfo.slice(colon + 1))

  const [pathPart = "", query = ""] = afterAt.split("?", 2)
  const slash = pathPart.indexOf("/")
  const hostPort = slash >= 0 ? pathPart.slice(0, slash) : pathPart
  const database = slash >= 0 ? pathPart.slice(slash + 1) : "postgres"

  const portSeparator = hostPort.lastIndexOf(":")
  const host = portSeparator >= 0 ? hostPort.slice(0, portSeparator) : hostPort
  const portText = portSeparator >= 0 ? hostPort.slice(portSeparator + 1) : "5432"
  const port = Number.parseInt(portText, 10)

  if (!user || !host || !Number.isFinite(port) || port <= 0 || port > 65535) return null

  const sslmode = new URLSearchParams(query).get("sslmode")?.toLowerCase() ?? null
  return { user, password, host, port, database: database || "postgres", sslmode }
}
