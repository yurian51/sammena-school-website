import { z } from "zod"

export const PAYMENT_METHODS = ["CASH", "BANK_TRANSFER", "MOBILE_MONEY", "CHEQUE", "OTHER"] as const

export const feeItemInput = z.object({
  name: z.string().trim().min(1).max(120),
  term: z.string().trim().min(1).max(40),
  amount: z.number().min(0).max(100_000_000_00).multipleOf(0.01),
})

export const invoiceInput = z.object({
  studentId: z.string().uuid(),
  term: z.string().trim().min(1).max(40),
  feeItemIds: z.array(z.string().uuid()).min(1).max(50),
})

export const paymentInput = z.object({
  invoiceId: z.string().uuid(),
  amount: z.number().positive().max(100_000_000_00).multipleOf(0.01),
  method: z.enum(PAYMENT_METHODS),
  reference: z.string().trim().max(120).optional().default(""),
  receivedOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
})

/** Outstanding balance on an invoice, rounded to cents. */
export function balanceDue(total: number, paid: number): number {
  return Math.round((total - paid) * 100) / 100
}

export function formatReceiptNumber(sequence: number, year: number): string {
  return `RCP-${year}-${String(sequence).padStart(6, "0")}`
}
