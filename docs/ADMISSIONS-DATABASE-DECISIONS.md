# Admissions Database Decisions

1. Application reference is unique and indexed.
2. Application lifecycle status is controlled by the domain state machine.
3. Status changes and audit events must commit atomically.
4. Reviewer assignments reference authorized staff identities.
5. Review notes are private and never returned from public tracking endpoints.
6. Document binaries are stored outside the application database; database stores metadata/object keys.
7. Notification records store delivery state and event type, not unnecessary applicant payloads.
8. Accepted applications link into Student 360 without deleting the original admission record.
