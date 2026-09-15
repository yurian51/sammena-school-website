import { getRuntimeDbClient } from "@/lib/db/runtime"

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
  } catch {
    return {
      status: "degraded" as const,
      service: "sammena-backend",
      database: "unavailable" as const,
      timestamp: checkedAt,
    }
  }
}
