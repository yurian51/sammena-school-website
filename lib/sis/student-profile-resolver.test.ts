import { describe, expect, it } from "vitest"
import { resolveStudentProfileContext } from "./student-profile-resolver"
import type { Guardian, StudentGuardian } from "./supporting-types"
import type { Enrollment, Student } from "./types"

const student: Student = {
  id: "student-1",
  schoolId: "school-1",
  admissionNumber: "SAM-001",
  firstName: "Amina",
  lastName: "Mollel",
  isActive: true,
}

const primary: Guardian = {
  id: "guardian-primary",
  schoolId: "school-1",
  firstName: "Juma",
  lastName: "Mollel",
  phone: "+255700000000",
  isActive: true,
}

const secondary: Guardian = {
  id: "guardian-secondary",
  schoolId: "school-1",
  firstName: "Neema",
  lastName: "Mollel",
  phone: "+255710000000",
  isActive: true,
}

const enrollment: Enrollment = {
  id: "enrollment-1",
  schoolId: "school-1",
  studentId: "student-1",
  academicYearId: "year-1",
  classId: "class-1",
  status: "ACTIVE",
  enrolledAt: "2026-01-10",
}

describe("resolveStudentProfileContext", () => {
  it("resolves the active enrollment", () => {
    const result = resolveStudentProfileContext(student, [primary], [enrollment])
    expect(result.currentEnrollment).toEqual(enrollment)
  })

  it("resolves primary guardian from relationship metadata", () => {
    const relationships: StudentGuardian[] = [
      { studentId: student.id, guardianId: secondary.id, relationship: "PARENT", isPrimary: false },
      { studentId: student.id, guardianId: primary.id, relationship: "GUARDIAN", isPrimary: true },
    ]

    const result = resolveStudentProfileContext(
      student,
      [secondary, primary],
      [enrollment],
      relationships,
    )

    expect(result.primaryGuardian).toEqual(primary)
  })

  it("preserves guardian and enrollment collections", () => {
    const result = resolveStudentProfileContext(
      student,
      [primary, secondary],
      [enrollment],
    )
    expect(result.guardians).toHaveLength(2)
    expect(result.enrollments).toHaveLength(1)
  })
})
