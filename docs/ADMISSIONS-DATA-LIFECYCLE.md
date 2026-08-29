# Admissions Data Lifecycle

```text
PUBLIC FORM
  → VALIDATE
  → SUBMIT
  → PERSIST
  → REVIEW
  → DECISION
  → NOTIFY
  → ACCEPTED → STUDENT 360
```

## Data boundaries

- Public form: minimum data required to start an application.
- Server validation: normalize and validate before persistence.
- Application record: canonical admission record.
- Review data: restricted staff-only notes, assignments and decisions.
- Documents: private metadata plus secure object storage reference.
- Audit: immutable history of important actions.
- Notifications: delivery events without duplicating unnecessary sensitive data.

## Retention

Retention periods must be approved by school management and aligned with applicable privacy requirements before production launch.
