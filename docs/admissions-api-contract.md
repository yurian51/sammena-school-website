# SAMMENA Admissions API Contract

## Endpoints

`POST /api/admissions/applications`

Creates a draft application and returns an application reference.

`GET /api/admissions/applications/:reference`

Returns the parent-visible status for an authenticated applicant.

`PATCH /api/admissions/applications/:reference`

Updates an eligible draft application.

`POST /api/admissions/applications/:reference/submit`

Submits a completed application for review.

`POST /api/admissions/applications/:reference/documents`

Requests an authorized upload URL for a required document.

## Statuses

DRAFT, SUBMITTED, UNDER_REVIEW, ASSESSMENT, DECISION, ACCEPTED, WAITLISTED, DECLINED, ENROLLED

## Security

- Validate all input server-side.
- Authenticate applicant-facing status access.
- Authorize every application and document access.
- Never accept arbitrary storage paths from clients.
- Rate-limit public creation and lookup endpoints.
- Audit status changes and staff actions.
- Do not expose internal review notes to applicants.

## API response principle

Return stable machine-readable error codes, human-readable messages and a correlation/request ID. Avoid leaking database errors or sensitive operational details.
