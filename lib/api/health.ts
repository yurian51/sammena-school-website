export function backendHealth() {
  return {
    status: "ok" as const,
    service: "sammena-backend",
    timestamp: new Date().toISOString(),
  }
}
