# SAMMENA API Error Contract

All server APIs should return a predictable error envelope.

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The submitted information is invalid.",
    "requestId": "..."
  }
}
```

## Standard codes

- VALIDATION_ERROR
- UNAUTHORIZED
- FORBIDDEN
- NOT_FOUND
- CONFLICT
- RATE_LIMITED
- FILE_REJECTED
- SERVICE_UNAVAILABLE
- INTERNAL_ERROR

## Rules

- Never return stack traces in production.
- Never expose database connection details.
- Never echo passwords, tokens or private document contents.
- Use request IDs for support and observability.
- Keep applicant-facing messages understandable while preserving secure internal diagnostics.
