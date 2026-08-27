# SAMMENA Authentication Boundary

Authentication is intentionally separated from authorization.

## Request flow

Request -> identity provider/session -> AuthContext -> permission guard -> service -> repository.

## Rules

- Never trust a client-provided role.
- User identity must come from a verified session/token.
- Private endpoints require authentication.
- Staff actions require explicit permissions.
- School-scoped records must be checked against the authenticated school context.
- Parent/student access must be object-scoped, not merely role-scoped.
- Privileged roles should support MFA.

The current code defines the contract only. A real identity provider integration is not claimed until configured and tested.
