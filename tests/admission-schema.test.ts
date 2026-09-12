import { describe, expect, it } from "vitest"
import { admissionApplicationSchema, guardianOccupations, guardianRelationships } from "../lib/admissions/application-schema"

const validApplication = {
  guardian: "Amina Mwangi",
  phone: "+255750227073",
  secondaryPhone: "+255713123456",
  nidaNumber: "19901234567890123456",
  email: "amina@example.com",
  relationship: "Father",
  occupation: "Teacher",
  guardianNationality: "Tanzanian",
  address: "Nduruma, Arusha",
  learner: "Neema Mwangi",
  dob: "2015-06-15",
  age: "11",
  gender: "Female",
  nationality: "Tanzanian",
  homeRegion: "Arusha",
  homeDistrict: "Arumeru",
  division: "Nduruma",
  village: "Nduruma",
  eyeColor: "Brown",
  height: "140 cm",
  weight: "35 kg",
  religion: "Christian",
  tribe: "Chagga",
  entry: "Class V",
  studyType: "Day",
  academicYear: "2026/2027",
  previous: "Sammena Primary School",
  previousYear: "2025/2026",
  medical: "",
  allergies: "",
  distance: "5 km",
  preferredStart: "2026-01-12",
  siblings: "",
  photoReady: true,
  consent: true,
}

describe("admission application schema", () => {
  it("accepts the complete current application contract", () => {
    expect(admissionApplicationSchema.safeParse(validApplication).success).toBe(true)
  })

  it("accepts every supported guardian relationship", () => {
    for (const relationship of guardianRelationships) {
      expect(admissionApplicationSchema.safeParse({ ...validApplication, relationship }).success).toBe(true)
    }
  })

  it("accepts every supported guardian occupation", () => {
    for (const occupation of guardianOccupations) {
      expect(admissionApplicationSchema.safeParse({ ...validApplication, occupation }).success).toBe(true)
    }
  })

  it("rejects unsupported guardian relationship and occupation values", () => {
    expect(admissionApplicationSchema.safeParse({ ...validApplication, relationship: "Neighbor" }).success).toBe(false)
    expect(admissionApplicationSchema.safeParse({ ...validApplication, occupation: "Gamer" }).success).toBe(false)
  })

  it("requires a valid 20-digit NIDA number", () => {
    expect(admissionApplicationSchema.safeParse({ ...validApplication, nidaNumber: "" }).success).toBe(false)
    expect(admissionApplicationSchema.safeParse({ ...validApplication, nidaNumber: "1234567890123456789" }).success).toBe(false)
    expect(admissionApplicationSchema.safeParse({ ...validApplication, nidaNumber: "123456789012345678901" }).success).toBe(false)
    expect(admissionApplicationSchema.safeParse({ ...validApplication, nidaNumber: "12345678901234567890" }).success).toBe(true)
  })

  it("accepts an optional secondary phone and rejects malformed phone numbers", () => {
    expect(admissionApplicationSchema.safeParse({ ...validApplication, secondaryPhone: "" }).success).toBe(true)
    expect(admissionApplicationSchema.safeParse({ ...validApplication, secondaryPhone: "123" }).success).toBe(false)
    expect(admissionApplicationSchema.safeParse({ ...validApplication, phone: "123" }).success).toBe(false)
  })

  it("rejects non-consecutive academic year ranges at the API schema boundary", () => {
    expect(admissionApplicationSchema.safeParse({ ...validApplication, academicYear: "2026/2028" }).success).toBe(false)
    expect(admissionApplicationSchema.safeParse({ ...validApplication, academicYear: "2026/2027" }).success).toBe(true)
    expect(admissionApplicationSchema.safeParse({ ...validApplication, academicYear: "2026" }).success).toBe(true)
  })
})
