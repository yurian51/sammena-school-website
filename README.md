# SAMMENA SCHOOLS Website

Official institutional website foundation for **Sammena Pre & Primary School**, designed to support the school's current primary-school presence and its planned expansion toward a secondary school by 2028.

## Project status

**Active development · Backend foundation phase**

The public website experience is being developed first, followed by secure digital services such as admissions, a Family Hub, CMS and the future Sammena SIS.

> Deployment is intentionally out of scope for the current development phase.

## Vision

Build a modern, trustworthy digital front door for Sammena that can grow from an institutional website into a connected school platform.

```text
Public Website
      ↓
Admissions · CMS · Family Hub
      ↓
Authentication + RBAC
      ↓
SAMMENA SIS
      ↓
Students · Academics · Attendance · Finance · Communications
```

## Current capabilities

- Institutional homepage and navigation
- About and academic information
- School life and resources
- News and events structure
- Academic calendar
- Public academic results archive with source-linked PSLE/SFNA records
- Admissions information and application UX
- Family Hub gateway
- Search and contact experiences
- Responsive/mobile-first design direction
- Accessibility, SEO, privacy and performance quality gates

## Backend foundation

Backend domain work is being organized around:

- Admissions
- CMS
- Identity and RBAC
- Enquiries
- Calendar/events

The current development repository uses typed domain/service/repository boundaries. In-memory repositories are development/test implementations and are **not** a production data store.

## Security principles

- Server-side validation
- Least-privilege RBAC
- Object-level authorization
- Private storage for sensitive documents
- Audit logging for privileged workflows
- No credentials or secrets in source control
- No student/admission records in public assets

## Development

Requirements:

- Node.js 20+
- pnpm 10.15+

Install and run:

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

Quality checks:

```bash
pnpm typecheck
pnpm build
```

## Production execution audit

The current 100-step execution and verification record is maintained in `docs/production-execution-audit.md`. It records completed implementation work, external verification, and the remaining production gates without pretending that unfinished infrastructure is already live.

## Architecture documentation

Key specifications live under `docs/`, including:

- Backend implementation order
- Admissions domain rules and API contract
- CMS schema and domain rules
- SIS core schema
- Authentication/RBAC matrix
- Security baseline
- Document storage policy
- Accessibility quality gate
- Performance budget
- SEO/content strategy
- Analytics events
- Production/backend readiness gates

## Important boundaries

This repository does **not** currently claim that live admissions, authentication, SIS records, payments, private document collection or production deployment are active. Those capabilities must be implemented and verified before activation.

## Branch strategy

Current feature work is developed on:

`feat/sammena-schools-rebrand`

Changes should be verified before merging into `main`.

## License

Private project. All rights reserved unless otherwise specified by the project owner.
