import { describe, expect, it } from "vitest"
import { hasPermission } from "@/lib/auth/roles"
import { requirePermission } from "@/lib/auth/authorization"

describe("authorization", () => {
  it("allows school admin to publish CMS", () => expect(hasPermission("SCHOOL_ADMIN", "cms:publish")).toBe(true))
  it("denies parent from publishing CMS", () => expect(hasPermission("PARENT", "cms:publish")).toBe(false))
  it("rejects missing authentication", () => expect(() => requirePermission(null, "cms:read")).toThrow("UNAUTHORIZED"))
})
