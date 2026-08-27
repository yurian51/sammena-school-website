import type { AuthContext } from "../auth/authorization"
import { PostgresAuditRepository } from "../db/repositories/audit-postgres"
import { AuditService } from "../audit/service"

const audit = new AuditService(new PostgresAuditRepository())

export async function auditAction(context: AuthContext, action: string, entityType: string, entityId: string | undefined, requestId: string) {
  await audit.record({ actorUserId: context.userId, action, entityType, entityId, requestId })
}
