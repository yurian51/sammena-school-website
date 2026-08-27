import type { AdmissionsRepository } from "../../admissions/repository"
import type { AdmissionsApplication, ApplicationStatus, CreateApplicationInput } from "../../admissions/types"
import { getDbClient } from "../client"
import type { ApplicationRow } from "../types"
import { mapApplicationRow } from "../mappers"

export class PostgresAdmissionsRepository implements AdmissionsRepository {
  async createDraft(reference: string, input: CreateApplicationInput): Promise<AdmissionsApplication> {
    const db = getDbClient()
    const result = await db.query<ApplicationRow>(
      `insert into applications (reference, guardian_full_name, guardian_phone, guardian_email, learner_full_name, learner_date_of_birth, learner_entry_level, learner_previous_school)
       values ($1,$2,$3,$4,$5,$6,$7,$8) returning *`,
      [reference, input.guardian.fullName, input.guardian.phone, input.guardian.email ?? null, input.learner.fullName, input.learner.dateOfBirth, input.learner.entryLevel, input.learner.previousSchool ?? null],
    )
    const row = result.rows[0]
    if (!row) throw new Error("DATABASE_INSERT_FAILED")
    return mapApplicationRow(row)
  }

  async findByReference(reference: string) {
    const result = await getDbClient().query<ApplicationRow>(
      `select * from applications where reference = $1 limit 1`,
      [reference],
    )
    return result.rows[0] ? mapApplicationRow(result.rows[0]) : null
  }

  async updateStatus(reference: string, status: ApplicationStatus) {
    const result = await getDbClient().query<ApplicationRow>(
      `update applications set status = $1, updated_at = now() where reference = $2 returning *`,
      [status, reference],
    )
    const row = result.rows[0]
    if (!row) throw new Error("APPLICATION_NOT_FOUND")
    return mapApplicationRow(row)
  }
}
