# SAMMENA Institutional Admin Dashboard

## Purpose

Give authorized school staff one operational workspace for public content and admissions workflows while keeping SIS records in their own protected domain.

## Dashboard areas

1. Overview
2. Admissions
3. Applications
4. Content
5. News & Announcements
6. Events
7. Resources
8. Calendar
9. Enquiries
10. Users & Roles
11. Audit Log
12. System Settings

## Overview widgets

- New applications
- Applications awaiting review
- Upcoming events
- Draft content
- Published announcements
- Open enquiries

Widgets must use live backend data in production. Do not show invented statistics.

## Roles

SUPER_ADMIN
SCHOOL_ADMIN
ADMISSIONS_OFFICER
EDITOR
TEACHER
FINANCE

Each role receives least-privilege permissions. Financial and student records are not exposed to editorial users by default.

## Approval workflow

Content: DRAFT -> REVIEW -> APPROVED -> PUBLISHED
Admissions: SUBMITTED -> UNDER_REVIEW -> ASSESSMENT -> DECISION -> ENROLLED

Every privileged action must be auditable.
