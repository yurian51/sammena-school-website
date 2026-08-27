import { describe, expect, it } from "vitest"
import { CmsService } from "@/lib/cms/service"
import type { CmsContent } from "@/lib/cms/types"
import type { CmsRepository } from "@/lib/cms/repository"

const content: CmsContent = {
  id: "cms-1",
  type: "NEWS",
  title: "Test News",
  slug: "test-news",
  excerpt: "Excerpt",
  body: "Body",
  category: "School",
  status: "APPROVED",
  createdAt: "2026-08-27T00:00:00Z",
  updatedAt: "2026-08-27T00:00:00Z",
}

const repository: CmsRepository = {
  async listPublished() { return [] },
  async findById() { return content },
  async save(value) { return value },
  async updateStatus(id, status) { return { ...content, id, status } },
}

describe("CMS lifecycle", () => {
  it("publishes approved content", async () => {
    const service = new CmsService(repository)
    await expect(service.publish(content, "EDITOR")).resolves.toMatchObject({ status: "PUBLISHED" })
  })
  it("rejects publishing by a parent", async () => {
    const service = new CmsService(repository)
    await expect(service.publish(content, "PARENT")).rejects.toThrow("FORBIDDEN")
  })
})
