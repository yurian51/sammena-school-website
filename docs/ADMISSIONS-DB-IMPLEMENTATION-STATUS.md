# Admissions DB Implementation Status

## Implemented in application code
- Prisma schema target
- PostgreSQL environment contract
- Initial SQL migration
- Application, guardian, document, reviewer, note, audit and notification tables
- Unique application reference
- Core indexes and foreign keys
- Public admission submission route now calls the server-side `AdmissionsService`
- The public admission form now POSTs to `/api/admissions/submit` and uses the server-issued reference
- Submission transitions the persisted application from `DRAFT` to `SUBMITTED`
- Public tracking route reads through the same server-side admissions service
- Obsolete in-memory admission store/record/reference modules removed
- Public admission responses exclude learner and guardian profile data
- Failed browser submissions retain the local draft and prevent duplicate submits while a request is in flight

## Important current data-model boundary
The public form validates a wider joining-instruction dataset, but the current `AdmissionsService.createDraft` contract persists only the core guardian and learner fields exposed by that domain service: guardian name/phone/email and learner name/date of birth/entry level/previous school. Relationship, occupation, address, wellbeing fields, placement preferences and other extended fields are not yet persisted by the current service contract. The UI must not imply that those fields are durably stored until the domain model and migration support them.

## Still explicitly unverified
- Prisma client generation
- Migration execution against a live database
- Runtime database connectivity in the deployed environment
- Live end-to-end admission submission against PostgreSQL
- Production CI/build, because the current GitHub Actions run is failing at workflow startup before jobs execute

Persistence is **not** called production-ready until the remaining runtime and CI gates are actually observed passing. The browser UI now uses the real submission boundary rather than generating a fake reference locally, but the deployed database adapter remains an explicit infrastructure gate.
