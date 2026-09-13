import { describe, expect, it } from "vitest"
import { paginate, parsePagination } from "@/lib/api/pagination"

describe("portal pagination", () => {
  it("uses safe defaults", () => {
    const params = new URLSearchParams()
    expect(parsePagination(params)).toEqual({ page: 1, pageSize: 25 })
  })

  it("rejects invalid page values and caps page size", () => {
    const params = new URLSearchParams("page=-2&pageSize=9999")
    expect(parsePagination(params)).toEqual({ page: 1, pageSize: 100 })
  })

  it("returns stable metadata and clamps pages beyond the end", () => {
    const result = paginate([1, 2, 3, 4, 5], { page: 9, pageSize: 2 })
    expect(result.data).toEqual([5])
    expect(result.meta).toEqual({ page: 3, pageSize: 2, total: 5, totalPages: 3, hasNextPage: false, hasPreviousPage: true })
  })
})
