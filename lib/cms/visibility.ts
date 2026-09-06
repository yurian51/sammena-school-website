import type { CmsContent, ContentStatus } from "./types"

/** Public content must be explicitly published and inside its publication window. */
export function isPublicContent(status: ContentStatus, publishedAt?: string, expiresAt?: string, now = new Date()): boolean {
  if (status !== "PUBLISHED") return false
  if (publishedAt && new Date(publishedAt) > now) return false
  if (expiresAt && new Date(expiresAt) <= now) return false
  return true
}

export function canPublish(role: string): boolean {
  return ["SUPER_ADMIN", "SCHOOL_ADMIN", "EDITOR"].includes(role)
}

export function toPublicContent(content: CmsContent, now = new Date()) {
  const expiresAt = content.type === "ANNOUNCEMENT" ? content.expiresAt : undefined
  if (!isPublicContent(content.status, content.publishedAt, expiresAt, now)) return null

  if (content.type === "NEWS") {
    return {
      id: content.id,
      type: content.type,
      title: content.title,
      slug: content.slug,
      excerpt: content.excerpt,
      body: content.body,
      category: content.category,
      publishedAt: content.publishedAt,
    }
  }

  return {
    id: content.id,
    type: content.type,
    title: content.title,
    slug: content.slug,
    summary: content.summary,
    priority: content.priority,
    expiresAt: content.expiresAt,
    publishedAt: content.publishedAt,
  }
}
