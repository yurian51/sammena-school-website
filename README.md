<div align="center">

# SAMMENA SCHOOLS

### A Digital Experience for a Modern African School

**Website · Admissions · Family Experience · Future SIS**

<br/>

![Status](https://img.shields.io/badge/STATUS-ACTIVE%20DEVELOPMENT-111111?style=for-the-badge)
![Next.js](https://img.shields.io/badge/NEXT.JS-16-111111?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TYPESCRIPT-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

<br><br>

> **More than a school website. A foundation for a connected school experience.**

</div>

---

# 01 — THE EXPERIENCE

Sammena is being shaped as a **digital front door** rather than a static brochure. The experience should feel calm, premium, human and distinctly African without relying on visual clichés.

```text
DISCOVER → UNDERSTAND → TRUST → APPLY → CONNECT → BELONG
```

### Public experience now includes

- Cinematic homepage and institutional storytelling
- About, academics and school-life experiences
- Admissions journey with requirements and FAQ states
- Cinematic gallery with filtering and lightbox interaction
- Contact experience with responsive interaction states
- Resource Centre with clear document categories
- News & Events hub with category filtering
- Academic Calendar information architecture
- Public website search experience
- Future secondary-school pathway presentation

### Design direction

**Editorial clarity** · **Cinematic depth** · **Purposeful motion** · **Human warmth** · **Operational precision**

---

# 02 — MOTION SYSTEM

Motion is a product system, not decoration.

```text
ENTER → REVEAL → CONNECT → TRANSFORM
```

The website motion direction includes:

- Cinematic entrances for major hero moments
- Scroll choreography for narrative sections
- Staggered reveals for content groups
- Depth layers where they improve hierarchy
- Tactile hover and focus feedback
- State transitions for meaningful changes
- Flowing admissions timelines
- Loading and success states where implemented
- Responsive motion scaling
- Reduced-motion support for accessibility

### Motion rule

> **Every animation must answer a question: what changed, where did it go, or what should I notice?**

Motion intensity should increase with importance, not simply with available GPU power.

---

# 03 — SIGNATURE INTERACTION LANGUAGE

```text
LOAD
 ├─ atmosphere
 ├─ brand
 ├─ headline
 ├─ supporting content
 └─ primary action

SCROLL
 ├─ depth
 ├─ progressive reveal
 ├─ hierarchy
 └─ narrative continuity

INTERACT
 ├─ target responds
 ├─ surface gains depth
 ├─ action confirms
 └─ state resolves
```

The interface favors restrained, purposeful movement over decoration for its own sake. Humanity has survived enough spinning loaders.

---

# 04 — PRODUCT ARCHITECTURE

```text
                           SAMMENA
                              │
             ┌────────────────┼────────────────┐
             │                │                │
             ▼                ▼                ▼
          WEBSITE         ADMISSIONS       FAMILY HUB
             │                │                │
             └────────────────┼────────────────┘
                              ▼
                         IDENTITY / RBAC
                              │
                              ▼
                         SAMMENA SIS
```

The public website is the visible layer. The long-term direction is a connected operational platform underneath it.

---

# 05 — ADMISSIONS, BUILT AS A SYSTEM

```text
APPLICATION → VALIDATE → NORMALIZE → CONSENT → ELIGIBILITY
                                      ↓
                               REVIEW QUEUE
                                      ↓
                                  DECISION
                                 ↙        ↘
                             ACCEPT      REJECT
                                ↓
                              AUDIT
                                ↓
                          NOTIFICATION
                                ↓
                           STUDENT 360
```

### Admissions foundation

| Capability | State |
|---|---|
| Validation | 🟢 Implemented |
| Normalization | 🟢 Implemented |
| Eligibility | 🟢 Implemented |
| Duplicate detection | 🟢 Foundation |
| Idempotency | 🟢 Foundation |
| Application lookup | 🟢 Implemented |
| Search/filtering | 🟢 Implemented |
| Reviewer architecture | 🟢 Implemented |
| Review notes | 🟢 Foundation |
| Document policy | 🟢 Implemented |
| SLA | 🟢 Implemented |
| Queue priority | 🟢 Implemented |
| Public tracking projection | 🟢 Implemented |
| Notification queue | 🟢 Foundation |
| Audit architecture | 🟢 Implemented |
| PostgreSQL persistence | 🟡 Building |
| Authentication/RBAC | 🟡 Building |

---

# 06 — PUBLIC INFORMATION ARCHITECTURE

```text
HOME
 ├─ ABOUT
 ├─ ACADEMICS
 ├─ SCHOOL LIFE
 │   └─ GALLERY
 ├─ ADMISSIONS
 ├─ RESOURCES
 ├─ NEWS & EVENTS
 ├─ CALENDAR
 ├─ SEARCH
 └─ CONTACT
```

The public layer is intentionally conservative about facts that require official publishing. Empty news and calendar states are preferable to fabricated institutional information.

---

# 07 — STATE HAS MEANING

```text
DRAFT → SUBMITTED → UNDER REVIEW
                      ├→ MORE INFORMATION → SUBMITTED
                      ├→ ACCEPTED
                      └→ REJECTED
```

The UI should communicate states while the domain layer remains the source of truth.

---

# 08 — SECURITY

```text
INPUT → VALIDATION → CONSENT → AUTHORIZATION → OBJECT ACCESS CHECK
      → STATE VALIDATION → TRANSACTION → AUDIT → CONTROLLED RESPONSE
```

Security principles include least privilege, server-side validation, object-level authorization, PII minimization, private documents, safe public tracking, rate limiting, duplicate protection, idempotent submissions, auditability and no secrets in source control.

---

# 09 — ENGINEERING ARCHITECTURE

```text
UI / ROUTES
    ↓
API / APPLICATION SERVICES
    ↓
DOMAIN
    ↓
REPOSITORY BOUNDARY
    ↓
POSTGRESQL / PRISMA TARGET
```

The repository deliberately separates **domain truth** from **storage implementation**.

---

# 10 — TECHNOLOGY

| Layer | Technology |
|---|---|
| Framework | Next.js 16 |
| UI | React 19 |
| Language | TypeScript 5.7 |
| Validation | Zod |
| Testing | Vitest |
| Package Manager | pnpm 10.15+ |
| Database target | PostgreSQL |
| ORM target | Prisma |
| Motion | Purposeful + cinematic + accessible |

Installed dependencies remain the source of truth. Planned infrastructure is explicitly marked as target rather than silently treated as installed.

---

# 11 — QUALITY GATES

```text
CODE
 ↓
TYPECHECK
 ↓
UNIT TESTS
 ↓
INTEGRATION TESTS
 ↓
DATABASE MIGRATION TEST
 ↓
PRODUCTION BUILD
 ↓
SECURITY REVIEW
 ↓
RELEASE
```

Development:

```bash
pnpm install
pnpm dev
```

Quality:

```bash
pnpm typecheck
pnpm build
pnpm test
```

**Current verification note:** the latest GitHub commit did not expose any completed status checks through the repository status endpoint. Therefore this project is **not being claimed as CI-verified or production-deployed**.

---

# 12 — PROJECT STATUS

```text
PUBLIC EXPERIENCE       ████████████████████  ACTIVE
ADMISSIONS              ██████████████████░░  ACTIVE
DOMAIN FOUNDATION       █████████████████░░░  ACTIVE
PERSISTENCE             █████████░░░░░░░░░░░  BUILDING
AUTH + RBAC             ██████░░░░░░░░░░░░░░  BUILDING
FAMILY HUB              █████░░░░░░░░░░░░░░░  FOUNDATION
SAMMENA SIS             ███░░░░░░░░░░░░░░░░░  PLANNED
PRODUCTION              ░░░░░░░░░░░░░░░░░░░░  NOT CLAIMED
```

**Truth rule:** designed, implemented, verified and deployed are four different words.

---

# 13 — ROADMAP

```text
NOW
 │
 ▼
PUBLIC EXPERIENCE HARDENING
 │
 ▼
PERSISTENCE
 │
 ▼
SECURITY / RBAC
 │
 ▼
STAFF OPERATIONS
 │
 ▼
FAMILY HUB
 │
 ▼
SAMMENA SIS
 │
 ▼
CONNECTED SCHOOL
```

---

# 14 — DOCUMENTATION

The `docs/` directory is the project's operational memory.

### Admissions

- `ADMISSIONS-API-CONTRACT.md`
- `ADMISSIONS-SECURITY-MODEL.md`
- `ADMISSIONS-PRODUCTION-READINESS.md`
- `ADMISSIONS-DATABASE-SCHEMA.md`
- `ADMISSIONS-PRISMA-MIGRATION.md`
- `ADMISSIONS-DATA-LIFECYCLE.md`
- `ADMISSIONS-STATE-MACHINE.md`
- `ADMISSIONS-DOMAIN-BOUNDARIES.md`
- `ADMISSIONS-IDEMPOTENCY.md`
- `ADMISSIONS-PII-MINIMIZATION.md`
- `ADMISSIONS-FAILURE-RECOVERY.md`
- `ADMISSIONS-OBSERVABILITY.md`

---

# 15 — DESIGN PRINCIPLES

### Build the system before decorating it.

A polished interface cannot compensate for unreliable domain logic.

### Make motion meaningful.

Movement should communicate hierarchy, feedback, progression or continuity.

### Protect the family experience.

Parents should understand what is happening without needing to understand the software behind it.

### Keep complexity underneath.

The surface should feel simple even when the architecture is sophisticated.

### Verify before claiming.

```text
IMPLEMENTED ≠ VERIFIED
DESIGNED ≠ DEPLOYED
DOCUMENTED ≠ PRODUCTION-READY
ANIMATED ≠ WELL-DESIGNED
```

---

# 16 — EXECUTION BACKLOG

The project is being expanded through small verified increments rather than a fake claim that hundreds of features already exist.

### Next high-value execution sequence

1. Repair and verify package-lock consistency around Vitest.
2. Run typecheck and production build through GitHub Actions.
3. Harden public navigation and mobile states.
4. Replace placeholder public contact/social data with verified institutional data only.
5. Connect news publishing to the CMS.
6. Connect calendar publishing to the CMS.
7. Add document metadata and secure downloads.
8. Finish admin admissions API routes.
9. Wire audit events and authorization tests.
10. Complete PostgreSQL persistence and migration verification.
11. Add authentication/RBAC.
12. Add staff review workflows.
13. Build family portal foundation.
14. Build Student 360 foundation.
15. Establish production deployment and rollback verification.

---

# 17 — LONG-TERM VISION

Sammena should not merely **have a website**.

It should have a connected digital environment where school, family and student experiences work together.

```text
                         SAMMENA
                            │
            ┌───────────────┼───────────────┐
            ▼               ▼               ▼
         SCHOOL           FAMILY         STUDENT
            │               │               │
            └───────────────┼───────────────┘
                            ▼
                       SHARED DATA
                            │
                            ▼
                  INTELLIGENT WORKFLOWS
                            │
                            ▼
                    BETTER OPERATIONS
                            │
                            ▼
                     BETTER EDUCATION
```

<div align="center">

<br>

## SAMMENA SCHOOLS

**Built with intent. Designed to move. Verified before trusted.**

`Website → Admissions → Family Hub → SIS → Connected School Platform`

</div>
