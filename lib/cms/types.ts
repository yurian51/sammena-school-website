export const CONTENT_STATUSES = ["DRAFT", "REVIEW", "APPROVED", "PUBLISHED", "ARCHIVED"] as const
export type ContentStatus = (typeof CONTENT_STATUSES)[number]
export type CmsContentStatus = ContentStatus

type CmsBase = {
  id: string
  title: string
  slug: string
  status: ContentStatus
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export type NewsItem = CmsBase & {
  type: "NEWS"
  excerpt: string
  body: string
  category: string
}

export type Announcement = CmsBase & {
  type: "ANNOUNCEMENT"
  summary: string
  expiresAt?: string
  priority: "NORMAL" | "IMPORTANT"
}

export type CmsContent = NewsItem | Announcement
