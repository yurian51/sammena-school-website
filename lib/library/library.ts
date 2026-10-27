import { z } from "zod"

export const bookInput = z.object({
  accessionNumber: z.string().trim().min(1).max(60),
  title: z.string().trim().min(1).max(200),
  author: z.string().trim().min(1).max(160),
  category: z.string().trim().min(1).max(80),
  quantity: z.number().int().min(0).max(10000),
})

export const bookUpdate = bookInput.partial()

export const issueInput = z.object({
  bookId: z.string().uuid(),
  studentId: z.string().uuid(),
})

export const idParam = z.string().uuid()

/** Copies on the shelf = total copies minus copies currently out on loan. */
export function availableCopies(quantity: number, openIssues: number): number {
  return Math.max(0, quantity - openIssues)
}

/** A book's total cannot drop below the number of copies already on loan. */
export function canReduceTo(newQuantity: number, openIssues: number): boolean {
  return newQuantity >= openIssues
}
