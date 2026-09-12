import { PostgresAdmissionsRepository } from "../db/repositories/admissions-postgres"
import { PostgresCmsRepository } from "../db/repositories/cms-postgres"
import { PostgresAuditRepository } from "../db/repositories/audit-postgres"
import { PostgresStudentRepository } from "../db/repositories/student-postgres"
import { PostgresGuardianRepository } from "../db/repositories/guardian-postgres"
import { PostgresEnrollmentRepository } from "../db/repositories/enrollment-postgres"
import { InMemoryAdmissionsRepository } from "../admissions/repository"
import { AdmissionsService } from "../admissions/service"
import { CmsService } from "../cms/service"
import { StudentService } from "../sis/student-service"

export interface ServerServiceContext {
  schoolId: string
}

// Keep the development fallback process-local and shared across requests.
// Production deployments should provide DATABASE_URL and a configured PostgreSQL client.
const fallbackAdmissionsRepository = new InMemoryAdmissionsRepository()

export function createServerServices(context: ServerServiceContext = { schoolId: process.env.SAMMENA_SCHOOL_ID ?? "public" }) {
  const admissionsRepository = process.env.DATABASE_URL
    ? new PostgresAdmissionsRepository()
    : fallbackAdmissionsRepository
  const cmsRepository = new PostgresCmsRepository()
  const studentRepository = new PostgresStudentRepository(context.schoolId)
  const guardianRepository = new PostgresGuardianRepository(context.schoolId)
  const enrollmentRepository = new PostgresEnrollmentRepository(context.schoolId)

  return {
    admissions: new AdmissionsService(admissionsRepository),
    cms: new CmsService(cmsRepository),
    audit: new PostgresAuditRepository(),
    sis: {
      student: new StudentService(context.schoolId, studentRepository),
      guardian: guardianRepository,
      enrollment: enrollmentRepository,
    },
  }
}
