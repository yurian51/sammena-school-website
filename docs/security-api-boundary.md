# SAMMENA Protected API Boundary

## Request flow

`Request -> SessionProvider -> AuthContext -> Permission -> Service -> Repository -> Audit`

## Protected admissions operations

- Reading an application requires `admissions:read`.
- Updating an application requires `admissions:write` or `admissions:review` depending on the operation.
- A missing session returns `UNAUTHORIZED`.
- An authenticated user without the required permission returns `FORBIDDEN`.

## Important limitation

The session provider is intentionally an abstraction. No production identity provider is claimed until a real provider is configured and its token/session verification is tested.

## School isolation

`schoolId` is part of the authentication context. Future repository queries must scope private records to the authenticated school and must never rely on a client-supplied school ID alone.
