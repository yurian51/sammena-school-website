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
DISCOVER
   ↓
UNDERSTAND
   ↓
TRUST
   ↓
APPLY
   ↓
CONNECT
   ↓
BELONG
```

### Design direction

**Editorial clarity** · **Cinematic depth** · **Purposeful motion** · **Human warmth** · **Operational precision**

---

# 02 — MOTION SYSTEM

Motion is a product system, not decoration.

```text
┌──────────────────────────────────────────────────────────┐
│                    SAMMENA MOTION                        │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ENTER       REVEAL       CONNECT       TRANSFORM        │
│    │            │             │              │            │
│    ● ───────────●─────────────●──────────────●            │
│                                                          │
│  Hero       Content       Navigation       State         │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

The website motion direction includes:

- **Cinematic entrances** for major hero moments
- **Scroll choreography** for narrative sections
- **Staggered reveals** for content groups
- **Depth/parallax layers** where they improve hierarchy
- **Magnetic interaction feedback** for selected controls
- **Spring-based micro-interactions** for tactile UI
- **Morphing state transitions** for meaningful changes
- **Animated counters** for measurable information
- **Flowing timelines** for admissions journeys
- **Page-to-page continuity** instead of abrupt navigation
- **Skeleton and loading motion** that communicates progress
- **Success/error choreography** that gives immediate feedback
- **Responsive motion scaling** for mobile
- **Reduced-motion support** for accessibility

### Motion rule

> **Every animation must answer a question: what changed, where did it go, or what should I notice?**

If it cannot answer one of those, it probably does not belong in the interface. Humanity has suffered enough from spinning loaders.

---

# 03 — SIGNATURE INTERACTION LANGUAGE

The intended experience follows a choreography rather than a collection of random effects.

```text
LOAD
 │
 ├── atmosphere fades in
 ├── brand mark resolves
 ├── headline reveals
 ├── supporting copy follows
 └── primary action settles

SCROLL
 │
 ├── depth shifts
 ├── visual layers separate
 ├── content enters progressively
 ├── relationships draw across sections
 └── next narrative state takes focus

INTERACT
 │
 ├── target responds
 ├── surface gains depth
 ├── action confirms
 └── state resolves
```

### Motion hierarchy

```text
L1  Ambient       subtle background/depth movement
L2  Structural    section and navigation transitions
L3  Interactive   hover, press, focus and drag feedback
L4  Narrative     scroll-linked storytelling
L5  Cinematic     hero and major milestone sequences
```

Motion intensity should increase with importance, not simply with available GPU power.

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
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
      STUDENTS            ACADEMICS           ATTENDANCE
          │                   │                   │
          └───────────────────┼───────────────────┘
                              ▼
                  FINANCE · COMMUNICATIONS
```

The public website is the visible layer. The long-term direction is a connected operational platform underneath it.

---

# 05 — ADMISSIONS, BUILT AS A SYSTEM

```text
APPLICATION
    │
    ▼
VALIDATE
    │
    ▼
NORMALIZE
    │
    ▼
CONSENT
    │
    ▼
ELIGIBILITY
    │
    ├──────────────┐
    ▼              ▼
DUPLICATE      IDEMPOTENCY
    └──────┬───────┘
           ▼
       PERSIST
           │
           ▼
     REVIEW QUEUE
           │
     ┌─────┴─────┐
     ▼           ▼
    SLA        PRIORITY
     └─────┬─────┘
           ▼
    DOCUMENT REVIEW
           │
           ▼
        DECISION
       ┌────┴────┐
       ▼         ▼
    ACCEPT     REJECT
       │
       ▼
      AUDIT
       │
       ▼
  NOTIFICATION
       │
       ▼
   STUDENT 360
```

### Current admissions foundation

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

# 06 — STATE HAS MEANING

```text
DRAFT
  │
  ▼
SUBMITTED
  │
  ▼
UNDER REVIEW
  │
  ├───────────────► MORE INFORMATION
  │                         │
  │                         └──────► SUBMITTED
  │
  ├───────────────► ACCEPTED
  │
  └───────────────► REJECTED
```

The UI should visually communicate these states, while the domain layer remains the source of truth.

---

# 07 — SECURITY

```text
INPUT
  ↓
VALIDATION
  ↓
CONSENT
  ↓
AUTHORIZATION
  ↓
OBJECT ACCESS CHECK
  ↓
STATE VALIDATION
  ↓
TRANSACTION
  ↓
AUDIT
  ↓
CONTROLLED RESPONSE
```

Security principles include:

- Least privilege
- Server-side validation
- Object-level authorization
- PII minimization
- Private documents
- Safe public tracking
- Rate limiting
- Duplicate protection
- Idempotent submissions
- Auditability
- No secrets in source control

---

# 08 — DATA FLOW

```text
┌───────────┐       ┌───────────┐       ┌────────────┐
│  FAMILY   │ ────► │ ADMISSION │ ────► │  REVIEW    │
└───────────┘       └───────────┘       └─────┬──────┘
                                               │
                                               ▼
                                        ┌────────────┐
                                        │  DECISION  │
                                        └─────┬──────┘
                                              │
                         ┌────────────────────┼─────────────────┐
                         ▼                    ▼                 ▼
                    NOTIFICATION            AUDIT          STUDENT 360
```

The original admission record remains historical and auditable even when accepted data becomes part of Student 360.

---

# 09 — ENGINEERING ARCHITECTURE

```text
┌──────────────────────────────┐
│ UI / ROUTES                  │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│ API / APPLICATION SERVICES   │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│ DOMAIN                       │
│ validation · policies        │
│ decisions · SLA · queue      │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│ REPOSITORY BOUNDARY          │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│ POSTGRESQL / PRISMA TARGET   │
└──────────────────────────────┘
```

The repository deliberately separates **domain truth** from **storage implementation**.

---

# 10 — TECHNOLOGY

| Layer | Technology |
|---|---|
| Framework | Next.js 16 |
| UI | React 19 |
| Language | TypeScript 5.7 |
| Validation | Zod 3.24 |
| Testing | Vitest 3.2 |
| Package Manager | pnpm 10.15+ |
| Database target | PostgreSQL |
| ORM target | Prisma |
| Motion direction | Purposeful + cinematic + accessible |

The installed dependencies remain the source of truth. Planned technology is explicitly marked as target rather than silently treated as installed.

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
```

No green badge should mean “we felt optimistic today.”

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
            ┌─────────────────┐
            │ DOMAIN SYSTEMS  │
            └────────┬────────┘
                     │
                     ▼
            ┌─────────────────┐
            │   PERSISTENCE   │
            └────────┬────────┘
                     │
                     ▼
            ┌─────────────────┐
            │  SECURITY/RBAC  │
            └────────┬────────┘
                     │
                     ▼
            ┌─────────────────┐
            │ STAFF OPERATIONS│
            └────────┬────────┘
                     │
                     ▼
            ┌─────────────────┐
            │  FAMILY HUB     │
            └────────┬────────┘
                     │
                     ▼
            ┌─────────────────┐
            │   SAMMENA SIS   │
            └────────┬────────┘
                     │
                     ▼
            ┌─────────────────┐
            │ CONNECTED SCHOOL│
            └─────────────────┘
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

# 16 — THE LONG-TERM VISION

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
