# Admissions State Machine

Allowed lifecycle:

```text
DRAFT → SUBMITTED → UNDER_REVIEW
                         ├→ MORE_INFORMATION → SUBMITTED
                         ├→ ACCEPTED
                         └→ REJECTED
```

Rules:
- State changes must be validated against the persisted current state.
- Decision transitions require an authorized actor and reason.
- Every state-changing operation must produce an audit event in the same transaction in production.
- Public tracking exposes only the safe status projection.
