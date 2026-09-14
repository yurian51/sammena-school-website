import { describe, expect, it } from "vitest"
import { hasPortalPermission } from "./portal-roles"

const roles = ["SUPER_ADMIN", "SCHOOL_ADMIN", "TEACHER", "PARENT", "STUDENT"] as const
const staffRoles = ["SUPER_ADMIN", "SCHOOL_ADMIN", "TEACHER"] as const

describe("portal permissions", () => {
  it("grants aggregate portal access only to staff roles", () => {
    for (const role of staffRoles) expect(hasPortalPermission(role, "portal:read")).toBe(true)
    for (const role of ["PARENT", "STUDENT"] as const) expect(hasPortalPermission(role, "portal:read")).toBe(false)
  })

  it("keeps learner and parent roles from reading staff-wide student and assessment datasets", () => {
    for (const role of ["PARENT", "STUDENT"] as const) {
      expect(hasPortalPermission(role, "students:read")).toBe(false)
      expect(hasPortalPermission(role, "assessments:read")).toBe(false)
    }
  })

  it("denies unsupported application roles instead of throwing", () => {
    expect(hasPortalPermission("EDITOR" as never, "portal:read")).toBe(false)
    expect(hasPortalPermission("UNKNOWN" as never, "portal:read")).toBe(false)
  })

  it("keeps the complete supported role set explicit", () => {
    expect(roles).toEqual(["SUPER_ADMIN", "SCHOOL_ADMIN", "TEACHER", "PARENT", "STUDENT"])
  })
})
