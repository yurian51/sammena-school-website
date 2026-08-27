# SAMMENA Security Baseline

## Public website

- No secrets in client bundles.
- Validate all user input server-side.
- Use secure headers and a strict Content Security Policy where compatible.
- Keep private documents out of `public/`.
- Rate-limit public forms and lookup endpoints.
- Avoid exposing internal IDs where opaque references are sufficient.
- Log security-relevant events without logging credentials or sensitive payloads.

## Admissions and SIS

- RBAC and least privilege.
- Authenticated access to private records.
- Authorization on every object access.
- Encrypted transport and managed secrets.
- Secure document upload/download with content-type and size controls.
- Audit status changes and privileged actions.
- Backups and recovery procedures.
- Session expiration and revocation.

## Privacy

Collect only information necessary for the stated school workflow. Keep retention rules explicit and avoid sending personal student data to analytics or third-party services without an appropriate privacy basis.

## Release gate

Security findings affecting authentication, authorization, private data, file access or financial/student records are release blockers.
