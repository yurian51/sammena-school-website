import { describe, expect, it } from "vitest"
import type { Guardian, StudentGuardian } from "../supporting-types"
import type { Enrollment, Student } from "../types"
import { StudentProfileService } from "../student-profile"

const student: Student = {
  id: "student-1",
  schoolId: "school-1",
  admissionNumber: "SAM-001",
  firstName: "Amina",
  lastName: "Mollel",
  isActive: true,
}

const guardian: Guardian = {
  id: "guardian-1",
  schoolId: "school-1",
  firstName: "Juma",
  lastName: "Mollel",
  phone: "+255700000000",
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

describe("StudentProfileService", () => {
  it("loads student, guardians and enrollments", async () => {
    const relationship: StudentGuardian = {
      studentId: student.id,
      guardianId: guardian.id,
      relationship: "PARENT",
      isPrimary: true,
    }

    const service = new StudentProfileService("school-1", {
      findStudent: async () => student,
      listGuardians: async () => [guardian],
      listEnrollments: async () => [enrollment],
    })

    await expect(service.get(student.id)).resolves.toEqual({
      student,
      guardians: [guardian],
      enrollments: [enrollment],
    })
    expect(relationship.isPrimary).toBe(true)
  })

  it("rejects a student outside the current school", async () => {
    const service = new StudentProfileService("school-1", {
      findStudent: async () => ({ ...student, schoolId: "school-2" }),
      listGuardians: async () => [],
      listEnrollments: async () => [],
    })

    await expect(service.get(student.id)).rejects.toThrow("SIS_SCHOOL_SCOPE_VIOLATION")
  })
})
