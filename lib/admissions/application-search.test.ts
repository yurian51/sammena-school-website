import { describe, expect, it } from "vitest"
import { searchApplications } from "./application-search"

const records = [
  { reference: "SAM-2026-AAA111", status: "SUBMITTED", data: { learner: "Amani Test", guardian: "Parent One", phone: "0712345678" } },
  { reference: "SAM-2026-BBB222", status: "ACCEPTED", data: { learner: "Neema Test", guardian: "Parent Two", phone: "0755555555" } },
] as any

describe("admissions application search", () => {
  it("finds by reference or person details", () => {
    expect(searchApplications(records, { query: "aaa111" })).toHaveLength(1)
    expect(searchApplications(records, { query: "Neema" })).toHaveLength(1)
  })
  it("combines search and status filters", () => {
    expect(searchApplications(records, { query: "Test", status: "ACCEPTED" })).toHaveLength(1)
    expect(searchApplications(records, { status: "REJECTED" })).toHaveLength(0)
  })
})
