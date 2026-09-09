import { describe, expect, it } from "vitest"
import { getResults, schoolIdentity } from "@/lib/academic-results"

describe("Sammena academic results", () => {
  it("uses the correct examination centre", () => {
    expect(schoolIdentity.centreNumber).toBe("PS0101160")
  })

  it("contains verified PSLE records from 2022 through 2025", () => {
    expect(getResults("PSLE").map(result => result.year)).toEqual([2022, 2023, 2024, 2025])
  })

  it("does not invent a pass rate when one is not published in the source", () => {
    expect(getResults("PSLE").find(result => result.year === 2024)?.passRate).toBeUndefined()
  })

  it("contains the verified 2024 SFNA record", () => {
    const result = getResults("SFNA").find(item => item.year === 2024)
    expect(result?.candidates).toBe(34)
    expect(result?.average).toBe(174.1176)
  })
})
