import { describe, expect, it } from "vitest"
import {
  assertStudentProfileObjectAccess,
  canReadStudentProfile,
  type StudentProfileActor,
} from "../authorization"

const target = { schoolId: "school-1", studentId: "student-1" }

function expectAllowed(actor: StudentProfileActor) {
  expect(() => assertStudentProfileObjectAccess(actor, target)).not.toThrow()
}

function expectDenied(actor: StudentProfileActor, message: string) {
  expect(() => assertStudentProfileObjectAccess(actor, target)).toThrow(message)
}

describe("student profile authorization", () => {
  it("allows school administrators within their school", () => {
    expectAllowed({ role: "ADMIN", schoolId: "school-1" })
    expectAllowed({ role: "SCHOOL_ADMIN", schoolId: "school-1" })
  })

  it("rejects administrators from another school", () => {
    expectDenied({ role: "ADMIN", schoolId: "school-2" }, "SIS_SCHOOL_SCOPE_VIOLATION")
    expectDenied({ role: "SCHOOL_ADMIN", schoolId: "school-2" }, "SIS_SCHOOL_SCOPE_VIOLATION")
  })

  it("allows a teacher only for explicitly assigned students", () => {
    expectAllowed({ role: "TEACHER", schoolId: "school-1", assignedStudentIds: ["student-1"] })
    expectDenied(
      { role: "TEACHER", schoolId: "school-1", assignedStudentIds: ["student-2"] },
      "SIS_PROFILE_FORBIDDEN",
    )
  })

  it("allows a parent only for linked students", () => {
    expectAllowed({ role: "PARENT", schoolId: "school-1", linkedStudentIds: ["student-1"] })
    expectDenied(
      { role: "PARENT", schoolId: "school-1", linkedStudentIds: ["student-2"] },
      "SIS_PROFILE_FORBIDDEN",
    )
  })

  it("allows a student to read only their own profile", () => {
    expectAllowed({ role: "STUDENT", schoolId: "school-1", studentId: "student-1" })
    expectDenied(
      { role: "STUDENT", schoolId: "school-1", studentId: "student-2" },
      "SIS_PROFILE_FORBIDDEN",
    )
  })

  it("keeps the role capability contract explicit", () => {
    expect(canReadStudentProfile("ADMIN")).toBe(true)
    expect(canReadStudentProfile("PARENT")).toBe(true)
    expect(canReadStudentProfile("STUDENT")).toBe(true)
  })
})
