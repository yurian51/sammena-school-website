import { describe, expect, it } from "vitest"
import { balanceDue, feeItemInput, formatReceiptNumber, paymentInput } from "./ledger"

describe("ledger rules", () => {
  it("computes balance in cents without float drift", () => {
    expect(balanceDue(100.1, 0.1)).toBe(100)
    expect(balanceDue(50000, 20000)).toBe(30000)
  })

  it("formats receipt numbers with year and zero padding", () => {
    expect(formatReceiptNumber(42, 2026)).toBe("RCP-2026-000042")
  })

  it("rejects negative fees and non-positive payments", () => {
    expect(feeItemInput.safeParse({ name: "Tuition", term: "Term 1", amount: -5 }).success).toBe(false)
    expect(paymentInput.safeParse({ invoiceId: "123e4567-e89b-12d3-a456-426614174000", amount: 0, method: "CASH" }).success).toBe(false)
  })

  it("only accepts known payment methods", () => {
    expect(paymentInput.safeParse({ invoiceId: "123e4567-e89b-12d3-a456-426614174000", amount: 10, method: "BITCOIN" }).success).toBe(false)
  })
})
