import { randomBytes } from "node:crypto"

/** Generate an opaque applicant-facing reference. Never use database IDs as public references. */
export function generateApplicationReference(): string {
  return `SAM-${new Date().getUTCFullYear()}-${randomBytes(5).toString("hex").toUpperCase()}`
}
