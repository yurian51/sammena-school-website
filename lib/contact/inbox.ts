import { validateContactForm, type ContactFormInput } from "@/lib/contact-validation"

export const INBOX_STATUSES = ["NEW", "IN_PROGRESS", "RESOLVED"] as const
export type InboxStatus = (typeof INBOX_STATUSES)[number]

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function isInboxStatus(value: unknown): value is InboxStatus {
  return typeof value === "string" && (INBOX_STATUSES as readonly string[]).includes(value)
}

export function isUuid(value: string): boolean {
  return UUID_PATTERN.test(value)
}

/** Validates a public contact submission; returns normalized values or a user-facing error. */
export function parseContactSubmission(body: unknown): { valid: true; value: ContactFormInput } | { valid: false; error: string } {
  if (!body || typeof body !== "object") return { valid: false, error: "Please check your contact details and try again." }
  const record = body as Record<string, unknown>
  const input: ContactFormInput = {
    name: typeof record.name === "string" ? record.name : "",
    email: typeof record.email === "string" ? record.email : "",
    phone: typeof record.phone === "string" ? record.phone : "",
    subject: typeof record.subject === "string" ? record.subject : "",
    message: typeof record.message === "string" ? record.message : "",
  }
  return validateContactForm(input)
}

/** Validates an admin status change request. */
export function parseStatusUpdate(body: unknown): { valid: true; status: InboxStatus } | { valid: false; error: string } {
  if (!body || typeof body !== "object") return { valid: false, error: "A valid status is required." }
  const status = (body as Record<string, unknown>).status
  if (!isInboxStatus(status)) return { valid: false, error: "A valid status is required." }
  return { valid: true, status }
}

/** Parses the optional status filter from the admin list query string. */
export function parseStatusFilter(value: string | null): InboxStatus | undefined {
  if (value === null || value === "") return undefined
  return isInboxStatus(value) ? value : undefined
}
