# Admissions PII Minimization

## Public responses
Return only application reference, safe status and timestamps needed for tracking.

## Staff responses
Return only fields required for the current workflow. Keep medical information, private notes and secure document metadata behind explicit authorization.

## Logs
Avoid full learner/guardian payloads, document contents and unnecessary contact details. Prefer reference IDs and structured event codes.

## Storage
Do not store sensitive documents as publicly reachable static assets. Keep database records and object storage access controlled.
