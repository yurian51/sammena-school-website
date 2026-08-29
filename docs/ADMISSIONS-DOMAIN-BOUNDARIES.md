# Admissions Domain Boundaries

## Application
Owns canonical applicant submission data and lifecycle status.

## Review
Owns reviewer assignment, private notes and decision validation.

## Documents
Owns document metadata and verification state. Binary files belong in secure object storage.

## Notifications
Owns notification events and delivery state, not admission decisions.

## Analytics
Consumes application events/records and must not become the source of truth.

## Student 360
Consumes accepted applications and creates/links the canonical student record. Admission records remain auditable historical records.
