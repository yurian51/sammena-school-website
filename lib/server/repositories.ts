import { PostgresAdmissionsRepository } from "../db/repositories/admissions-postgres"
import { PostgresCmsRepository } from "../db/repositories/cms-postgres"
import { PostgresAuditRepository } from "../db/repositories/audit-postgres"
import { PostgresStudentRepository } from "../db/repositories/student-postgres"
import { PostgresGuardianRepository } from "../db/repositories/guardian-postgres"
import { PostgresEnrollmentRepository } from "../db/repositories/enrollment-postgres"
import { AdmissionsService } from "../admissions/service"
import { CmsService } from "../cms/service"
import { StudentService } from "../sis/student-service"

export function createServerServices() {
  const admissionsRepository = new PostgresAdmissionsRepository()
  const cmsRepository = new PostgresCmsRepository()
  const studentRepository = new PostgresStudentRepository()
  const guardianRepository = new PostgresGuardianRepository()
  const enrollmentRepository = new PostgresEnrollmentRepository()

  return {
    admissions: new AdmissionsService(admissionsRepository),
    cms: new CmsService(cmsRepository),
    audit: new PostgresAuditRepository(),
    sis: {
      student: new StudentService("default", studentRepository),
      guardian: guardianRepository,
      enrollment: enrollmentRepository,
    },
  }
}
