# SAMMENA SIS Domain Map

The SIS domain is split into identity, academic, welfare, finance and staffing boundaries while retaining school-level tenancy.

## Identity

- Student: long-lived learner identity.
- Guardian: adult responsible for or associated with a student.
- StudentGuardian: explicit relationship and primary-contact flag.
- Staff: school employee identity.

## Academic

- EducationLevel: Pre-School, Primary, Secondary.
- AcademicYear: annual academic boundary.
- Term: subdivision of an academic year.
- Class: academic grade/form for an academic year.
- Stream: teaching group inside a class.
- Enrollment: student placement for an academic year.
- Subject: teachable academic subject.
- TeachingAssignment: staff-to-subject/class assignment for an academic year.

## Welfare and assessment

- AttendanceRecord: dated attendance event for a student.
- Assessment: defined assessment activity for a subject and term.
- Result: student's score and optional published grade for an assessment.

## Finance

- FeeAccount: student's fee balance for an academic year.
- Payment: financial transaction against a fee account with explicit lifecycle status.

## Boundary rules

- All private operational entities carry or resolve to `schoolId`.
- Student identity is not replaced when academic placement changes.
- Enrollment is the source of truth for class/stream placement by academic year.
- Results and payments are auditable and must not be silently overwritten.
- Secondary uses the same academic entities as Primary.
