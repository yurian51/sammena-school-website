import { generateApplicationReference } from "./reference"
import type { AdmissionApplication, ApplicationStatus, CreateApplicationInput } from "./types"
import type { AdmissionsRepository } from "./repository"
import { canTransition } from "./transitions"
import { validateAdmissionsApplication } from "./validation"

export class AdmissionsService {
  constructor(private readonly repository: AdmissionsRepository) {}

  async createDraft(input: CreateApplicationInput): Promise<AdmissionApplication> {
    const validation = validateAdmissionsApplication(input)
    if (!validation.ok) throw new Error("VALIDATION_ERROR")
    const reference = generateApplicationReference()
    return this.repository.createDraft(reference, input)
  }

  async getByReference(reference: string) {
    return this.repository.findByReference(reference)
  }

  async updateStatus(reference: string, status: ApplicationStatus) {
    const existing = await this.repository.findByReference(reference)
    if (!existing) throw new Error("APPLICATION_NOT_FOUND")
    if (existing.status !== status && !canTransition(existing.status, status)) {
      throw new Error("INVALID_STATUS_TRANSITION")
    }
    return this.repository.updateStatus(reference, status)
  }
}
