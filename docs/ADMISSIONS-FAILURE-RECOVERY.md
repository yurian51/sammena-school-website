# Admissions Failure Recovery

Production operations should define recovery for:

- Database unavailable
- Notification provider unavailable
- Document upload failure
- Duplicate submission retry
- Partial review failure
- Invalid state transition

Rules:

- Never acknowledge a submission as persisted until the persistence transaction succeeds.
- Never send a decision notification before the decision is durably recorded.
- Retry transient notification failures safely.
- Preserve audit history during recovery.
- Surface actionable errors without exposing internal implementation details.
