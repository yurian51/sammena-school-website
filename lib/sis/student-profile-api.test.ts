import { describe, expect, it } from "vitest"
import { getStudentProfile } from "./student-profile-api"

const student = {
  id: "student-1",
  schoolId: "school-1",
  admissionNumber: "SAM-001",
  firstName: "Amina",
  lastName: "Mollel",
  isActive: true,
}

const guardian = {
  id: "guardian-1",
  schoolId: "school-1",
  firstName: "Juma",
  lastName: "Mollel",
  phone: "+255700000000",
  isActive: true,
}

const enrollment = {
  id: "enrollment-1",
  schoolId: "school-1",
  studentId: "student-1",
  academicYearId: "year-1",
  classId: "class-1",
  status: "ACTIVE" as const,
  enrolledAt: "2026-01-10",
}

describe("getStudentProfile", () => {
  it("returns the composed profile context", async () => {
    const result = await getStudentProfile("school-1", "student-1", {
      findStudent: async () => student,
      listGuardians: async () => [guardian],
      listGuardianRelationships: async () => [
        {
          studentId: student.id,
          guardianId: guardian.id,
          relationship: "PARENT" as const,
          isPrimary: true,
        },
      ],
      listEnrollments: async () => [enrollment],
    })

    expect(result.student).toEqual(student)
    expect(result.primaryGuardian).toEqual(guardian)
    expect(result.currentEnrollment).toEqual(enrollment)
  })

  it("rejects a missing student", async () => {
    await expect(
      getStudentProfile("school-1", "missing", {
        findStudent: async () => null,
        listGuardians: async () => [],
        listGuardianRelationships: async () => [],
        listEnrollments: async () => [],
      }),
    ).rejects.toThrow("SIS_STUDENT_NOT_FOUND")
  })
})
