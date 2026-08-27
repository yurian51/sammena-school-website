export const CONTENT_STATUSES = ["DRAFT", "REVIEW", "APPROVED", "PUBLISHED", "ARCHIVED"] as const
export type ContentStatus = (typeof CONTENT_STATUSES)[number]

export type NewsItem = {
  id: string
  title: string
  slug: string
  excerpt: string
  body: string
  category: string
  publishedAt?: string
  status: ContentStatus
}

export type Announcement = {
  id: string
  title: string
  summary: string
  publishedAt?: string
  expiresAt?: string
  priority: "NORMAL" | "IMPORTANT"
  status: ContentStatus
}
