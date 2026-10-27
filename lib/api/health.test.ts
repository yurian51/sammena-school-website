import { describe, expect, it } from "vitest"
import { describeDatabaseFailure } from "./health"

describe("database failure diagnostics", () => {
  it("reports a missing DATABASE_URL", () => {
    expect(describeDatabaseFailure(new Error("DATABASE_CLIENT_NOT_CONFIGURED"))).toEqual({ reason: "DATABASE_URL_NOT_SET" })
  })

  it("reports the driver error code and never the message", () => {
    const err = Object.assign(new Error("password authentication failed for user postgres.xyz"), { code: "28P01" })
    const result = describeDatabaseFailure(err)
    expect(result).toEqual({ reason: "CONNECTION_OR_AUTH_FAILED", code: "28P01" })
    expect(JSON.stringify(result)).not.toContain("password")
  })

  it("falls back to an unknown reason", () => {
    expect(describeDatabaseFailure("boom")).toEqual({ reason: "UNKNOWN_ERROR" })
  })
})
