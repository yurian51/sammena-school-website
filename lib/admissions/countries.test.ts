import { describe, expect, it } from "vitest"
import { nationalityOptions } from "./countries"

const uniqueCountries = new Set(nationalityOptions)

describe("nationalityOptions", () => {
  it("contains the complete ISO-style country and area list without duplicates", () => {
    expect(nationalityOptions.length).toBe(249)
    expect(uniqueCountries.size).toBe(nationalityOptions.length)
  })

  it("contains Tanzania and common regional nationalities", () => {
    expect(nationalityOptions).toContain("Tanzania, United Republic of")
    expect(nationalityOptions).toContain("Kenya")
    expect(nationalityOptions).toContain("Uganda")
    expect(nationalityOptions).toContain("Rwanda")
  })
})
