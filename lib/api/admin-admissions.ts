import type { AuthContext } from "../auth/authorization"
import { requirePermission } from "../auth/authorization"
import { PostgresAdmissionsRepository } from "../db/repositories/admissions-postgres"
import { AdmissionsStaffService } from "../admissions/staff-service"
import type { ApplicationStatus } from "../admissions/types"

const service = new AdmissionsStaffService(new PostgresAdmissionsRepository())

export async function getStaffAdmission(context: AuthContext | null, reference: string) {
  requirePermission(context, "admissions:read")
  return service.getApplication(reference)
}

export async function updateStaffAdmissionStatus(context: AuthContext | null, reference: string, status: ApplicationStatus) {
  requirePermission(context, "admissions:review")
  return service.changeStatus(reference, status)
}
