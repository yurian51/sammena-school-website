<div align="center">

# 🏫 SAMMENA SCHOOLS

### The Digital Front Door of a Modern African School

**Institutional Website · Admissions · Family Experience · Future SIS**

<br/>

[![Status](https://img.shields.io/badge/status-active%20development-ff7a18?style=for-the-badge)](#project-status)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](#technology)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](#technology)
[![Quality](https://img.shields.io/badge/quality-gates-green?style=for-the-badge)](#quality-gates)

<br/>

> **A school website designed not as a brochure, but as the first layer of a connected digital school.**

</div>

---

# ✦ THE MOTION-FIRST EXPERIENCE

The visual language of Sammena is built around **movement, depth, continuity and responsive storytelling**. Every transition should communicate where the user came from, where they are going and why the next state matters.

```text
╭────────────────────────────────────────────────────────────╮
│                                                            │
│       DISCOVER → EXPLORE → CONNECT → APPLY → BELONG        │
│          ╲        ╲         ╲       ╲        ╲             │
│           ╲        ╲         ╲       ╲        ╲            │
│            ◉────────◉─────────◉───────◉────────◉           │
│                                                            │
╰────────────────────────────────────────────────────────────╯
```

### Motion principles

```text
01  MICRO-MOTION       Buttons, cards, icons and controls respond naturally.
02  SCROLL-MOTION      Sections reveal, transform and connect as the story unfolds.
03  DEPTH-MOTION       Layers, glass, light and shadows create spatial hierarchy.
04  DATA-MOTION        Counters, timelines and status changes animate meaningfully.
05  NAV-MOTION         Navigation transitions preserve context instead of teleporting.
06  STATE-MOTION       Loading, success, error and empty states communicate clearly.
07  CINEMATIC-MOTION   Hero sequences create a memorable first impression.
08  RESPONSIVE-MOTION  Motion adapts to screen size and interaction capability.
09  ACCESSIBLE-MOTION  Reduced-motion preferences remain respected.
10  PURPOSEFUL-MOTION  No animation exists merely because a CSS property was bored.
```

> **The goal is not maximum movement. It is maximum perceived quality.**

---

## 🌊 The Experience Flow

```text
                         ┌──────────────────┐
                         │   SAMMENA START   │
                         └────────┬─────────┘
                                  │
                           ✦ INTRO MOTION ✦
                                  │
                                  ▼
                     ┌────────────────────────┐
                     │   DISCOVER THE SCHOOL  │
                     └────────────┬───────────┘
                                  │
                         ╱ SCROLL TRANSITION ╲
                        ╱                       ╲
                       ▼                         ▼
              ┌────────────────┐       ┌────────────────┐
              │ SCHOOL LIFE    │       │ ACADEMICS      │
              └───────┬────────┘       └───────┬────────┘
                      ╲                         ╱
                       ╲                       ╱
                        ╲                     ╱
                         ▼                   ▼
                       ┌──────────────────────┐
                       │      ADMISSIONS      │
                       └──────────┬───────────┘
                                  │
                           ✦ FORM JOURNEY ✦
                                  │
                                  ▼
                       ┌──────────────────────┐
                       │    FAMILY HUB        │
                       └──────────┬───────────┘
                                  │
                                  ▼
                         ┌────────────────┐
                         │  SAMMENA SIS   │
                         └────────────────┘
```

---

# 🌌 THE README IS AN INTERFACE TOO

This document uses **motion-inspired diagrams, progressive disclosure, visual hierarchy, state transitions and architectural storytelling** so the documentation mirrors the product philosophy.

GitHub Markdown does not execute arbitrary CSS or JavaScript, so this README deliberately avoids pretending that ASCII art is secretly a browser engine. The actual website is where cinematic motion belongs.

### Motion vocabulary

```text
FADE        → introduction
REVEAL      → discovery
SLIDE       → navigation
SCALE       → emphasis
PARALLAX    → depth
MORPH       → state transition
FLOW        → relationships
PULSE       → attention
SPRING      → interaction feedback
STAGGER     → sequential storytelling
```

---

# 🏫 EXPERIENCE ARCHITECTURE

```text
                         ┌───────────────────────┐
                         │   SAMMENA SCHOOLS     │
                         │   DIGITAL FRONT DOOR  │
                         └───────────┬───────────┘
                                     │
                    ╭────────────────┼────────────────╮
                    ↓                ↓                ↓
              🌐 WEBSITE       🎓 ADMISSIONS      👨‍👩‍👧 FAMILY HUB
                    │                │                │
                    ╰────────────────┼────────────────╯
                                     ↓
                            🔐 IDENTITY + RBAC
                                     ↓
                              🧠 SAMMENA SIS
                                     │
              ╭──────────────────────┼──────────────────────╮
              ↓                      ↓                      ↓
         👨‍🎓 STUDENTS          📚 ACADEMICS          📅 ATTENDANCE
              │                      │                      │
              ╰──────────────────────┼──────────────────────╯
                                     ↓
                       💰 FINANCE · 💬 COMMUNICATIONS
```

The public website is the visible surface. Underneath it, the project is being shaped into a secure school platform where admissions, family services, academic operations, communications and eventually the **Sammena SIS** can share a coherent foundation.

---

# 🚀 PROJECT STATUS

**ACTIVE DEVELOPMENT · BACKEND FOUNDATION PHASE**

```text
PUBLIC EXPERIENCE       ████████████████████  Active
ADMISSIONS DOMAIN       ██████████████████░░  Active
BACKEND FOUNDATION      ███████████████░░░░░  Active
PERSISTENCE             ████████░░░░░░░░░░░░  Building
IDENTITY + RBAC         ██████░░░░░░░░░░░░░░  Planned/Building
FAMILY HUB              █████░░░░░░░░░░░░░░░  Foundation
SAMMENA SIS             ███░░░░░░░░░░░░░░░░░  Planned
PRODUCTION DEPLOYMENT   ░░░░░░░░░░░░░░░░░░░░  Not claimed
```

> **Truth over theatre:** live admissions, authentication, SIS records, payments, private document collection and production deployment are not claimed as active until implemented and verified.

---

# 🎓 ADMISSIONS ENGINE

Admissions is being developed as a real domain rather than a decorative form.

```text
FORM
  │
  ▼
VALIDATE ──→ NORMALIZE ──→ CONSENT
                              │
                              ▼
                         ELIGIBILITY
                              │
                     ┌────────┴────────┐
                     ▼                 ▼
                DUPLICATE          IDEMPOTENCY
                     ╲                 ╱
                      ╲               ╱
                       ▼             ▼
                          PERSIST
                             │
                             ▼
                       REVIEW QUEUE
                             │
                    ┌────────┴────────┐
                    ▼                 ▼
                   SLA             PRIORITY
                    ╲                 ╱
                     ╲               ╱
                      ▼             ▼
                     DOCUMENT REVIEW
                             │
                             ▼
                          DECISION
                             │
                 ┌───────────┴───────────┐
                 ▼                       ▼
               AUDIT                NOTIFICATION
                 ╲                       ╱
                  ╲                     ╱
                   └───────┬───────────┘
                           ▼
                       STUDENT 360
```

### Admissions capabilities in the current foundation

- Application validation
- Input normalization
- Eligibility evaluation
- Application reference validation
- Duplicate-detection foundation
- Submission idempotency boundary
- Application lookup
- Search and advanced filters
- Reviewer assignment foundation
- Internal review notes
- Document readiness model
- Document status state machine
- Review SLA calculation
- Queue priority calculation
- Public tracking projection
- Notification event/queue foundation
- Operational metrics
- Audit architecture
- Production readiness and security specifications

---

# 🌀 STATE TRANSITIONS

The application should feel alive because its **state has meaning**.

```text
        ┌─────────┐
        │  DRAFT  │
        └────┬────┘
             │ submit
             ▼
      ┌─────────────┐
      │  SUBMITTED  │
      └──────┬──────┘
             │ review
             ▼
      ┌─────────────┐
      │ UNDER_REVIEW│
      └──┬───────┬──┘
         │       │
         │       ├───────────────┐
         ▼       ▼               ▼
   MORE_INFO   ACCEPTED       REJECTED
      │
      │ resubmit
      └──────────────→ SUBMITTED
```

Every visual state transition in the product should correspond to a meaningful domain transition underneath it.

---

# 🧭 DOMAIN ARCHITECTURE

```text
apps / routes
     │
     ▼
┌───────────────┐
│ API / UI      │
└───────┬───────┘
        ▼
┌───────────────┐
│ Domain Layer  │
├───────────────┤
│ Validation    │
│ Normalization │
│ Eligibility   │
│ State Policy  │
│ Decisions     │
│ SLA / Queue   │
└───────┬───────┘
        ▼
┌────────────────────┐
│ Repository Boundary│
└─────────┬──────────┘
          ▼
┌────────────────────┐
│ Persistent Storage │
│ PostgreSQL target  │
└────────────────────┘
```

This separation keeps UI, business rules and storage concerns from becoming one enormous file of sadness.

---

# 🛡️ SECURITY BY DESIGN

```text
INPUT
  ↓
SERVER VALIDATION
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
AUDIT EVENT
  ↓
CONTROLLED RESPONSE
```

### Principles

- Least-privilege RBAC
- Server-side validation
- Object-level authorization
- PII minimization
- Private document storage
- Safe public tracking projection
- Rate limiting requirements
- Duplicate submission protection
- Idempotency for retry safety
- Immutable audit intent
- No credentials or secrets in source control
- No sensitive student records in public assets

---

# 🧬 DATA LIFECYCLE

```text
┌──────────────┐
│ PUBLIC FORM  │
└──────┬───────┘
       │ reveal
       ▼
┌──────────────┐
│  VALIDATION  │
└──────┬───────┘
       │ transform
       ▼
┌──────────────┐
│  PERSISTENCE │
└──────┬───────┘
       │ queue
       ▼
┌──────────────┐
│    REVIEW    │
└──────┬───────┘
       │ decide
       ▼
┌──────────────┐
│   DECISION   │
└──────┬───────┘
       │ notify
       ▼
┌──────────────┐
│ NOTIFICATION │
└──────┬───────┘
       │ connect
       ▼
┌──────────────┐
│  STUDENT 360 │
└──────────────┘
```

---

# ⚙️ TECHNOLOGY

| Layer | Direction |
|---|---|
| Framework | Next.js 16 |
| UI | React 19 |
| Language | TypeScript 5.7 |
| Validation | Zod 3.24 |
| Testing | Vitest 3.2 |
| Package Manager | pnpm 10.15+ |
| Database Target | PostgreSQL |
| ORM Target | Prisma |
| Styling | Modern responsive UI architecture |
| Motion Direction | Purposeful, accessible, cinematic motion |

The repository's current package configuration is the source of truth for installed dependencies. Prisma/PostgreSQL runtime activation is a separate implementation milestone and is not silently assumed here.

---

# 🧪 QUALITY GATES

```text
TYPECHECK
   │
   ▼
UNIT TESTS
   │
   ▼
INTEGRATION TESTS
   │
   ▼
DATABASE MIGRATION TEST
   │
   ▼
PRODUCTION BUILD
   │
   ▼
SECURITY REVIEW
   │
   ▼
RELEASE
```

### Local development

```bash
pnpm install
pnpm dev
```

Then open:

```text
http://localhost:3000
```

Quality checks:

```bash
pnpm typecheck
pnpm build
```

Tests should be executed through the repository's configured test command once the relevant runtime dependencies are available.

---

# 🗂️ DOCUMENTATION MAP

The `docs/` directory is becoming the project's operational memory.

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

### Why this matters

The project is intentionally moving from:

```text
IDEA → UI → FEATURES
```

toward:

```text
DOMAIN → CONTRACT → IMPLEMENTATION → VERIFICATION → OPERATIONS
```

---

# 🧱 DEVELOPMENT PHILOSOPHY

### 1. Build the domain before the decoration

A beautiful admissions dashboard with no reliable application lifecycle is just an expensive screenshot.

### 2. Separate facts from claims

Implemented, designed, planned and verified are different states.

### 3. Separate motion from meaning

Motion should explain hierarchy, feedback, progression and continuity. It should never block reading or make a user fight the interface.

### 4. Prefer reusable boundaries

Services, repositories, policies and projections should remain independently testable.

### 5. Protect learner data by default

If a field is not needed by the current workflow, the system should not casually expose it.

### 6. Verify before declaring victory

```text
IMPLEMENTED ≠ VERIFIED
DESIGNED ≠ DEPLOYED
DOCUMENTED ≠ PRODUCTION-READY
ANIMATED ≠ WELL-DESIGNED
```

---

# 🛣️ ROADMAP

```text
             NOW
              │
              ▼
     ┌─────────────────┐
     │ DOMAIN FOUNDATION│
     └────────┬────────┘
              │ motion: reveal
              ▼
     ┌─────────────────┐
     │   PERSISTENCE    │
     └────────┬────────┘
              │ motion: connect
              ▼
     ┌─────────────────┐
     │ SECURITY + RBAC  │
     └────────┬────────┘
              │ motion: transform
              ▼
     ┌─────────────────┐
     │ STAFF OPERATIONS │
     └────────┬────────┘
              │ motion: flow
              ▼
     ┌─────────────────┐
     │  FAMILY SERVICES │
     └────────┬────────┘
              │ motion: expand
              ▼
     ┌─────────────────┐
     │    SAMMENA SIS   │
     └────────┬────────┘
              │ motion: converge
              ▼
     ┌─────────────────┐
     │ CONNECTED SCHOOL │
     │     PLATFORM     │
     └─────────────────┘
```

---

# 📊 PROJECT HEALTH

| Area | Status |
|---|---|
| Public website | 🟢 Active |
| Admissions domain | 🟢 Active |
| Validation | 🟢 Implemented |
| Admissions search | 🟢 Implemented |
| Review architecture | 🟢 Implemented |
| Document policy | 🟢 Implemented |
| Audit architecture | 🟢 Implemented |
| Notification foundation | 🟢 Implemented |
| PostgreSQL target | 🟡 Planned/Building |
| Prisma runtime | 🟡 Next milestone |
| Authentication | 🟡 Building |
| RBAC | 🟡 Building |
| Secure document storage | 🟡 Building |
| CI verification | 🔴 Required |
| Production deployment | 🔴 Not claimed |

---

# 🌍 THE BIGGER VISION

Sammena should not merely **have a website**.

It should have a digital environment where the right information reaches the right person at the right moment.

```text
                  SAMMENA
                     │
        ┌────────────┼────────────┐
        ↓            ↓            ↓
      SCHOOL       FAMILY       STUDENT
        │            │            │
        └────────────┼────────────┘
                     ↓
                SHARED DATA
                     │
                     ↓
              INTELLIGENT WORKFLOWS
                     │
                     ↓
               BETTER OPERATIONS
                     │
                     ↓
               BETTER EDUCATION
```

The long-term goal is a connected platform that reduces administrative friction while keeping security, clarity, accessibility and human oversight at the center.

---

<div align="center">

### Built with intent. Designed to move. Verified before trusted.

**SAMMENA SCHOOLS**

`Website → Admissions → Family Hub → SIS → Connected School Platform`

</div>
