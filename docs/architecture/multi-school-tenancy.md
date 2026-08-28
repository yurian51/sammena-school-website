# Multi-School Tenancy Architecture

SAMMENA is designed to grow from the current Pre & Primary School into a Schools platform that can support Secondary from 2028 and additional campuses/programmes later.

## Principle

Every authenticated, school-scoped operation must resolve a trusted `schoolId` from the server-side session/context. Client-provided school identifiers must never be trusted for authorization.

## Target relationship

`schools` is the tenant root. School-owned records should reference `schools.id` through `school_id`.

Expected school-scoped domains include:

- admissions
- students
- guardians/parents
- teachers/staff
- classes/streams
- attendance
- examinations/results
- fees/payments
- inventory
- CMS content
- audit events

## Query rule

Repository methods that access school-owned records should accept a trusted school scope and enforce it in SQL, for example:

`WHERE school_id = $1`

For updates/deletes, the school predicate must be part of the mutation query itself rather than a separate pre-check.

## Public content

Public CMS content may be readable without authentication, but published content must still be scoped to its owning school when multiple schools/campuses are supported.

## Security rule

A user must not be able to change their effective `schoolId` by submitting a different school identifier in request JSON, query parameters, or route parameters.

## Migration rule

Do not add `school_id` columns to TypeScript types until the authoritative database schema/migrations have been identified. Schema, row types, repositories, mappers, and API contracts must be changed as one coherent migration.

## 2028 readiness

The website should remain a single SAMMENA Schools experience while the information architecture can distinguish educational levels such as Pre-School, Primary and Secondary without requiring a future rewrite of tenant boundaries.
