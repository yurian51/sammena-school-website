import { getDbClient } from "../client"
import type { StudentRepository } from "@/lib/sis"
import type { StudentRow } from "../sis-types"
import { mapStudentRow } from "../mappers/sis"

export class PostgresStudentRepository implements StudentRepository {
  constructor(public readonly schoolId: string) {}

  async findById(id: string) {
    const result = await getDbClient().query<StudentRow>(
      `select id, school_id, admission_number, first_name, middle_name, last_name, date_of_birth, is_active
       from students where id = $1 and school_id = $2 limit 1`,
      [id, this.schoolId],
    )
    return result.rows[0] ? mapStudentRow(result.rows[0]) : null
  }

  async findByAdmissionNumber(admissionNumber: string) {
    const result = await getDbClient().query<StudentRow>(
      `select id, school_id, admission_number, first_name, middle_name, last_name, date_of_birth, is_active
       from students where admission_number = $1 and school_id = $2 limit 1`,
      [admissionNumber, this.schoolId],
    )
    return result.rows[0] ? mapStudentRow(result.rows[0]) : null
  }

  async create(student: Parameters<StudentRepository["create"]>[0]) {
    if (student.schoolId !== this.schoolId) {
      throw new Error("SIS_SCHOOL_SCOPE_VIOLATION")
    }

    const result = await getDbClient().query<StudentRow>(
      `insert into students
        (id, school_id, admission_number, first_name, middle_name, last_name, date_of_birth, is_active)
       values ($1, $2, $3, $4, $5, $6, $7, $8)
       returning id, school_id, admission_number, first_name, middle_name, last_name, date_of_birth, is_active`,
      [
        student.id,
        student.schoolId,
        student.admissionNumber,
        student.firstName,
        student.middleName ?? null,
        student.lastName,
        student.dateOfBirth ?? null,
        student.isActive,
      ],
    )

    return mapStudentRow(result.rows[0])
  }

  async update(id: string, input: Partial<Omit<Parameters<StudentRepository["create"]>[0], "id" | "schoolId" | "admissionNumber">>) {
    const allowed = [
      "firstName",
      "middleName",
      "lastName",
      "dateOfBirth",
      "isActive",
    ] as const

    const values: unknown[] = []
    const assignments: string[] = []

    for (const field of allowed) {
      if (input[field] !== undefined) {
        values.push(input[field] ?? null)
        const column = field.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
        assignments.push(`${column} = $${values.length}`)
      }
    }

    if (assignments.length === 0) {
      const current = await this.findById(id)
      if (!current) throw new Error("SIS_STUDENT_NOT_FOUND")
      return current
    }

    values.push(id, this.schoolId)
    const idParam = values.length - 1
    const schoolParam = values.length

    const result = await getDbClient().query<StudentRow>(
      `update students
       set ${assignments.join(", ")}
       where id = $${idParam} and school_id = $${schoolParam}
       returning id, school_id, admission_number, first_name, middle_name, last_name, date_of_birth, is_active`,
      values,
    )

    if (!result.rows[0]) {
      throw new Error("SIS_STUDENT_NOT_FOUND")
    }

    return mapStudentRow(result.rows[0])
  }
}
