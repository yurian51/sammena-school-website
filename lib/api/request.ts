export async function readJson<T>(request: Request): Promise<T> {
  const contentType = request.headers.get("content-type") ?? ""
  if (!contentType.toLowerCase().includes("application/json")) {
    throw new Error("VALIDATION_ERROR")
  }
  return (await request.json()) as T
}

export function requestId(request: Request): string {
  return request.headers.get("x-request-id")?.trim() || crypto.randomUUID()
}
