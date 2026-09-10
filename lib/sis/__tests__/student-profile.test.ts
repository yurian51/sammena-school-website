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

function createService() {
  return new StudentProfileService("school-1", {
    findStudent: async () => student,
    listGuardians: async () => [guardian],
    listEnrollments: async () => [enrollment],
  })
}

describe("StudentProfileService", () => {
  it("loads student, guardians and enrollments", async () => {
    const relationship: StudentGuardian = {
      studentId: student.id,
      guardianId: guardian.id,
      relationship: "PARENT",
      isPrimary: true,
    }

    await expect(createService().get(student.id)).resolves.toEqual({
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

  it("allows a linked parent to read the student profile", async () => {
    await expect(
      createService().getForActor(
        { role: "PARENT", schoolId: "school-1", linkedStudentIds: [student.id] },
        student.id,
      ),
    ).resolves.toEqual({ student, guardians: [guardian], enrollments: [enrollment] })
  })

  it("blocks a parent from an unrelated student", async () => {
    await expect(
      createService().getForActor(
        { role: "PARENT", schoolId: "school-1", linkedStudentIds: ["student-2"] },
        student.id,
      ),
    ).rejects.toThrow("SIS_PROFILE_FORBIDDEN")
  })

  it("blocks a student from reading another student's profile", async () => {
    await expect(
      createService().getForActor(
        { role: "STUDENT", schoolId: "school-1", studentId: "student-2" },
        student.id,
      ),
    ).rejects.toThrow("SIS_PROFILE_FORBIDDEN")
  })

  it("allows a teacher only when the target is explicitly assigned", async () => {
    await expect(
      createService().getForActor(
        { role: "TEACHER", schoolId: "school-1", assignedStudentIds: [student.id] },
        student.id,
      ),
    ).resolves.toBeDefined()
  })
})
