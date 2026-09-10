<div align="center">

# SAMMENA SCHOOLS

### SAMMENA DIGITAL SCHOOL

**Website · Admissions · Connect · School Core · SAMMENA SIS**

<br>

![Status](https://img.shields.io/badge/STATUS-ACTIVE%20DEVELOPMENT-111111?style=for-the-badge)

> **One connected digital experience for school, family and student.**

</div>

---

# 01 — DIGITAL SCHOOL MODEL

```text
SAMMENA DIGITAL SCHOOL
             │
    ┌────────┼────────┐
    │        │        │
 DISCOVER   APPLY   CONNECT
    │        │        │
 Website  Admissions Parent Hub
    │        │        │
    └────────┼────────┘
             ▼
        SCHOOL CORE
             │
    ┌────────┼────────┐
    ▼        ▼        ▼
 Students  Staff  Academics
    │        │        │
    └────────┼────────┘
             ▼
         SAMMENA SIS
```

This architecture is now committed as `data/digital-school-architecture.json`. It defines the boundary between the public website, admissions, family experience, operational school core and the future SIS. fileciteturn154file0

---

# 02 — DISCOVER

The public website is the digital front door.

- School identity and institutional information
- Academics and school life
- Admissions information
- Academic results with source provenance
- News and events
- Calendar
- Resources
- Search
- Contact and location

Public pages must distinguish verified institutional facts from content that is still being built. Empty is better than invented. Humanity has enough websites confidently displaying nonsense.

---

# 03 — APPLY

Admissions is a controlled workflow rather than a decorative form.

```text
APPLICATION
    ↓
VALIDATE
    ↓
NORMALIZE
    ↓
CONSENT
    ↓
ELIGIBILITY
    ↓
REVIEW QUEUE
    ↓
DECISION
  ↙     ↘
ACCEPT  REJECT
  ↓
AUDIT
  ↓
NOTIFICATION
  ↓
STUDENT 360
```

The target domain preserves the application as an applicant record before an accepted applicant becomes a student.

---

# 04 — CONNECT

The Parent Hub is the family-facing connection layer.

```text
PARENT ACCOUNT
      │
      ▼
AUTHENTICATION
      │
      ▼
AUTHORIZATION
      │
      ▼
STUDENT RELATIONSHIP
      │
 ┌────┼───────────┐
 ▼    ▼           ▼
Fees Attendance Academics
      │
      ▼
Communication
```

A parent must see only students and records they are authorized to access. Public website data and private SIS data remain separate boundaries.

---

# 05 — SCHOOL CORE

The operational core groups the entities that make the school function:

| Domain | Core entities |
|---|---|
| Students | Student, Guardian, Enrollment, Class placement |
| Staff | Staff, Role, Assignment |
| Academics | Academic year, Class, Subject, Assessment |
| Attendance | Attendance record, status, reason |
| Fees | Invoice, payment, balance |
| Documents | Metadata, ownership, access policy |
| Communication | Announcement, message, notification |
| Governance | Audit event, permissions, consent |

These are domain boundaries, not a claim that every backend module is already production-complete.

---

# 06 — SAMMENA SIS

The SIS becomes the system of record for private school operations.

```text
                    SAMMENA SIS
                         │
       ┌─────────────────┼─────────────────┐
       ▼                 ▼                 ▼
   STUDENTS            STAFF            ACADEMICS
       │                 │                 │
       ├── Guardians     ├── Roles         ├── Classes
       ├── Enrollment    ├── Assignments   ├── Subjects
       └── Documents     └── Access        └── Assessments
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
          ATTENDANCE    FEES     REPORTING
                         │
                         ▼
                    AUDIT TRAIL
```

The SIS must enforce RBAC, object-level access checks, auditability and PII minimization at the server boundary.

---

# 07 — RESULTS TRUST

The academic results archive currently exposes verified school-level records separately from secondary published summaries. The data registry records historical archive searches without turning a failed search into a false statement that an examination never existed. fileciteturn147file0

Current school-level verification includes PSLE 2022–2024 and SFNA 2024. PSLE 2025 remains explicitly secondary while retaining the official NECTA district-index path. fileciteturn154file0

---

# 08 — SECURITY MODEL

```text
INPUT
 ↓
VALIDATION
 ↓
CONSENT
 ↓
AUTHENTICATION
 ↓
AUTHORIZATION
 ↓
OBJECT ACCESS CHECK
 ↓
STATE VALIDATION
 ↓
TRANSACTION
 ↓
AUDIT EVENT
 ↓
CONTROLLED RESPONSE
```

Rules:

- Never expose private student records through public routes.
- Never trust client-side authorization.
- Minimize stored PII.
- Protect uploaded documents.
- Make sensitive mutations attributable to an authenticated actor.
- Use idempotency for retryable submissions.
- Keep secrets out of source control.
- Treat audit events as part of the domain, not an afterthought.

---

# 09 — ENGINEERING BOUNDARY

```text
PUBLIC UI / PARENT UI / ADMIN UI
              ↓
       APPLICATION SERVICES
              ↓
           DOMAIN
              ↓
      REPOSITORY INTERFACE
              ↓
       POSTGRESQL / PRISMA
```

The public website is not the database. The database is not the authorization layer. And a pretty dashboard is not a security policy, despite what certain software companies appear to believe.

---

# 10 — CURRENT IMPLEMENTATION TRUTH

```text
PUBLIC WEBSITE       ████████████████████  ACTIVE
ACADEMIC RESULTS     ████████████████████  ACTIVE
RESULTS TRUST        ███████████████████░  HARDENED
ADMISSIONS           █████████████████░░░  ACTIVE
DOMAIN FOUNDATION    █████████████████░░░  ACTIVE
PERSISTENCE          █████████░░░░░░░░░░░  BUILDING
AUTH + RBAC          ██████░░░░░░░░░░░░░░  BUILDING
PARENT HUB           █████░░░░░░░░░░░░░░░  FOUNDATION
SCHOOL CORE          ████░░░░░░░░░░░░░░░░  FOUNDATION
SAMMENA SIS          ███░░░░░░░░░░░░░░░░░  FOUNDATION
PRODUCTION           ░░░░░░░░░░░░░░░░░░░░  NOT CLAIMED
```

**Truth rule:** designed, implemented, verified and deployed are four different states.

---

# 11 — QUALITY GATES

```text
CODE
 ↓
TYPECHECK
 ↓
UNIT TESTS
 ↓
DATA INTEGRITY
 ↓
INTEGRATION TESTS
 ↓
DATABASE MIGRATION TEST
 ↓
PRODUCTION BUILD
 ↓
SECURITY REVIEW
 ↓
DEPLOYMENT VERIFICATION
```

Current academic validation includes candidate counts, averages, grades, provenance, URL safety, pass-rate arithmetic, duplicate detection and historical archive-audit invariants. fileciteturn149file0

GitHub Actions has a dedicated quality workflow, but a completed green run must not be claimed until GitHub actually reports one for the current commit.

---

# 12 — REPOSITORY STRUCTURE DIRECTION

```text
app/
├── admissions/
├── academics/
├── results/
├── trust/
├── parent/
└── admin/

lib/
├── academic-results.ts
├── admissions/
├── auth/
├── domain/
└── security/

data/
├── results-sources.json
└── digital-school-architecture.json

docs/
└── domain, security and operational contracts
```

The exact route/module set must follow the code that is actually committed, not an imagined architecture diagram.

---

# 13 — DEVELOPMENT RULES

1. Build real domain boundaries before adding decorative complexity.
2. Every public fact needs a trustworthy source or an explicit state.
3. Every private record needs authorization.
4. Every important state transition needs validation and auditability.
5. Every external integration gets a failure path.
6. Every migration gets a verification path.
7. Every production claim requires evidence.
8. Do not convert “planned” into “implemented” by changing a README label.

---

# 14 — EXECUTION TARGET

The implementation is moving toward this connected system:

```text
             SAMMENA DIGITAL SCHOOL
                       │
       ┌───────────────┼───────────────┐
       ▼               ▼               ▼
    DISCOVER          APPLY          CONNECT
       │               │               │
    Website        Admissions      Parent Hub
       │               │               │
       └───────────────┼───────────────┘
                       ▼
                  SCHOOL CORE
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
       Students       Staff      Academics
          │            │            │
          └────────────┼────────────┘
                       ▼
                  SAMMENA SIS
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
   Governance      Reporting      Integrations
```

The architecture foundation is now committed in the repository. The next commits should turn these boundaries into actual database models, services, authorization rules, UI surfaces and integration tests, incrementally and verifiably.
