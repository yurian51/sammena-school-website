# Admissions Observability

Production monitoring should track:

- Submission success/failure rate
- Validation failure rate
- Application lookup latency/errors
- Review queue size by status
- Notification delivery failures
- Document processing failures
- Unauthorized access attempts
- Decision transition failures

Logs should use application references or non-sensitive identifiers where possible and avoid storing full learner/guardian payloads.
