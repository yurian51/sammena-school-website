# SAMMENA Document Storage Policy

## Private by default

Admissions documents and student records must never be committed to Git, placed in `public/`, or exposed through predictable public URLs.

## Upload flow

Client -> authenticated API -> validation -> private object storage -> metadata record

## Validation

- allowlist expected document types
- enforce file size limits
- verify MIME/type where practical
- generate server-side storage keys
- reject executable content
- scan uploaded files when the chosen infrastructure supports malware scanning

## Download flow

Authenticated request -> object-level authorization -> short-lived signed URL or streamed response -> audit event

## Retention

Retention periods must be defined by school policy and applicable requirements before production use. Deletion must be controlled and auditable.
