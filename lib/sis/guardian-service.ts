import { GuardianRelationship } from "./supporting-types"

export function assertGuardianRelationship(relationship: GuardianRelationship): void {
  if (!["PARENT", "GUARDIAN", "SPONSOR", "OTHER"].includes(relationship)) {
    throw new Error("INVALID_GUARDIAN_RELATIONSHIP")
  }
}

export function assertPrimaryGuardianCount(primaryCount: number): void {
  if (!Number.isInteger(primaryCount) || primaryCount < 0 || primaryCount > 1) {
    throw new Error("INVALID_PRIMARY_GUARDIAN_COUNT")
  }
}
