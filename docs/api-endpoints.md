# SAMMENA API Surface

## Public

- `GET /api/health` - service health contract
- `GET /api/cms` - published public content
- `POST /api/admissions` - create an admissions application

## Protected (planned/being wired)

- `GET /api/admin/admissions/:reference` - staff application lookup
- `PATCH /api/admin/admissions/:reference/status` - staff status transition
- `POST /api/admin/cms/:id/publish` - editorial publishing

Protected endpoints must resolve a verified session, enforce permission and school scope, then execute the domain service. Sensitive mutations must create audit events.
