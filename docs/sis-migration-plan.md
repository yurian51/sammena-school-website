# SAMMENA SIS Migration Plan

## Status

Planning only. No production database migration is claimed or executed by this document.

## Migration order

1. `schools`
2. `campuses`
3. `education_levels`
4. `academic_years`
5. `terms`
6. `classes`
7. `streams`
8. `students`
9. `enrollments`
10. guardians and student-guardian relationships
11. subjects and teaching assignments
12. attendance, assessments and results
13. fee accounts and payments

## Safety gates

Before applying any migration:

- Verify the actual database provider and connection configuration.
- Inspect existing tables and constraints.
- Check whether any existing data must be migrated into `schools`.
- Back up production data.
- Apply migrations in a non-production environment first.
- Run schema and application integration tests.
- Require explicit approval before production/destructive operations.

## Tenant constraints

All tenant-owned records must carry or resolve to `school_id`. Application repositories must include school scope in reads and writes.

## Rollback

Each migration must have a documented rollback or recovery procedure. Destructive changes must not be bundled with the initial SIS foundation migration.
