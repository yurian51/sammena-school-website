import { describe, expect, it } from "vitest"
import { hasPortalPermission } from "./portal-roles"

const roles = ["SUPER_ADMIN", "SCHOOL_ADMIN", "TEACHER", "PARENT", "STUDENT"] as const

describe("portal permissions", () => {
  it("grants portal access only to supported portal roles", () => {
    for (const role of roles) expect(hasPortalPermission(role, "portal:read")).toBe(true)
  })

  it("denies unsupported application roles instead of throwing", () => {
    expect(hasPortalPermission("EDITOR" as never, "portal:read")).toBe(false)
    expect(hasPortalPermission("UNKNOWN" as never, "portal:read")).toBe(false)
  })
})
