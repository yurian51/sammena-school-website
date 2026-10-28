import { NextResponse } from "next/server"
<<<<<<< HEAD
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
=======
import { createClearedSessionCookie, readSupabaseSession } from "@/lib/auth/session"

function getSupabaseConfig() {
  const url = (process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL)?.trim().replace(/\/$/, "")
  const key = (
    process.env.SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )?.trim()
  return url && key ? { url, key } : null
}

export async function POST(request: Request) {
  const session = readSupabaseSession(request)
  const config = getSupabaseConfig()

  if (session && config) {
    await fetch(`${config.url}/auth/v1/logout`, {
      method: "POST",
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${session.access_token}`,
      },
      cache: "no-store",
    }).catch((): null => null)
  }

  const response = NextResponse.json(
    { data: { loggedOut: true } },
    { status: 200, headers: { "Cache-Control": "no-store" } },
  )
  response.headers.append("Set-Cookie", createClearedSessionCookie())
  return response
>>>>>>> origin/main
}
