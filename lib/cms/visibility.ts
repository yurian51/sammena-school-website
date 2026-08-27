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
  if (!isPublicContent(content.status, content.publishedAt, content.expiresAt, now)) return null
  return { id: content.id, type: content.type, title: content.title, slug: content.slug, excerpt: content.excerpt, body: content.body, publishedAt: content.publishedAt }
}
