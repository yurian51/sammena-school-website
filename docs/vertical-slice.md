# SAMMENA Protected Workflow Vertical Slice

The first protected operational slice is:

`Request -> Session -> AuthContext -> Permission -> School Scope -> Service -> Repository -> Audit -> Response`

## Admissions

- Applicant-facing creation remains public and validated.
- Staff application access requires authentication and `admissions:read`.
- Staff status changes require the appropriate admissions permission.
- School-scoped private access must be enforced server-side.

## CMS

- Public reads expose only publishable content.
- Editorial operations require authentication and explicit CMS permissions.
- Publishing must produce an audit event.

## Verification boundary

These contracts are implemented as code boundaries. Real identity-provider/session verification and database integration still require environment configuration and automated test execution.
