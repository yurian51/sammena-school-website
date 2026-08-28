import type { Guardian, GuardianRepository, StudentGuardian } from "@/lib/sis"
import { getDbClient } from "../client"
import type { GuardianRow, StudentGuardianRow } from "../sis-rows"
import { mapGuardianRow, mapStudentGuardianRow } from "../mappers/sis-enrollment"

export class PostgresGuardianRepository implements GuardianRepository {
  constructor(public readonly schoolId: string) {}

  async findById(id: string): Promise<Guardian | null> {
    const result = await getDbClient().query<GuardianRow>(
      `select id, school_id, first_name, last_name, phone, email, is_active
       from guardians where id = $1 and school_id = $2 limit 1`,
      [id, this.schoolId],
    )
    return result.rows[0] ? mapGuardianRow(result.rows[0]) : null
  }

  async listForStudent(studentId: string): Promise<StudentGuardian[]> {
    const result = await getDbClient().query<StudentGuardianRow>(
      `select sg.student_id, sg.guardian_id, sg.relationship, sg.is_primary
       from student_guardians sg
       inner join guardians g on g.id = sg.guardian_id and g.school_id = $2
       where sg.student_id = $1
       order by sg.is_primary desc, sg.guardian_id`,
      [studentId, this.schoolId],
    )
    return result.rows.map(mapStudentGuardianRow)
  }

  async attachToStudent(relationship: StudentGuardian): Promise<StudentGuardian> {
    const result = await getDbClient().query<StudentGuardianRow>(
      `insert into student_guardians
        (student_id, guardian_id, relationship, is_primary)
       select $1, $2, $3, $4
       where exists (
         select 1 from guardians where id = $2 and school_id = $5
       )
       returning student_id, guardian_id, relationship, is_primary`,
      [
        relationship.studentId,
        relationship.guardianId,
        relationship.relationship,
        relationship.isPrimary,
        this.schoolId,
      ],
    )

    if (!result.rows[0]) {
      throw new Error("GUARDIAN_SCHOOL_SCOPE_VIOLATION")
    }

    return mapStudentGuardianRow(result.rows[0])
  }
}
