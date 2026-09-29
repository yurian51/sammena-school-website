import { authenticateAdmin, createAdminSessionCookie } from "@/lib/auth/session"
import { apiError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"

const audiences = new Set(["parent", "student", "staff", "email", "admin"])

export async function POST(request: Request) {
  const id = requestId(request)
  try {
    const body = await request.json()
    const audience = typeof body?.audience === "string" ? body.audience : ""
    const identifier = typeof body?.identifier === "string" ? body.identifier.trim() : ""
    const password = typeof body?.password === "string" ? body.password : ""
    const remember = body?.remember === true

    if (!audiences.has(audience) || !identifier || password.length < 8) {
      return apiError("VALIDATION_ERROR", "Choose a valid login type and provide your credentials.", 400, id)
    }

    if (audience !== "admin") {
      return apiError("SERVICE_UNAVAILABLE", "This login type is not connected to a school identity provider yet.", 503, id)
    }

    try {
      authenticateAdmin(identifier, password)
    } catch (error) {
      if (error instanceof Error && error.message === "AUTH_PROVIDER_NOT_CONFIGURED") {
        return apiError("SERVICE_UNAVAILABLE", "Sammena administrator authentication is not configured on the server.", 503, id)
      }
      return apiError("UNAUTHORIZED", "The administrator credentials are not valid.", 401, id)
    }

    const cookie = createAdminSessionCookie({ email: identifier, remember })
    return Response.json(
      { data: { redirectTo: "/admin" }, requestId: id },
      { status: 200, headers: { "Cache-Control": "no-store", "Set-Cookie": cookie } },
    )
  } catch {
    return apiError("VALIDATION_ERROR", "The login request could not be read.", 400, id)
  }
}
