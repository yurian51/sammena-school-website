const MAX_JSON_BYTES = 32 * 1024

export async function readJson<T>(request: Request): Promise<T> {
  const contentType = request.headers.get("content-type") ?? ""
  if (!contentType.toLowerCase().includes("application/json")) {
    throw new Error("VALIDATION_ERROR")
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0")
  if (Number.isFinite(contentLength) && contentLength > MAX_JSON_BYTES) {
    throw new Error("REQUEST_TOO_LARGE")
  }

  let raw: string
  try {
    raw = await request.text()
  } catch {
    throw new Error("VALIDATION_ERROR")
  }

  if (new TextEncoder().encode(raw).byteLength > MAX_JSON_BYTES) {
    throw new Error("REQUEST_TOO_LARGE")
  }

  try {
    return JSON.parse(raw) as T
  } catch {
    throw new Error("VALIDATION_ERROR")
  }
}

export function requestId(request: Request): string {
  const supplied = request.headers.get("x-request-id")?.trim()
  if (supplied && /^[A-Za-z0-9._:-]{1,100}$/.test(supplied)) return supplied
  return crypto.randomUUID()
}
