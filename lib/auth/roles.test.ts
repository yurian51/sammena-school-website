import { describe, expect, it } from "vitest"
import { hasPermission } from "./roles"

describe("generic authorization", () => {
  it("keeps CMS access limited to staff roles that explicitly manage CMS", () => {
    expect(hasPermission("SUPER_ADMIN", "cms:read")).toBe(true)
    expect(hasPermission("SCHOOL_ADMIN", "cms:read")).toBe(true)
    expect(hasPermission("EDITOR", "cms:read")).toBe(true)
    expect(hasPermission("TEACHER", "cms:read")).toBe(false)
    expect(hasPermission("PARENT", "cms:read")).toBe(false)
    expect(hasPermission("STUDENT", "cms:read")).toBe(false)
  })

  it("fails closed for an unsupported runtime role value", () => {
    expect(hasPermission("UNKNOWN" as never, "cms:read")).toBe(false)
  })
})


describe("admin role matrix", () => {
  it("grants operational message management to school administrators", () => {
    expect(hasPermission("SUPER_ADMIN", "messages:write")).toBe(true)
    expect(hasPermission("SCHOOL_ADMIN", "messages:write")).toBe(true)
    expect(hasPermission("ADMIN", "messages:write")).toBe(true)
  })

  it("keeps message mutation access away from read-only roles", () => {
    expect(hasPermission("VIEWER", "messages:write")).toBe(false)
    expect(hasPermission("EDITOR", "messages:write")).toBe(false)
    expect(hasPermission("TEACHER", "messages:write")).toBe(false)
  })
})


describe("environment-backed admin identity", () => {
  it("keeps the permission matrix explicit for all supported roles", () => {
    expect(hasPermission("SUPER_ADMIN", "settings:write")).toBe(true)
    expect(hasPermission("ADMIN", "settings:write")).toBe(false)
    expect(hasPermission("EDITOR", "settings:write")).toBe(false)
    expect(hasPermission("VIEWER", "settings:write")).toBe(false)
  })
})
