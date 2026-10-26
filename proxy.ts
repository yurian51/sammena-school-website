import { NextRequest, NextResponse } from "next/server"

const COOKIE_NAME = "sammena_session"

type SessionCookie = {
  access_token: string
  refresh_token: string
  expires_at?: number
  session_expires_at: number
  remember?: boolean
}

function getConfig() {
  const url = (process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL)?.trim().replace(/\/$/, "")
  const key = (
    process.env.SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )?.trim()
  return url && key ? { url, key } : null
}

function decodeSession(value: string): SessionCookie | null {
  try {
    const session = JSON.parse(Buffer.from(decodeURIComponent(value), "base64url").toString("utf8")) as SessionCookie
    return session.access_token && session.refresh_token && session.session_expires_at ? session : null
  } catch {
    return null
  }
}

export async function proxy(request: NextRequest) {
  const response = NextResponse.next()
  if (request.nextUrl.pathname.startsWith("/api/auth/")) return response

  const raw = request.cookies.get(COOKIE_NAME)?.value
  if (!raw) return response

  const session = decodeSession(raw)
  if (!session) {
    response.cookies.delete(COOKIE_NAME)
    return response
  }

  const now = Math.floor(Date.now() / 1000)
  const remaining = session.session_expires_at - now
  if (remaining <= 0) {
    response.cookies.delete(COOKIE_NAME)
    return response
  }

  // Refresh before the access token expires. Keep refresh-token rotation server-side
  // and persist the rotated token in the HttpOnly cookie.
  if ((session.expires_at ?? 0) <= now + 90) {
    const config = getConfig()
    if (!config) return response
    const refreshed = await fetch(`${config.url}/auth/v1/token?grant_type=refresh_token`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: config.key },
      body: JSON.stringify({ refresh_token: session.refresh_token }),
      cache: "no-store",
    }).catch((): null => null)

    if (!refreshed?.ok) {
      response.cookies.delete(COOKIE_NAME)
      return response
    }

    const token = await refreshed.json().catch((): null => null) as {
      access_token?: string; refresh_token?: string; expires_in?: number; expires_at?: number
    } | null
    if (!token?.access_token || !token.refresh_token) {
      response.cookies.delete(COOKIE_NAME)
      return response
    }

    const nextSession = {
      ...session,
      access_token: token.access_token,
      refresh_token: token.refresh_token,
      expires_at: token.expires_at ?? now + (token.expires_in ?? 3600),
    }
    const encoded = Buffer.from(JSON.stringify(nextSession)).toString("base64url")
    // Forward the refreshed token to the route handler in this same request.
    request.cookies.set(COOKIE_NAME, encoded)
    const refreshedResponse = NextResponse.next({ request })
    refreshedResponse.cookies.set(COOKIE_NAME, encoded, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: remaining,
    })
    return refreshedResponse
  }
  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
