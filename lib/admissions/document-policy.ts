import type { DocumentStatus } from "./document-status"

const transitions: Record<DocumentStatus, DocumentStatus[]> = {
  MISSING: ["PENDING_REVIEW"],
  PENDING_REVIEW: ["VERIFIED", "REJECTED"],
  VERIFIED: [],
  REJECTED: ["PENDING_REVIEW"],
}

export function canTransitionDocumentStatus(from: DocumentStatus, to: DocumentStatus) {
  return transitions[from]?.includes(to) ?? false
}
