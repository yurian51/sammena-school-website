import type { AdmissionApplication, ApplicationStatus } from "./types"
import type { AdmissionsRepository } from "./repository"
import { AdmissionsService } from "./service"

export class AdmissionsStaffService {
  private readonly service: AdmissionsService

  constructor(repository: AdmissionsRepository) {
    this.service = new AdmissionsService(repository)
  }

  async getApplication(reference: string): Promise<AdmissionApplication> {
    const application = await this.service.getByReference(reference)
    if (!application) throw new Error("APPLICATION_NOT_FOUND")
    return application
  }

  async changeStatus(reference: string, status: ApplicationStatus) {
    return this.service.updateStatus(reference, status)
  }
}
