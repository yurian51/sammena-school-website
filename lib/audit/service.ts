import type { AuditEventInput, PostgresAuditRepository } from "../db/repositories/audit-postgres"

export class AuditService {
  constructor(private readonly repository: PostgresAuditRepository) {}

  async record(event: AuditEventInput) {
    return this.repository.record(event)
  }
}
