# Admissions DB Implementation Status

## Implemented in application code
- Prisma schema target
- PostgreSQL environment contract
- Initial SQL migration
- Application, guardian, document, reviewer, note, audit and notification tables
- Unique application reference
- Core indexes and foreign keys
- Public admission submission route now calls the server-side `AdmissionsService`
- Submission transitions the persisted application from `DRAFT` to `SUBMITTED`
- Public tracking route reads through the same server-side admissions service
- Obsolete in-memory admission store/record/reference modules removed
- Public admission responses exclude learner and guardian profile data

## Still explicitly unverified
- Prisma client generation
- Migration execution against a live database
- Runtime database connectivity in the deployed environment
- Live end-to-end admission submission against PostgreSQL
- Production CI/build, because the current GitHub Actions run is failing at workflow startup before jobs execute

Persistence is **not** called production-ready until the remaining runtime and CI gates are actually observed passing. The application no longer presents the browser-only in-memory submission path as if it were durable storage.
