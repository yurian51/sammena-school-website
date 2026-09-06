import { describe, expect, it } from "vitest"
import { StudentService } from "../student-service"
import type { StudentRepository } from "../repository"
import type { Student } from "../types"

const student: Student = {
  id: "student-1",
  schoolId: "school-a",
  admissionNumber: "S001",
  firstName: "Test",
  lastName: "Student",
  isActive: true,
}

const repository: StudentRepository = {
  schoolId: "school-a",
  findById: async () => student,
  findByAdmissionNumber: async () => null,
  create: async value => value,
  update: async (_id, input) => ({ ...student, ...input }),
}

describe("SIS school scope", () => {
  it("rejects cross-school student creation", async () => {
    const service = new StudentService("school-b", repository)
    await expect(service.create(student)).rejects.toThrow("SIS_SCHOOL_SCOPE_VIOLATION")
  })

  it("allows creation inside the repository school scope", async () => {
    const service = new StudentService("school-a", repository)
    await expect(service.create(student)).resolves.toEqual(student)
  })
})
