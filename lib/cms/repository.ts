import type { CmsContent, CmsContentStatus } from "./types"

export interface CmsRepository {
  listPublished(contentType?: CmsContent["type"]): Promise<CmsContent[]>
  save(content: CmsContent): Promise<CmsContent>
  updateStatus(id: string, status: CmsContentStatus): Promise<CmsContent>
}

export class InMemoryCmsRepository implements CmsRepository {
  private readonly records = new Map<string, CmsContent>()

  async listPublished(contentType?: CmsContent["type"]) {
    return [...this.records.values()].filter(item => item.status === "PUBLISHED" && (!contentType || item.type === contentType))
  }

  async save(content: CmsContent) {
    this.records.set(content.id, content)
    return content
  }

  async updateStatus(id: string, status: CmsContentStatus) {
    const existing = this.records.get(id)
    if (!existing) throw new Error("CONTENT_NOT_FOUND")
    const updated = { ...existing, status, updatedAt: new Date().toISOString() }
    this.records.set(id, updated)
    return updated
  }
}
