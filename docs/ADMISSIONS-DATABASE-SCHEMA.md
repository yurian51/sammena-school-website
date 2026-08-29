# Admissions Database Schema

Production target: PostgreSQL with transactional writes.

## Core entities

- `admission_applications`: reference, status, submitted_at, academic_year, entry, study_type, guardian_id, learner payload/normalized learner fields
- `admission_reviewers`: staff reviewer assignment
- `admission_review_notes`: private staff notes
- `admission_documents`: document metadata, verification status and secure object key
- `admission_audit_events`: immutable state/action history
- `admission_notifications`: notification events and delivery state

## Integrity

- Unique application reference
- Indexed reference, status, phone and learner search fields
- Foreign keys for reviewer/application relationships
- Transactional status + audit event writes
- No public direct access to applicant tables

The current repository does not yet include a Prisma/PostgreSQL client, so this document is the production target rather than a claim that the database is already deployed.
