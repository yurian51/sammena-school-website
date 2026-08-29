import type { AdmissionStatus } from "./application-schema"
import { canTransitionAdmissionStatus } from "./application-status"

export type AdmissionDecision = { decision: "ACCEPT" | "REJECT"; reason: string; actorId: string; createdAt: string }

export function validateDecision(currentStatus: AdmissionStatus, decision: AdmissionDecision["decision"], reason: string) {
  if (!reason.trim()) return { ok: false as const, error: "DECISION_REASON_REQUIRED" }
  const target: AdmissionStatus = decision === "ACCEPT" ? "ACCEPTED" : "REJECTED"
  if (!canTransitionAdmissionStatus(currentStatus, target)) return { ok: false as const, error: "INVALID_STATUS_TRANSITION" }
  return { ok: true as const, target }
}
