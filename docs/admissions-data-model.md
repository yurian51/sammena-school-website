# Sammena Admissions Data Model

## Application

- application_id
- reference_number
- status
- submitted_at
- reviewed_at
- created_at
- updated_at

## Guardian

- guardian_id
- full_name
- phone
- email
- relationship
- consent_at

## Learner

- learner_id
- full_name
- date_of_birth
- requested_entry_level
- previous_school

## Documents

- document_id
- application_id
- document_type
- storage_key
- verification_status
- uploaded_at

## Workflow statuses

DRAFT -> SUBMITTED -> UNDER_REVIEW -> ASSESSMENT -> DECISION -> ACCEPTED / WAITLISTED / DECLINED -> ENROLLED

## Rules

- Never store sensitive documents in public website assets.
- Every submitted application receives a unique reference number.
- Status transitions should be audited.
- Staff access must be role-restricted.
- Parent-facing status must expose only approved information.
- Payment and enrollment should be separate workflow steps.

This is an architecture specification only. It does not claim that the live backend exists.
