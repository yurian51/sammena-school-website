# Admissions Submission Idempotency

Public submission should support an idempotency key so network retries do not create duplicate applications.

Production behavior:

1. Client sends a unique idempotency key.
2. Server validates the request.
3. Server checks the key within the same transactional persistence boundary.
4. A new submission is created only once.
5. Retries return the original application reference.
6. Keys must have controlled retention/expiry.

The current implementation is an in-memory development boundary and is not sufficient for multi-instance production deployments.
