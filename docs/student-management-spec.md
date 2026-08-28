# Sammena SIS — Student Management Specification

## Goal

Provide one canonical student record that can be referenced by admissions, guardians, enrollment, attendance, academics, finance and reporting.

## Student identity

Required fields:

- `id`
- `schoolId`
- `admissionNumber`
- `firstName`
- `lastName`
- `dateOfBirth`
- `gender`
- `status`
- `createdAt`
- `updatedAt`

Optional fields can include middle name, nationality, address, photo reference and emergency information.

## Lifecycle

`APPLICANT → ADMITTED → ACTIVE → INACTIVE → GRADUATED`

Cancellation/withdrawal must be represented explicitly and must not silently delete the student record.

## Integrity rules

1. Admission number must be unique within a school.
2. Student reads and writes must be school-scoped.
3. Student deletion should be soft-delete/archive only after policy approval.
4. A student cannot have two active enrollments for the same academic year unless an explicit transfer/re-enrollment policy permits it.
5. Sensitive student documents must never be exposed through public assets.
6. Privileged changes must generate audit events.

## Relationships

```text
Student
 ├── Guardians
 ├── Enrollments
 ├── Attendance
 ├── Assessments / Results
 ├── Fee Account
 └── Documents
```

## UI requirements

The student profile should provide:

- Overview
- Academic status
- Guardian contacts
- Current class/stream
- Attendance summary
- Results summary
- Fee balance summary
- Documents
- Audit/history where permitted

The implementation must include loading, empty, validation and error states.
