# SAMMENA SIS Core Schema

## Core entities

- Student
- Guardian
- Staff
- Class
- AcademicYear
- Subject
- Enrollment
- AttendanceRecord
- Assessment
- Result
- FeeAccount
- Payment
- Announcement

## Relationships

Guardian -> Student (one-to-many)
Student -> Enrollment (one-to-many)
Enrollment -> Class (many-to-one)
Class -> Subject (many-to-many through teaching assignment)
Student -> AttendanceRecord (one-to-many)
Student -> Assessment/Result (one-to-many)
Student -> FeeAccount (one-to-one per billing context)
FeeAccount -> Payment (one-to-many)

## Design principles

- PostgreSQL-compatible relational model.
- UUID primary keys for externally exposed entities.
- Created/updated timestamps on mutable records.
- Soft deletion only where operationally appropriate.
- Immutable/audited financial and result records.
- Role-based access control.
- Tenant/school boundary ready for future multi-campus expansion.

This is a planning schema and does not claim a live SIS backend exists.
