# SAMMENA Database Contract

The application talks to persistence through typed repository/client boundaries.

## Rules

- SQL parameters must be bound values, never string-concatenated user input.
- Database rows are mapped to domain models through explicit mappers.
- API/domain code must not depend on raw database column names.
- Migrations are the source of truth for schema changes.
- Public CMS queries must enforce publication status and time-window rules.
- Application references are unique and must be treated as opaque identifiers.
- Audit events are written for security-sensitive state changes.

Deployment remains out of scope for this phase.
