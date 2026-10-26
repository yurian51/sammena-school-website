import { createAdminSessionCookie } from "@/lib/auth/session"
import { apiError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"

const audiences = new Set(["parent", "student", "staff", "email", "admin"])

function getSupabaseConfig() {
  const url = (process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL)?.trim().replace(/\/$/, "")
  const key = (
    process.env.SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )?.trim()
  if (!url || !key) throw new Error("AUTH_PROVIDER_NOT_CONFIGURED")
  return { url, key }
}

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
    if (audience !== "admin") {
      return apiError("SERVICE_UNAVAILABLE", "This login type is not connected to a school identity provider yet.", 503, id)
    }

    let config: ReturnType<typeof getSupabaseConfig>
    try {
      config = getSupabaseConfig()
    } catch {
      return apiError("SERVICE_UNAVAILABLE", "Sammena administrator authentication is not configured on the server.", 503, id)
    }

    const authResponse = await fetch(`${config.url}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: config.key },
      body: JSON.stringify({ email: identifier, password }),
      cache: "no-store",
    }).catch(() => null)

    if (!authResponse) return apiError("SERVICE_UNAVAILABLE", "The identity provider could not be reached.", 503, id)
    if (!authResponse.ok) return apiError("UNAUTHORIZED", "The administrator credentials are not valid.", 401, id)

    const session = await authResponse.json().catch(() => null) as {
      access_token?: string
      refresh_token?: string
      expires_in?: number
      expires_at?: number
      token_type?: string
      user?: { id?: string; app_metadata?: { role?: string } }
    } | null

    if (!session?.access_token || !session.refresh_token || !session.user?.id) {
      return apiError("UNAUTHORIZED", "The identity provider did not return a valid session.", 401, id)
    }

    // Authorization must come from server-controlled app_metadata, never user_metadata.
    const role = session.user.app_metadata?.role
    if (role !== "SUPER_ADMIN" && role !== "SCHOOL_ADMIN") {
      return apiError("FORBIDDEN", "This account is not authorised for school administration.", 403, id)
    }

    const cookie = createAdminSessionCookie(session as {
      access_token: string; refresh_token: string; expires_in?: number; expires_at?: number; token_type?: string
    }, remember)
    return Response.json(
      { data: { redirectTo: "/admin" }, requestId: id },
      { status: 200, headers: { "Cache-Control": "no-store", "Set-Cookie": cookie } },
    )
  } catch {
    return apiError("VALIDATION_ERROR", "The login request could not be read.", 400, id)
  }
}
