# Admissions Security Model

## Roles

- Applicant/Guardian: create and view only their own application through an authenticated tracking mechanism.
- Admissions Officer: review assigned/authorized applications and add internal notes.
- Admissions Manager: review, assign and make authorized admission decisions.
- System Administrator: infrastructure/configuration access, not automatic access to learner data.

## Rules

1. Never trust client-provided role or application ownership.
2. Authorize every application read and state-changing operation server-side.
3. Do not put sensitive applicant records in localStorage.
4. Store document files outside the public web root/object bucket and use controlled access URLs.
5. Rate-limit public submission and lookup endpoints.
6. Log security-relevant access and decisions without logging unnecessary sensitive payloads.
7. Validate state transitions against the current persisted state.
