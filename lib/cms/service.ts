import type { CmsContent, CmsContentStatus } from "./types"
import type { CmsRepository } from "./repository"

const publishableRoles = new Set(["SUPER_ADMIN", "SCHOOL_ADMIN", "EDITOR"])

export class CmsService {
  constructor(private readonly repository: CmsRepository) {}

  async listPublished(type?: CmsContent["type"]) {
    return this.repository.listPublished(type)
  }

  async save(content: CmsContent) {
    return this.repository.save(content)
  }

  async updateStatus(id: string, status: CmsContentStatus, role: string) {
    if (status === "PUBLISHED" && !publishableRoles.has(role)) {
      throw new Error("FORBIDDEN")
    }
    return this.repository.updateStatus(id, status)
  }
}
