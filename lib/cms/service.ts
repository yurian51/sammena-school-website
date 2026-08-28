import type { CmsContent, CmsContentStatus } from "./types"
import type { CmsRepository } from "./repository"

const publishableRoles = new Set(["SUPER_ADMIN", "SCHOOL_ADMIN", "EDITOR"])
const publishableFrom = new Set<CmsContentStatus>(["APPROVED", "PUBLISHED"])

export class CmsService {
  constructor(private readonly repository: CmsRepository) {}

  async listPublished(type?: CmsContent["type"]) {
    return this.repository.listPublished(type)
  }

  async getById(id: string) {
    const content = await this.repository.findById(id)
    if (!content) throw new Error("CMS_CONTENT_NOT_FOUND")
    return content
  }

  async save(content: CmsContent) {
    return this.repository.save(content)
  }

  async updateStatus(id: string, status: CmsContentStatus, role: string) {
    if (status === "PUBLISHED" && !publishableRoles.has(role)) throw new Error("FORBIDDEN")
    const current = await this.getById(id)
    if (status === "PUBLISHED" && !publishableFrom.has(current.status)) throw new Error("INVALID_CMS_STATUS_TRANSITION")
    return this.repository.updateStatus(id, status)
  }

  async publish(content: CmsContent, role: string) {
    if (!publishableRoles.has(role)) throw new Error("FORBIDDEN")
    if (!publishableFrom.has(content.status)) throw new Error("INVALID_CMS_STATUS_TRANSITION")
    return this.repository.updateStatus(content.id, "PUBLISHED")
  }
}
