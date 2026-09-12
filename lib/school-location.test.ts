import { describe, expect, it } from "vitest"
import { schoolLocation } from "@/lib/school-location"

describe("Sammena school location", () => {
  it("uses the canonical school identity", () => {
    expect(schoolLocation.name).toBe("Sammena Pre & Primary School")
    expect(schoolLocation.centreNumber).toBe("PS0101160")
    expect(schoolLocation.registrationNumber).toBe("EM.17569")
  })

  it("contains valid Tanzania location coordinates", () => {
    expect(schoolLocation.latitude).toBeGreaterThanOrEqual(-90)
    expect(schoolLocation.latitude).toBeLessThanOrEqual(90)
    expect(schoolLocation.longitude).toBeGreaterThanOrEqual(-180)
    expect(schoolLocation.longitude).toBeLessThanOrEqual(180)
    expect(schoolLocation.address).toContain("P15336")
    expect(schoolLocation.address).toContain("Nduruma")
  })

  it("keeps map links pinned to the canonical coordinates", () => {
    const coordinates = `${schoolLocation.latitude},${schoolLocation.longitude}`
    expect(schoolLocation.mapEmbed).toContain(coordinates)
    expect(schoolLocation.directionsUrl).toContain(`${schoolLocation.latitude},${schoolLocation.longitude}`)
    expect(schoolLocation.mapsUrl).toContain(`${schoolLocation.latitude},${schoolLocation.longitude}`)
  })

  it("publishes usable contact details", () => {
    expect(schoolLocation.phone).toMatch(/^\+255\s\d{3}\s\d{3}\s\d{3}$/)
    expect(schoolLocation.whatsapp).toBe(schoolLocation.phone)
  })
})
