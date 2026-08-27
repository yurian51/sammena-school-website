# SAMMENA Backend Implementation Order

## 1. Database foundation

Create versioned PostgreSQL migrations for school, user, role, guardian and student identity records.

## 2. Authentication

Connect the chosen identity provider. Privileged users require stronger authentication controls. Sessions must be revocable.

## 3. Authorization

Implement server-side RBAC plus object-level authorization before exposing private records.

## 4. Admissions service

Implement draft creation, reference generation, validation, submission, status transitions and secure document workflow.

## 5. CMS service

Implement announcements, news, events and resources with the editorial lifecycle.

## 6. Admin UI

Connect dashboard views to real APIs. Empty states must be explicit; never fabricate operational counts.

## 7. Tests

Unit-test domain rules, integration-test API authorization and workflow transitions, and run end-to-end smoke tests for critical journeys.

## 8. Deployment

Use environment-specific configuration, managed secrets, database backups, health checks and observable deployments.
