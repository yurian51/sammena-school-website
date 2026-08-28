# Sammena SIS — Student Management UX

## Profile layout

### Header
- Student full name
- Admission number
- Current status
- Current class/stream
- Student photo reference when available

### Overview
- Date of birth
- School/campus context
- Enrollment status
- Admission date
- Quick actions according to role

### Tabs
1. Overview
2. Guardians
3. Enrollment
4. Attendance
5. Assessments & Results
6. Fees
7. Documents
8. Activity / Audit

## List view

Provide search by admission number and student name, filtering by status, academic year, class and stream.

The list must be paginated and must not expose records outside the active school scope.

## States

Every screen must support:

- Loading state
- Empty state
- Validation errors
- Permission denied
- Not found
- Recoverable server error

## Sensitive actions

Actions such as archive/withdraw, changing enrollment, editing identity data or accessing sensitive documents require the appropriate role and should be auditable.
