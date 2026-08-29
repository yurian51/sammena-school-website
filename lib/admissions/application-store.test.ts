import { beforeEach, describe, expect, it } from "vitest"
import { clearApplicationStore, getApplication, listApplications, submitApplication } from "./application-store"

const sample = {
  guardian: "Test Parent", phone: "0712345678", email: "", relationship: "Parent" as const,
  occupation: "", guardianNationality: "", address: "Arusha", learner: "Test Learner", dob: "2018-01-01", age: "8",
  gender: "Male" as const, nationality: "Tanzanian", homeRegion: "Arusha", homeDistrict: "Arumeru", division: "Nduruma", village: "Nduruma",
  eyeColor: "Brown", height: "120", weight: "24", religion: "", tribe: "", entry: "Class I" as const, studyType: "Day" as const,
  academicYear: "2027", previous: "", previousYear: "", medical: "", allergies: "", distance: "5 km", preferredStart: "", siblings: "", photoReady: false,
}

describe("admissions application store", () => {
  beforeEach(() => clearApplicationStore())
  it("creates and retrieves a submitted application", () => {
    const created = submitApplication(sample)
    expect(created.status).toBe("SUBMITTED")
    expect(getApplication(created.reference)?.reference).toBe(created.reference)
  })
  it("lists applications and filters by status", () => {
    submitApplication(sample)
    expect(listApplications()).toHaveLength(1)
    expect(listApplications("SUBMITTED")).toHaveLength(1)
    expect(listApplications("ACCEPTED")).toHaveLength(0)
  })
})
