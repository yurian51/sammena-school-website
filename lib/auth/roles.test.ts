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
