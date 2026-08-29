import { describe, expect, it } from "vitest"
import { toPublicApplicationStatus } from "./public-tracking"

describe("public admissions tracking", () => {
  it("returns only safe tracking fields", () => {
    const result = toPublicApplicationStatus({ reference: "SAM-2026-AAA111", status: "ACCEPTED", submittedAt: "2026-01-01T00:00:00.000Z", data: { learner: "Private", guardian: "Private", medical: "Private" } } as any)
    expect(result).toEqual({ reference: "SAM-2026-AAA111", status: "ACCEPTED", submittedAt: "2026-01-01T00:00:00.000Z" })
    expect((result as any).guardian).toBeUndefined()
  })
})
