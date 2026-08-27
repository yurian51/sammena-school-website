import { getDbClient } from "../client"

export interface AuditEventInput {
  actorUserId?: string
  action: string
  entityType: string
  entityId?: string
  requestId?: string
}

export class PostgresAuditRepository {
  async record(event: AuditEventInput): Promise<void> {
    await getDbClient().query(
      `insert into audit_events (actor_user_id, action, entity_type, entity_id, request_id)
       values ($1,$2,$3,$4,$5)`,
      [event.actorUserId ?? null, event.action, event.entityType, event.entityId ?? null, event.requestId ?? null],
    )
  }
}
