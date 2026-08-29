# Sammena Admissions Workflow

## Application lifecycle

`DRAFT → SUBMITTED → UNDER_REVIEW → ACCEPTED / REJECTED / MORE_INFORMATION`

## Reference

Candidate format: `SAM-YYYY-XXXXXX`.

The current public application UI generates a browser-session reference only. It is not a persistent database identifier until the admissions backend is connected.

## Staff review model

A future admissions workspace should provide:

- Search by application reference, learner name, guardian and phone
- Filters by status, entry level and preferred start date
- Applicant detail view
- Document completeness indicator
- Duplicate detection indicator
- Reviewer assignment
- Internal notes
- Request-more-information action
- Accept / reject decision with reason
- Decision audit trail
- Applicant notification event

## Production rules

1. Never expose private learner records on the public website.
2. Server-side validation is mandatory.
3. Application references must be generated and persisted server-side.
4. Admission decisions require authenticated staff authorization.
5. Sensitive actions must be audited.
6. Personal data retention and deletion rules must be defined before production launch.
