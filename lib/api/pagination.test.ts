import { describe, expect, it } from "vitest"
import { paginate, parsePagination } from "./pagination"

describe("portal pagination", () => {
  it("uses safe defaults", () => {
    expect(parsePagination(new URLSearchParams())).toEqual({ page: 1, pageSize: 25 })
  })

  it("normalizes invalid page values and caps page size", () => {
    expect(parsePagination(new URLSearchParams("page=-2&pageSize=9999"))).toEqual({ page: 1, pageSize: 100 })
  })

  it("bounds unsafe and excessively large page numbers", () => {
    expect(parsePagination(new URLSearchParams("page=1e100&pageSize=25"))).toEqual({ page: 1, pageSize: 25 })
    expect(parsePagination(new URLSearchParams("page=999999999&pageSize=25"))).toEqual({ page: 1_000_000, pageSize: 25 })
  })

  it("clamps pages beyond the end and returns stable metadata", () => {
    const result = paginate([1, 2, 3, 4, 5], { page: 9, pageSize: 2 })
    expect(result.data).toEqual([5])
    expect(result.meta).toEqual({ page: 3, pageSize: 2, total: 5, totalPages: 3, hasNextPage: false, hasPreviousPage: true })
  })
})
