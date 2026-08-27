import { generateApplicationReference } from "./reference"
import type { AdmissionsApplication, ApplicationStatus, CreateApplicationInput } from "./types"
import type { AdmissionsRepository } from "./repository"
import { validateAdmissionsApplication } from "./validation"

export class AdmissionsService {
  constructor(private readonly repository: AdmissionsRepository) {}

  async createDraft(input: CreateApplicationInput): Promise<AdmissionsApplication> {
    const validation = validateAdmissionsApplication(input)
    if (!validation.ok) throw new Error("VALIDATION_ERROR")
    const reference = generateApplicationReference()
    return this.repository.createDraft(reference, input)
  }

  async getByReference(reference: string) {
    return this.repository.findByReference(reference)
  }

  async updateStatus(reference: string, status: ApplicationStatus) {
    return this.repository.updateStatus(reference, status)
  }
}
