# Admissions API Contract

## POST /api/admissions/submit

Accepts a validated admission application and returns a server-generated reference, status and submission timestamp.

## GET /api/admissions/applications

Lists application records with optional status filtering. Production access must require authenticated admissions staff authorization.

## GET /api/admissions/applications/:reference

Planned contract for retrieving one application by reference. Sensitive applicant data must never be exposed publicly.

## Review operations

Planned authenticated operations:

- Assign reviewer
- Add internal note
- Request more information
- Accept application
- Reject application
- Verify/reject documents

All state-changing operations must validate the current state, actor permissions and create an audit event.

## Persistence boundary

The current application store is in-memory and is suitable only as a development contract. Production persistence should use a transactional database with unique application references and indexed lookup fields.
