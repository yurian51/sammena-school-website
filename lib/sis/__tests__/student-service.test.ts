import { describe, expect, it } from "vitest"
import type { StudentRepository } from "../repository"
import type { Student } from "../types"
import { StudentService } from "../student-service"

const student: Student = {
  id: "student-1",
  schoolId: "school-1",
  admissionNumber: "SAM-001",
  firstName: "Amina",
  lastName: "Mollel",
  isActive: true,
}

function repository(overrides: Partial<StudentRepository> = {}): StudentRepository {
  return {
    schoolId: "school-1",
    findById: async () => student,
    findByAdmissionNumber: async () => null,
    create: async value => value,
    update: async (_id, input) => ({ ...student, ...input }),
    ...overrides,
  }
}

describe("StudentService", () => {
  it("rejects creating a student outside the repository school", async () => {
    const service = new StudentService("school-1", repository())

    await expect(
      service.create({ ...student, schoolId: "school-2" }),
    ).rejects.toThrow("SIS_SCHOOL_SCOPE_VIOLATION")
  })

  it("rejects duplicate admission numbers", async () => {
    const service = new StudentService(
      "school-1",
      repository({ findByAdmissionNumber: async () => student }),
    )

    await expect(service.create(student)).rejects.toThrow(
      "SIS_ADMISSION_NUMBER_ALREADY_EXISTS",
    )
  })

  it("updates an existing student through the repository", async () => {
    const service = new StudentService("school-1", repository())

    await expect(service.update("student-1", { firstName: "Neema" })).resolves.toMatchObject({
      id: "student-1",
      firstName: "Neema",
    })
  })
})
