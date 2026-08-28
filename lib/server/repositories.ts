import { PostgresAdmissionsRepository } from "../db/repositories/admissions-postgres"
import { PostgresCmsRepository } from "../db/repositories/cms-postgres"
import { PostgresAuditRepository } from "../db/repositories/audit-postgres"
import { AdmissionsService } from "../admissions/service"
import { CmsService } from "../cms/service"

export function createServerServices() {
  const admissionsRepository = new PostgresAdmissionsRepository()
  const cmsRepository = new PostgresCmsRepository()

  return {
    admissions: new AdmissionsService(admissionsRepository),
    cms: new CmsService(cmsRepository),
    audit: new PostgresAuditRepository(),
  }
}
