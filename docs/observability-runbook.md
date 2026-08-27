# SAMMENA Observability Runbook

## Signals

Monitor:
- application API error rate
- page/server errors
- authentication failures
- document upload failures
- database connectivity
- latency on critical APIs
- deployment/build failures

## Severity

P0: data exposure, authentication bypass, production outage, destructive data loss.
P1: admissions unavailable, major portal failure, sustained API errors.
P2: non-critical content or UX degradation.
P3: cosmetic or low-impact issue.

## Incident principles

1. Protect users and private data first.
2. Disable or isolate a failing capability if necessary.
3. Preserve relevant logs without exposing sensitive payloads.
4. Identify root cause before declaring recovery.
5. Record corrective action and prevention.

## Recovery

Use deployment rollback or feature isolation where appropriate. Database recovery must follow the approved backup/restore procedure and requires explicit authorization for destructive operations.
