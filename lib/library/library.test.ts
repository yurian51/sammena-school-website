import { describe, expect, it } from "vitest"
import { availableCopies, bookInput, canReduceTo, issueInput } from "./library"

describe("library rules", () => {
  it("computes available copies from total minus open loans", () => {
    expect(availableCopies(5, 2)).toBe(3)
    expect(availableCopies(5, 5)).toBe(0)
    expect(availableCopies(2, 4)).toBe(0)
  })

  it("does not allow reducing stock below copies on loan", () => {
    expect(canReduceTo(3, 2)).toBe(true)
    expect(canReduceTo(1, 2)).toBe(false)
  })

  it("validates book input and rejects negative quantity", () => {
    const ok = bookInput.safeParse({ accessionNumber: "A-1", title: "Maths", author: "Anon", category: "Mathematics", quantity: 3 })
    expect(ok.success).toBe(true)
    expect(bookInput.safeParse({ accessionNumber: "A-1", title: "Maths", author: "Anon", category: "Mathematics", quantity: -1 }).success).toBe(false)
  })

  it("requires uuid references for loans", () => {
    expect(issueInput.safeParse({ bookId: "x", studentId: "y" }).success).toBe(false)
  })
})
