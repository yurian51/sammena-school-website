# SAMMENA Backend Foundation

Deployment is intentionally out of scope for this phase.

## Architecture boundary

Public Next.js website -> server API layer -> PostgreSQL/Supabase -> private storage.

## First backend domains

1. Admissions
2. CMS
3. Identity/RBAC
4. Enquiries
5. Calendar/events

## Non-goals for this phase

- Production deployment
- Live payment collection
- Live student portal
- Live student records
- Real admissions document collection

## Implementation rule

Build and test backend contracts locally/CI first. Production activation happens only after security, privacy, backup and operational checks are verified.
