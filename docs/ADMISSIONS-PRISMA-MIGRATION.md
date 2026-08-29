# Admissions Persistence Migration Plan

The repository currently has no Prisma/PostgreSQL dependency in `package.json`. This document defines the next safe migration without claiming that a database has already been installed.

## Target models

1. AdmissionApplication
2. AdmissionGuardian
3. AdmissionDocument
4. AdmissionReviewerAssignment
5. AdmissionReviewNote
6. AdmissionAuditEvent
7. AdmissionNotification

## Required constraints

- Unique application reference
- Indexed status and reference
- Indexed guardian phone
- Transactional application status + audit event
- Foreign keys for child records
- Timestamps for created/updated records

## Migration sequence

1. Add Prisma dependency and initialize configuration.
2. Create schema and environment contract.
3. Generate migration.
4. Implement repository adapter.
5. Switch API routes to repository adapter.
6. Keep development adapter available for isolated tests.
7. Run typecheck, tests and production build.
8. Verify migration against a disposable database before production.
