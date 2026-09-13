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
import { ensurePostgresDbClient } from "../db/runtime"

export interface ServerServiceContext {
  schoolId: string
}

// Keep the development fallback process-local and shared across requests.
// Production deployments must provide DATABASE_URL so admissions data cannot
// appear to submit successfully and then disappear when the process restarts.
const fallbackAdmissionsRepository = new InMemoryAdmissionsRepository()

function createAdmissionsRepository() {
  if (process.env.DATABASE_URL) {
    ensurePostgresDbClient()
    return new PostgresAdmissionsRepository()
  }
  if (process.env.NODE_ENV !== "production") return fallbackAdmissionsRepository
  throw new Error("DATABASE_CLIENT_NOT_CONFIGURED")
}

export function createServerServices(context: ServerServiceContext = { schoolId: process.env.SAMMENA_SCHOOL_ID ?? "public" }) {
  const hasDatabase = Boolean(process.env.DATABASE_URL?.trim())
  if (hasDatabase) ensurePostgresDbClient()

  const admissionsRepository = createAdmissionsRepository()
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
