# SAMMENA Live Backend Readiness

## Required before live admissions

- Managed PostgreSQL/Supabase project provisioned
- Environment variables configured outside Git
- Auth provider configured
- RBAC enforced server-side
- Private object storage configured
- Database migrations applied successfully
- Admissions API deployed
- Rate limiting enabled
- Audit logging enabled
- Error monitoring enabled
- Backups configured and restore tested
- Privacy/consent copy approved by the school

## Required before live portal

- Parent/student/staff identity flows tested
- Object-level authorization tested
- Session revocation tested
- MFA available for privileged roles
- No cross-user data leakage in automated tests

## Release principle

A frontend prototype can be deployed publicly, but live collection of student/admission information must remain disabled until the backend readiness checklist is verified.