import { generateApplicationReference } from "./reference"
import type { AdmissionsApplication, ApplicationStatus } from "./types"
import type { AdmissionsRepository, DraftInput } from "./repository"

export class AdmissionsService {
  constructor(private readonly repository: AdmissionsRepository) {}

  async createDraft(input: DraftInput): Promise<AdmissionsApplication> {
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
