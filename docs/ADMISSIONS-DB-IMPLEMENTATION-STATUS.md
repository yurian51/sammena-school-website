# Admissions DB Implementation Status

## Implemented in application code
- Prisma PostgreSQL schema target
- PostgreSQL environment contract via `DATABASE_URL`
- Initial SQL migration
- Follow-up migration for persisted learner fields
- Application, guardian, document, reviewer, note, audit and notification tables
- Unique application reference
- Core indexes and foreign keys
- Runtime PostgreSQL adapter using `pg` and a bounded connection pool
- Explicit database readiness probe through `select 1 as ok`
- Public admission submission route now calls the server-side `AdmissionsService`
- The public admission form now POSTs to `/api/admissions/submit` and uses the server-issued reference
- Server-side affirmative consent is mandatory before an application can be submitted
- Submission transitions the persisted application from `DRAFT` to `SUBMITTED`
- Submission records `submittedAt` when the application first reaches `SUBMITTED`
- Public tracking route reads through the same server-side admissions service
- PostgreSQL repository now targets the Prisma `AdmissionApplication` and `AdmissionGuardian` tables rather than the obsolete `applications` table
- Core persisted admission data now includes academic year, study type, guardian relationship, learner identity, date of birth, entry level and previous school
- Obsolete in-memory admission store/record/reference modules removed
- Public admission responses exclude learner and guardian profile data
- Failed browser submissions retain the local draft and prevent duplicate submits while a request is in flight

## Important current data-model boundary
The public form validates a wider joining-instruction dataset, but the current persistence contract stores only the fields currently modeled by the admissions domain and SQL migration. Relationship, academic year, study type and the core learner fields are now durable. Occupation, guardian nationality, address, home location, physical attributes, religion, tribe, medical/allergy details, distance, preferred start, sibling information and photo readiness are validated at the public boundary but are not yet persisted. The UI must not imply that those extended fields are durably stored until the domain model, access controls and migration support them.

## Still explicitly unverified
- Prisma client generation is not required by the current raw-SQL runtime adapter, but schema validity still needs to be checked by the production migration pipeline
- Migration execution against a live database
- Runtime database connectivity in the deployed environment
- Live end-to-end admission submission against PostgreSQL
- Production CI/build, because the current GitHub Actions integration run is failing at workflow startup before jobs execute
- Render workspace/database selection, because no workspace has been selected for the connected Render tooling

Persistence is **not** called production-ready until the remaining runtime, migration and CI gates are actually observed passing. The browser UI now uses the real submission boundary, server-side consent enforcement and a real PostgreSQL adapter path rather than generating a fake reference locally.
