import { describe, expect, it } from "vitest"
import { calculateAggregate, calculateResult } from "./result-engine"

describe("canonical academic result engine", () => {
  it.each([
    [0, 100, "E", false],
    [21.99, 100, "E", false],
    [22, 100, "D", false],
    [41.99, 100, "D", false],
    [42, 100, "C", true],
    [61.99, 100, "C", true],
    [62, 100, "B", true],
    [81.99, 100, "B", true],
    [82, 100, "A", true],
    [100, 100, "A", true],
  ])("classifies boundary score %s/%s correctly", (score, maxScore, grade, passing) => {
    expect(calculateResult({ score, maxScore })).toMatchObject({ grade, passing })
  })

  it("rejects invalid and missing numeric inputs", () => {
    expect(() => calculateResult({ score: -1, maxScore: 100 })).toThrow("SCORE_OUT_OF_RANGE")
    expect(() => calculateResult({ score: 101, maxScore: 100 })).toThrow("SCORE_OUT_OF_RANGE")
    expect(() => calculateResult({ score: 10, maxScore: 0 })).toThrow("INVALID_MAX_SCORE")
    expect(() => calculateResult({ score: Number.NaN, maxScore: 100 })).toThrow("INVALID_SCORE")
  })

  it("produces deterministic aggregate statistics", () => {
    expect(calculateAggregate([
      { score: 100, maxScore: 100 },
      { score: 82, maxScore: 100 },
      { score: 62, maxScore: 100 },
      { score: 42, maxScore: 100 },
    ])).toEqual({
      count: 4,
      averagePercentage: 71.5,
      passCount: 4,
      passRate: 100,
      grades: { A: 2, B: 1, C: 1 },
    })
  })
})
