import { describe, expect, it } from "vitest"
import { validateAdmissionsApplication } from "../lib/admissions/validation"

const validInput = {
  academicYear: "2026/2027",
  studyType: "Day" as const,
  guardian: { fullName: "Amina Mwangi", phone: "+255750227073", relationship: "Parent" },
  learner: {
    fullName: "Neema Mwangi",
    dateOfBirth: "2015-06-15",
    entryLevel: "Class V",
    previousSchool: "Sammena Primary School",
  },
}

describe("admission domain validation", () => {
  it("accepts a complete application core", () => {
    expect(validateAdmissionsApplication(validInput)).toEqual({ ok: true })
  })

  it("accepts every Sammena entry level from Baby through Class VII", () => {
    const levels = ["Baby", "Pre-Unity", "Class I", "Class II", "Class III", "Class IV", "Class V", "Class VI", "Class VII"]
    for (const entryLevel of levels) {
      expect(validateAdmissionsApplication({
        ...validInput,
        learner: { ...validInput.learner, entryLevel },
      })).toEqual({ ok: true })
    }
  })

  it("accepts every supported guardian relationship", () => {
    const relationships = ["Father", "Mother", "Aunt", "Uncle", "Brother", "Sister", "Grandfather", "Grandmother", "Guardian", "Other authorized caregiver"]
    for (const relationship of relationships) {
      expect(validateAdmissionsApplication({
        ...validInput,
        guardian: { ...validInput.guardian, relationship },
      })).toEqual({ ok: true })
    }
  })

  it("rejects an unsupported guardian relationship", () => {
    const result = validateAdmissionsApplication({
      ...validInput,
      guardian: { ...validInput.guardian, relationship: "Neighbor" },
    })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.fields).toContain("guardian.relationship")
  })

  it("rejects malformed academic years", () => {
    const result = validateAdmissionsApplication({ ...validInput, academicYear: "26/27" })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.fields).toContain("academicYear")
  })

  it("rejects impossible calendar dates", () => {
    const result = validateAdmissionsApplication({
      ...validInput,
      learner: { ...validInput.learner, dateOfBirth: "2015-02-30" },
    })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.fields).toContain("learner.dateOfBirth")
  })

  it("rejects future dates of birth", () => {
    const future = new Date(Date.now() + 86400000).toISOString().slice(0, 10)
    const result = validateAdmissionsApplication({
      ...validInput,
      learner: { ...validInput.learner, dateOfBirth: future },
    })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.fields).toContain("learner.dateOfBirth")
  })

  it("requires a recognized study type and guardian relationship", () => {
    const result = validateAdmissionsApplication({
      ...validInput,
      studyType: "Night" as never,
      guardian: { ...validInput.guardian, relationship: "" },
    })
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.fields).toContain("studyType")
      expect(result.fields).toContain("guardian.relationship")
    }
  })

  it("rejects unsupported entry levels", () => {
    const result = validateAdmissionsApplication({
      ...validInput,
      learner: { ...validInput.learner, entryLevel: "Form I" },
    })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.fields).toContain("learner.entryLevel")
  })
})
