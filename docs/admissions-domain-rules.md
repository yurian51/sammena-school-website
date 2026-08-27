# SAMMENA Admissions Domain Rules

## Application rules

- A new application starts as DRAFT.
- Every application receives a unique opaque reference.
- Required guardian and learner fields must be validated server-side.
- Only a draft can be edited by the applicant.
- Submission changes DRAFT to SUBMITTED.
- Staff workflow controls later status transitions.
- Applicant-facing status must be a safe projection of the internal state.

## Integrity

- One application must not be readable by another applicant.
- Duplicate submissions should be detectable without silently overwriting data.
- Status transitions should be audited.
- Financial and enrollment actions are separate domains.

## Privacy

Collect only information required by the school's approved admissions process. Document requirements and retention must be approved before live collection.
