import type { AuthContext } from "../auth/authorization"
import { requirePermission } from "../auth/authorization"
import { PostgresAdmissionsRepository } from "../db/repositories/admissions-postgres"
import { AdmissionsStaffService } from "../admissions/staff-service"
import type { ApplicationStatus } from "../admissions/types"
import { AUDIT_ACTIONS } from "../audit/events"
import { auditAction } from "./admin-audit"

const service = new AdmissionsStaffService(new PostgresAdmissionsRepository())

export async function getStaffAdmission(context: AuthContext | null, reference: string) {
  requirePermission(context, "admissions:read")
  return service.getApplication(reference)
}

export async function updateStaffAdmissionStatus(context: AuthContext | null, reference: string, status: ApplicationStatus, requestId: string) {
  const user = requirePermission(context, "admissions:review")
  const application = await service.changeStatus(reference, status)
  await auditAction(user, AUDIT_ACTIONS.APPLICATION_STATUS_CHANGED, "admissions_application", reference, requestId)
  return application
}
