import type { ContentStatus } from "./types"

/** Public content must be explicitly published. */
export function isPublicContent(status: ContentStatus): boolean {
  return status === "PUBLISHED"
}

export function canPublish(role: string): boolean {
  return ["SUPER_ADMIN", "SCHOOL_ADMIN", "EDITOR"].includes(role)
}
