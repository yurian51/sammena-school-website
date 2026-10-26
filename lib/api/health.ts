import { getRuntimeDbClient } from "@/lib/db/runtime"

/**
 * Classifies a database failure without exposing the connection string or password.
 * Only the driver's error code is reported (for example 28P01 = wrong password, ENOTFOUND = bad host).
 */
export function describeDatabaseFailure(error: unknown): { reason: string; code?: string } {
  const message = error instanceof Error ? error.message : ""
  const code = typeof (error as { code?: unknown })?.code === "string" ? (error as { code: string }).code : undefined
  if (message === "DATABASE_CLIENT_NOT_CONFIGURED") return { reason: "DATABASE_URL_NOT_SET" }
  if (code) return { reason: "CONNECTION_OR_AUTH_FAILED", code }
  return { reason: "UNKNOWN_ERROR" }
}

export async function backendHealth() {
  const checkedAt = new Date().toISOString()

  try {
    await getRuntimeDbClient().query("select 1 as ok")

    return {
      status: "ok" as const,
      service: "sammena-backend",
      database: "ok" as const,
      timestamp: checkedAt,
    }
  } catch (error) {
    return {
      status: "degraded" as const,
      service: "sammena-backend",
      database: "unavailable" as const,
      timestamp: checkedAt,
      diagnostic: describeDatabaseFailure(error),
    }
  }
}
