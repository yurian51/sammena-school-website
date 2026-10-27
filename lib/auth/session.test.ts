import { afterEach, describe, expect, it, vi } from "vitest"
import { configureSessionProvider, getAuthContext } from "./session"

const envKeys = [
  "SUPABASE_URL",
  "SUPABASE_PUBLISHABLE_KEY",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "SUPABASE_ANON_KEY",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
] as const
const originalEnv = Object.fromEntries(envKeys.map(key => [key, process.env[key]]))

afterEach(() => {
  configureSessionProvider(null)
  vi.unstubAllGlobals()
  for (const key of envKeys) {
    const value = originalEnv[key]
    if (value === undefined) delete process.env[key]
    else process.env[key] = value
  }
})

describe("session provider", () => {
  it("fails explicitly when authentication is not configured", async () => {
    delete process.env.SUPABASE_URL
    delete process.env.SUPABASE_PUBLISHABLE_KEY
    delete process.env.NEXT_PUBLIC_SUPABASE_URL
    delete process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    delete process.env.SUPABASE_ANON_KEY
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    await expect(getAuthContext(new Request("https://example.test/portal"))).rejects.toThrow("AUTH_PROVIDER_NOT_CONFIGURED")
  })

  it("returns the provider context when configured", async () => {
    configureSessionProvider({
      getContext: async () => ({ userId: "user-1", role: "SCHOOL_ADMIN", schoolId: "school-1" }),
    })

    await expect(getAuthContext(new Request("https://example.test/portal"))).resolves.toEqual({
      userId: "user-1",
      role: "SCHOOL_ADMIN",
      schoolId: "school-1",
    })
  })

  it("accepts only server-controlled Supabase app_metadata roles", async () => {
    process.env.SUPABASE_URL = "https://auth.example.test"
    process.env.SUPABASE_PUBLISHABLE_KEY = "publishable-test-key"
    const cookieValue = Buffer.from(JSON.stringify({
      access_token: "access-token",
      refresh_token: "refresh-token",
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      session_expires_at: Math.floor(Date.now() / 1000) + 3600,
    })).toString("base64url")
    const fetchMock = vi.fn().mockResolvedValue(Response.json({
      id: "admin-1",
      app_metadata: { role: "SUPER_ADMIN", school_id: "school-1" },
      user_metadata: { role: "PARENT" },
    }))
    vi.stubGlobal("fetch", fetchMock)

    await expect(getAuthContext(new Request("https://example.test/api/admin", {
      headers: { cookie: `sammena_session=${cookieValue}` },
    }))).resolves.toEqual({ userId: "admin-1", role: "SUPER_ADMIN", schoolId: "school-1" })
    expect(fetchMock).toHaveBeenCalledWith("https://auth.example.test/auth/v1/user", expect.objectContaining({
      headers: { apikey: "publishable-test-key", Authorization: "Bearer access-token" },
      cache: "no-store",
    }))
  })

  it("rejects a role supplied only in user_metadata", async () => {
    process.env.SUPABASE_URL = "https://auth.example.test"
    process.env.SUPABASE_PUBLISHABLE_KEY = "publishable-test-key"
    const cookieValue = Buffer.from(JSON.stringify({
      access_token: "access-token",
      refresh_token: "refresh-token",
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      session_expires_at: Math.floor(Date.now() / 1000) + 3600,
    })).toString("base64url")
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({
      id: "user-1",
      app_metadata: {},
      user_metadata: { role: "SUPER_ADMIN" },
    })))

    await expect(getAuthContext(new Request("https://example.test/api/admin", {
      headers: { cookie: `sammena_session=${cookieValue}` },
    }))).resolves.toBeNull()
  })
})
