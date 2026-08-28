# SAMMENA SIS Domain Model

## Canonical model

```text
School
  -> Campus
  -> EducationLevel
  -> AcademicYear
       -> Term
       -> Class
            -> Stream
                 -> Enrollment
                      -> Student
```

## Supporting domains

```text
Student -> Guardian
Student -> AttendanceRecord
Student -> Assessment -> Result
Student -> FeeAccount -> Payment
Staff -> TeachingAssignment -> Class/Subject
```

## Identity rules

- Student is the long-lived learner identity.
- Enrollment represents placement for an academic year.
- Class and stream placement must not overwrite historical enrollment records.
- Guardian relationships belong to the student relationship model, not to an enrollment.
- Staff identity is independent from teaching assignments.

## Academic boundaries

Every academic record must resolve to a school. Where applicable it must also resolve to a campus and academic year. Terms belong to an academic year. Classes belong to an education level and academic year. Streams belong to a class.

## Education levels

The initial model supports:

- Pre-School
- Primary
- Secondary

Additional levels must be data/configuration additions, not separate student models.

## Enrollment lifecycle

Recommended lifecycle states:

- pending
- active
- promoted
- repeated
- transferred
- withdrawn
- graduated
- cancelled

A transition must preserve the previous enrollment history. Promotion is represented by a new enrollment in the next academic placement.

## Tenancy and authorization

School is the top-level tenant boundary. Server-side authorization must derive the effective school from trusted identity/context. Client-provided school IDs are untrusted input.

For tenant-owned reads, updates and deletes, repositories must include school scope in the query/mutation itself.

## Secondary 2028

Secondary Form 1 and subsequent forms use the same Class/Stream/Enrollment model as Primary. No secondary-specific copy of Student or Guardian entities should be created.

## Financial and result integrity

Financial transactions and published academic results require auditability and should not be silently overwritten. Corrections should use explicit correction/reversal workflows where appropriate.

## Implementation status

This is the canonical domain planning model. It is not a claim that every entity has already been implemented in the production database or backend.
