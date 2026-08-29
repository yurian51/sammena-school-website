# Admissions Production Readiness

## Implemented foundations
- Application validation schema
- Submission API
- In-memory application store
- Application lookup API
- Search/filter services
- Status transition model
- Reviewer assignment model
- Review notes model
- Document readiness model
- Notification event model
- Audit event architecture

## Required before production
- PostgreSQL persistence
- Authentication and role-based authorization
- Transactional status changes
- Secure document/object storage
- Rate limiting and abuse protection
- Server-side duplicate detection
- PII access logging
- Data retention/deletion policy
- Email/SMS provider integration
- Automated tests executed in CI
- Production build verification
- Error monitoring and backups

No prototype endpoint should be treated as production-safe until these controls are implemented and verified.
