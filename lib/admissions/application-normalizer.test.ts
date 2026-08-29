import { describe, expect, it } from "vitest"
import { normalizeAdmissionApplication } from "./application-normalizer"

const input = { guardian: "  Parent   One ", phone: "071 234-5678", email: " PARENT@EXAMPLE.COM ", relationship: "Parent", occupation: "", guardianNationality: "", address: "Arusha", learner: "  Amani   One ", dob: "2018-01-01", age: "8", gender: "Male", nationality: "Tanzanian", homeRegion: " Arusha ", homeDistrict: " Arumeru ", division: "Nduruma", village: " Nduruma ", eyeColor: "Brown", height: "120", weight: "24", religion: "", tribe: "", entry: "Class I", studyType: "Day", academicYear: "2027", previous: "  School A ", previousYear: "2026", medical: "", allergies: "", distance: "5km", preferredStart: "", siblings: "", photoReady: false } as any

describe("admissions normalizer", () => {
  it("cleans names, phone, email and locations", () => {
    const result = normalizeAdmissionApplication(input)
    expect(result.guardian).toBe("Parent One")
    expect(result.learner).toBe("Amani One")
    expect(result.phone).toBe("0712345678")
    expect(result.email).toBe("parent@example.com")
    expect(result.homeRegion).toBe("Arusha")
  })
})
