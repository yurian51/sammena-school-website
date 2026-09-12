import type { AdmissionsRepository, DraftInput } from "../../admissions/repository"
import type { AdmissionApplication, ApplicationStatus } from "../../admissions/types"
import { getDbClient } from "../client"
import type { ApplicationRow } from "../types"
import { mapApplicationRow } from "../mappers"

export class PostgresAdmissionsRepository implements AdmissionsRepository {
  async createDraft(reference: string, input: DraftInput): Promise<AdmissionApplication> {
    const result = await getDbClient().query<ApplicationRow>(
      `with guardian as (
         insert into "AdmissionGuardian" ("fullName", "phone", "secondaryPhone", "nidaNumber", "email", "relationship", "updatedAt")
         values ($1, $2, $3, $4, $5, $6, now())
         returning "id"
       ), application as (
         insert into "AdmissionApplication" (
           "reference", "status", "academicYear", "entry", "studyType", "guardianId",
           "learnerFullName", "learnerDateOfBirth", "learnerPreviousSchool", "updatedAt"
         )
         select $7, 'DRAFT', $8, $9, $10, guardian."id", $11, $12, $13, now()
         from guardian
         returning *
       )
       select
         application."id"::text as id,
         application."reference" as reference,
         application."status" as status,
         application."academicYear" as academic_year,
         application."studyType" as study_type,
         application."entry" as learner_entry_level,
         application."learnerFullName" as learner_full_name,
         application."learnerDateOfBirth" as learner_date_of_birth,
         application."learnerPreviousSchool" as learner_previous_school,
         application."submittedAt" as submitted_at,
         application."createdAt" as created_at,
         application."updatedAt" as updated_at,
         guardian."fullName" as guardian_full_name,
         guardian."phone" as guardian_phone,
         guardian."secondaryPhone" as guardian_secondary_phone,
         guardian."nidaNumber" as guardian_nida_number,
         guardian."email" as guardian_email,
         guardian."relationship" as guardian_relationship
       from application
       join "AdmissionGuardian" guardian on guardian."id" = application."guardianId"`,
      [
        input.guardian.fullName,
        input.guardian.phone,
        input.guardian.secondaryPhone ?? null,
        input.guardian.nidaNumber,
        input.guardian.email ?? null,
        input.guardian.relationship ?? null,
        reference,
        input.academicYear,
        input.learner.entryLevel,
        input.studyType,
        input.learner.fullName,
        input.learner.dateOfBirth,
        input.learner.previousSchool ?? null,
      ],
    )
    const row = result.rows[0]
    if (!row) throw new Error("DATABASE_INSERT_FAILED")
    return mapApplicationRow(row)
  }

  async findByReference(reference: string) {
    const result = await getDbClient().query<ApplicationRow>(
      `select
         application."id"::text as id,
         application."reference" as reference,
         application."status" as status,
         application."academicYear" as academic_year,
         application."studyType" as study_type,
         application."entry" as learner_entry_level,
         application."learnerFullName" as learner_full_name,
         application."learnerDateOfBirth" as learner_date_of_birth,
         application."learnerPreviousSchool" as learner_previous_school,
         application."submittedAt" as submitted_at,
         application."createdAt" as created_at,
         application."updatedAt" as updated_at,
         guardian."fullName" as guardian_full_name,
         guardian."phone" as guardian_phone,
         guardian."secondaryPhone" as guardian_secondary_phone,
         guardian."nidaNumber" as guardian_nida_number,
         guardian."email" as guardian_email,
         guardian."relationship" as guardian_relationship
       from "AdmissionApplication" application
       join "AdmissionGuardian" guardian on guardian."id" = application."guardianId"
       where application."reference" = $1
       limit 1`,
      [reference],
    )
    return result.rows[0] ? mapApplicationRow(result.rows[0]) : null
  }

  async updateStatus(reference: string, status: ApplicationStatus) {
    const result = await getDbClient().query<ApplicationRow>(
      `with updated as (
         update "AdmissionApplication"
         set
           "status" = $1,
           "submittedAt" = case when $1 = 'SUBMITTED' and "submittedAt" is null then now() else "submittedAt" end,
           "updatedAt" = now()
         where "reference" = $2
         returning *
       )
       select
         application."id"::text as id,
         application."reference" as reference,
         application."status" as status,
         application."academicYear" as academic_year,
         application."studyType" as study_type,
         application."entry" as learner_entry_level,
         application."learnerFullName" as learner_full_name,
         application."learnerDateOfBirth" as learner_date_of_birth,
         application."learnerPreviousSchool" as learner_previous_school,
         application."submittedAt" as submitted_at,
         application."createdAt" as created_at,
         application."updatedAt" as updated_at,
         guardian."fullName" as guardian_full_name,
         guardian."phone" as guardian_phone,
         guardian."secondaryPhone" as guardian_secondary_phone,
         guardian."nidaNumber" as guardian_nida_number,
         guardian."email" as guardian_email,
         guardian."relationship" as guardian_relationship
       from updated application
       join "AdmissionGuardian" guardian on guardian."id" = application."guardianId"`,
      [status, reference],
    )
    const row = result.rows[0]
    if (!row) throw new Error("APPLICATION_NOT_FOUND")
    return mapApplicationRow(row)
  }
}
