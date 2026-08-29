# Admissions Data Architecture

## Core entities

- Application: the admission request and lifecycle state.
- Applicant: learner identity and placement information.
- Guardian: responsible adult and communication details.
- Document: evidence attached to an application.
- Review: staff review assignment, notes and decision.
- Audit Event: immutable record of important application actions.

## Application lifecycle

`DRAFT → SUBMITTED → UNDER_REVIEW → MORE_INFORMATION → SUBMITTED`

or from `UNDER_REVIEW`:

`ACCEPTED` / `REJECTED`

## Duplicate signals

Use multiple signals rather than a single exact match:

- Normalized learner name
- Date of birth
- Normalized guardian phone

A likely duplicate must be flagged for staff review, not automatically rejected.

## Persistence requirement

The current public UI and validation API are not a production database. Persistent storage must be added before accepting live applications. The database layer must enforce uniqueness and access control server-side.

## Student conversion

An accepted application should become a Student 360 enrollment through a controlled conversion action, preserving the original application reference and audit history.
