import { describe, expect, it } from "vitest"
import { admissionQueuePriority } from "./queue-priority"

describe("admissions queue priority", () => {
  it("prioritizes overdue submitted applications", () => {
    const record = { reference: "SAM-2026-AAA111", status: "SUBMITTED", submittedAt: "2026-01-01T00:00:00.000Z", data: {} } as any
    expect(admissionQueuePriority(record, new Date("2026-01-04T00:00:00.000Z"))).toBeGreaterThan(100)
  })
  it("does not mark a recent application overdue", () => {
    const record = { reference: "SAM-2026-BBB222", status: "SUBMITTED", submittedAt: "2026-01-03T00:00:00.000Z", data: {} } as any
    expect(admissionQueuePriority(record, new Date("2026-01-03T12:00:00.000Z"))).toBe(20)
  })
})
