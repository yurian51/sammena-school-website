import { NextResponse } from "next/server"
import { createClearedSessionCookie } from "@/lib/auth/session"

export async function POST() {
  const response = NextResponse.json(
    { data: { loggedOut: true } },
    { status: 200, headers: { "Cache-Control": "no-store" } },
  )
  response.headers.append("Set-Cookie", createClearedSessionCookie())
  return response
}
