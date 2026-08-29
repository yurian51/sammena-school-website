# Admissions API Security Checklist

Before production:

- [ ] Authenticate staff routes
- [ ] Authorize by role and application scope
- [ ] Rate-limit public submission and tracking
- [ ] Validate and normalize every payload server-side
- [ ] Prevent enumeration of application references
- [ ] Avoid returning unnecessary PII
- [ ] Use secure document URLs with expiry/access control
- [ ] Record security-relevant audit events
- [ ] Enforce valid status transitions against persisted state
- [ ] Add CSRF/origin protections where applicable
- [ ] Add structured error handling without internal leakage
- [ ] Verify all controls in automated tests
