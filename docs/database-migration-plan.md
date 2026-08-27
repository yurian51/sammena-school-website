# SAMMENA Database Migration Plan

## Phase 1: Core identity

- schools
- users
- roles
- user_roles
- guardians
- students

## Phase 2: Academic structure

- academic_years
- terms
- classes
- streams
- subjects
- enrollments

## Phase 3: Student operations

- attendance_records
- assessments
- results
- student_documents

## Phase 4: Finance

- fee_structures
- student_fee_accounts
- invoices
- payments
- payment_allocations

## Phase 5: Communications and content

- announcements
- news
- events
- resources
- enquiries

## Migration rules

- Use versioned migrations.
- Never edit an applied migration; create a new migration.
- Foreign keys and indexes must be explicit.
- Financial/result history must be append-only or auditable.
- Seed only non-sensitive reference data.
- Production migrations require backup and rollback planning.
- Schema changes must pass CI before deployment.
