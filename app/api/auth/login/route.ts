import { NextResponse } from "next/server"
import { apiError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { authenticateUser } from "@/lib/auth/database-session-provider"
import { PostgresAuditRepository } from "@/lib/db/repositories/audit-postgres"

const audiences = new Set(["parent", "staff", "email", "admin"])

export const dynamic = "force-dynamic"
export const revalidate = 0

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

    const result = await authenticateUser(identifier, password, audience, remember, request)
    const response = NextResponse.json(
      { ok: true, data: { redirectTo: result.redirectTo }, requestId: id },
      { status: 200, headers: { "Cache-Control": "no-store", "x-request-id": id } },
    )
    try {
      await new PostgresAuditRepository().record({
        actorUserId: result.userId,
        action: "LOGIN_SUCCESS",
        entityType: "AUTH_SESSION",
        requestId: id,
      })
    } catch {
      // Authentication succeeded; audit failure must not turn a successful login into a false failure.
    }
    response.headers.set("Set-Cookie", result.cookie)
    return response
  } catch (error) {
    if (error instanceof Error && error.message === "INVALID_CREDENTIALS") {
      return apiError("UNAUTHORIZED", "Invalid credentials.", 401, id)
    }
    if (error instanceof Error && error.message === "LOGIN_RATE_LIMITED") {
      return Response.json(
        { error: { code: "RATE_LIMITED", message: "Too many failed login attempts. Try again later.", requestId: id } },
        { status: 429, headers: { "Retry-After": "900", "Cache-Control": "no-store", "x-request-id": id } },
      )
    }
    if (error instanceof Error && error.message === "EMAIL_PROVIDER_NOT_CONFIGURED") {
      return apiError("SERVICE_UNAVAILABLE", "School email authentication is not configured.", 503, id)
    }
    if (error instanceof Error && error.message === "DATABASE_CLIENT_NOT_CONFIGURED") {
      return apiError("SERVICE_UNAVAILABLE", "School authentication is temporarily unavailable.", 503, id)
    }
    return apiError("SERVICE_UNAVAILABLE", "Authentication could not be completed.", 503, id)
  }
}
