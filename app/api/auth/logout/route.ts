import { NextResponse } from "next/server"
import { clearSessionCookie, revokeDatabaseSession } from "@/lib/auth/database-session-provider"

export async function POST(request: Request) {
  try {
    await revokeDatabaseSession(request)
  } finally {
    const response = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } })
    response.headers.set("Set-Cookie", clearSessionCookie())
    return response
  }
}
