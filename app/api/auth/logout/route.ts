import { NextResponse } from "next/server"
import { clearSessionCookie, revokeDatabaseSession } from "@/lib/auth/database-session-provider"
import { PostgresAuditRepository } from "@/lib/db/repositories/audit-postgres"
import { requestId } from "@/lib/api/request"

export async function POST(request: Request) {
  const id = requestId(request)
  try {
    const userId = await revokeDatabaseSession(request)
    if (userId) {
      try {
        await new PostgresAuditRepository().record({ actorUserId: userId, action: "LOGOUT", entityType: "AUTH_SESSION", requestId: id })
      } catch {
        // Session revocation is already complete; audit failure must not prevent cookie clearing.
      }
    }
  } finally {
    const response = NextResponse.json({ ok: true, requestId: id }, { headers: { "Cache-Control": "no-store" } })
    response.headers.set("Set-Cookie", clearSessionCookie())
    return response
  }
}
