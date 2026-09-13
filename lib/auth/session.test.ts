import { afterEach, describe, expect, it } from "vitest"
import { configureSessionProvider, getAuthContext } from "./session"

afterEach(() => {
  configureSessionProvider(null)
})

describe("session provider", () => {
  it("fails explicitly when authentication is not configured", async () => {
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
})
