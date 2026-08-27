const requiredServerEnv = ["DATABASE_URL"] as const

export function getServerEnv() {
  const missing = requiredServerEnv.filter((key) => !process.env[key])
  if (missing.length > 0) {
    throw new Error(`Missing required server environment: ${missing.join(", ")}`)
  }

  return { databaseUrl: process.env.DATABASE_URL as string }
}
