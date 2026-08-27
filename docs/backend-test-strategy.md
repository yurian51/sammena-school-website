# SAMMENA Backend Test Strategy

## Unit tests

Test domain invariants independently:
- admissions status transitions
- application editability
- unique references
- CMS lifecycle transitions
- role permission rules

## Integration tests

Test API + database behavior:
- create application
- submit application
- authorized status lookup
- unauthorized cross-application lookup
- CMS draft visibility
- publish authorization

## Security tests

- authentication required for private endpoints
- object-level authorization
- invalid input rejection
- rate-limit behavior
- private file access controls

## Smoke tests

Critical public routes should render and the admissions UX should remain usable when backend services are unavailable.

## Release rule

Backend features are not considered verified until automated tests pass and the most security-sensitive authorization paths have explicit coverage.
