import { apiError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"

const audiences = new Set(["parent", "staff", "email", "admin"])

export async function POST(request: Request) {
  const id = requestId(request)
  try {
    const body = await request.json()
    const audience = typeof body?.audience === "string" ? body.audience : ""
    const identifier = typeof body?.identifier === "string" ? body.identifier.trim() : ""
    const password = typeof body?.password === "string" ? body.password : ""

    if (!audiences.has(audience) || !identifier || password.length < 8) {
      return apiError("VALIDATION_ERROR", "Choose a valid login type and provide your credentials.", 400, id)
    }

    // Authentication is intentionally adapter-backed. Until a real school identity provider
    // is configured, never accept credentials or fabricate a session in this endpoint.
    return apiError("SERVICE_UNAVAILABLE", "Sammena authentication is not connected to a school identity provider yet.", 503, id)
  } catch {
    return apiError("VALIDATION_ERROR", "The login request could not be read.", 400, id)
  }
}
