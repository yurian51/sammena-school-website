import { describe, expect, it } from "vitest"
import { paginate } from "./pagination"

describe("admissions pagination", () => {
  it("returns stable page metadata", () => {
    const result = paginate([1, 2, 3, 4, 5], { page: 2, pageSize: 2 })
    expect(result.items).toEqual([3, 4])
    expect(result.totalPages).toBe(3)
    expect(result.hasNext).toBe(true)
    expect(result.hasPrevious).toBe(true)
  })
})
