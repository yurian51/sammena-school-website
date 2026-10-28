import { NextResponse } from "next/server"
import { apiError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { authenticateUser } from "@/lib/auth/database-session-provider"
import { PostgresAuditRepository } from "@/lib/db/repositories/audit-postgres"

const audiences = new Set(["parent", "student", "staff", "email", "admin"])

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function POST(request: Request) {
  const id = requestId(request)

  try {
    const body = await request.json()
    const audience = typeof body?.audience === "string" ? body.audience : ""
    const identifier = typeof body?.identifier === "string" ? body.identifier.trim().toLowerCase() : ""
    const password = typeof body?.password === "string" ? body.password : ""
    const remember = body?.remember === true

    if (!audiences.has(audience) || !identifier || password.length < 8) {
      return apiError("VALIDATION_ERROR", "Choose a valid login type and provide your credentials.", 400, id)
    }

<<<<<<< HEAD
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
=======
    if (audience === "admin") {
      try {
        authenticateAdmin(identifier, password)
        const cookie = createAdminSessionCookie({ email: identifier, remember })
        return Response.json(
          { data: { redirectTo: "/admin" }, requestId: id },
          { status: 200, headers: { "Cache-Control": "no-store", "Set-Cookie": cookie } },
        )
      } catch (error) {
        if (error instanceof Error && error.message === "AUTH_PROVIDER_NOT_CONFIGURED") {
          return apiError("SERVICE_UNAVAILABLE", "Sammena administrator authentication is not configured on the server.", 503, id)
        }
        return apiError("UNAUTHORIZED", "The administrator credentials are not valid.", 401, id)
      }
    }

    if (audience === "staff") {
      try {
        const account = await findSchoolAccount(identifier)
        if (!account || !verifySchoolPassword(password, account.password_hash)) {
          return apiError("UNAUTHORIZED", "The staff credentials are not valid.", 401, id)
        }
        const cookie = createSchoolSessionCookie({
          userId: account.id,
          email: account.email,
          role: account.role as Role,
          schoolId: account.school_id,
          remember,
        })
        return Response.json(
          { data: { redirectTo: "/portal" }, requestId: id },
          { status: 200, headers: { "Cache-Control": "no-store", "Set-Cookie": cookie } },
        )
      } catch {
        return apiError("SERVICE_UNAVAILABLE", "Staff authentication is not available. Confirm the production database and account migration are configured.", 503, id)
      }
    }

    return apiError("SERVICE_UNAVAILABLE", "This login type is not connected to a school identity provider yet.", 503, id)
  } catch {
    return apiError("VALIDATION_ERROR", "The login request could not be read.", 400, id)
>>>>>>> origin/main
  }
}
