# SAMMENA SIS Service Boundaries

## Purpose

Define application-service responsibilities before connecting the SIS domain to PostgreSQL and HTTP APIs.

## Services

- `SisService`: shared orchestration for core student, guardian and enrollment operations.
- `StudentService`: student reads and school-scoped creation.
- `GuardianService`: guardian lookup, student relationships and primary-contact rules.
- `AcademicYearService`: academic-year lookup and current-year resolution.
- `ClassStreamService`: class and stream lookup/listing.
- `AcademicResultsService`: assessment creation and result persistence with score/publication validation.
- `FinanceService`: fee-account persistence and payment lifecycle orchestration.
- `AttendanceService`: school-scoped attendance recording and student history.

## Boundary rule

Services receive trusted school context and must reject entity writes whose `schoolId` differs from that context.

Repositories remain persistence abstractions. Services own business orchestration and validation; repositories must not become a second business-rule engine.

## API rule

HTTP handlers should remain thin:

request -> authentication/context -> validation -> service -> repository -> response

They must not duplicate enrollment, finance, assessment or tenancy rules.

## Database rule

No service in this layer claims that a production SIS database is already implemented. PostgreSQL adapters are the next integration boundary.
