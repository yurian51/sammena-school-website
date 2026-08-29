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

## ✦ Experience the Architecture

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

### The idea

The public website is the visible surface. Underneath it, the project is being shaped into a secure school platform where admissions, family services, academic operations, communications and eventually the **Sammena SIS** can share a coherent foundation.

---

# 🌌 The README Is an Interface Too

This document intentionally uses motion-inspired architecture diagrams, progressive disclosure, visual hierarchy and animated-thinking patterns rather than the usual graveyard of bullet points.

> **No JavaScript is required inside this README.** The animation concept is expressed through structure, sequencing and GitHub-native rendering so the documentation remains portable and safe.

### The visual rhythm

```text
          DISCOVER
             │
             ▼
       ┌─────────────┐
       │   WEBSITE   │
       └──────┬──────┘
              │
              ▼
        ┌───────────┐
        │ ADMISSIONS│
        └─────┬─────┘
              │
              ▼
       ┌──────────────┐
       │ FAMILY + SIS │
       └──────┬───────┘
              │
              ▼
          CONNECT
              │
              ▼
         INTELLIGENT
           SCHOOL
```

The actual application follows the same philosophy: **simple on the surface, structured underneath.**

---

## 🚀 Project Status

**ACTIVE DEVELOPMENT · BACKEND FOUNDATION PHASE**

Current direction:

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

# 🎓 Admissions Engine

Admissions is being developed as a real domain rather than a decorative form.

```text
FORM
  ↓
VALIDATE
  ↓
NORMALIZE
  ↓
CONSENT
  ↓
ELIGIBILITY
  ↓
DUPLICATE / IDEMPOTENCY CHECK
  ↓
PERSIST
  ↓
REVIEW QUEUE
  ↓
SLA + PRIORITY
  ↓
DOCUMENT REVIEW
  ↓
DECISION
  ↓
AUDIT
  ↓
NOTIFICATION
  ↓
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

# 🧭 Domain Architecture

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

# 🛡️ Security by Design

Security is treated as an architectural constraint, not a checkbox stapled onto the end.

```text
INPUT
  ↓
SERVER VALIDATION
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

# 🧬 Data Lifecycle

```text
┌──────────────┐
│ PUBLIC FORM  │
└──────┬───────┘
       ▼
┌──────────────┐
│  VALIDATION  │
└──────┬───────┘
       ▼
┌──────────────┐
│  PERSISTENCE │
└──────┬───────┘
       ▼
┌──────────────┐
│    REVIEW    │
└──────┬───────┘
       ▼
┌──────────────┐
│   DECISION   │
└──────┬───────┘
       ▼
┌──────────────┐
│ NOTIFICATION │
└──────┬───────┘
       ▼
┌──────────────┐
│  STUDENT 360 │
└──────────────┘
```

Accepted applications can feed Student 360 while the original admission record remains auditable historical data.

---

# ⚙️ Technology

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

The repository's current package configuration is the source of truth for installed dependencies. Prisma/PostgreSQL runtime activation is a separate implementation milestone and is not silently assumed here.

---

# 🧪 Quality Gates

```text
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

# 🗂️ Documentation Map

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

# 🧱 Development Philosophy

### 1. Build the domain before the decoration

A beautiful admissions dashboard with no reliable application lifecycle is just an expensive screenshot.

### 2. Separate facts from claims

Implemented, designed, planned and verified are different states.

### 3. Prefer reusable boundaries

Services, repositories, policies and projections should remain independently testable.

### 4. Protect learner data by default

If a field is not needed by the current workflow, the system should not casually expose it.

### 5. Verify before declaring victory

```text
IMPLEMENTED ≠ VERIFIED
DESIGNED ≠ DEPLOYED
DOCUMENTED ≠ PRODUCTION-READY
```

---

# 🛣️ Roadmap

```text
             NOW
              │
              ▼
     ┌─────────────────┐
     │ DOMAIN FOUNDATION│
     └────────┬────────┘
              ▼
     ┌─────────────────┐
     │   PERSISTENCE    │
     └────────┬────────┘
              ▼
     ┌─────────────────┐
     │ SECURITY + RBAC  │
     └────────┬────────┘
              ▼
     ┌─────────────────┐
     │ STAFF OPERATIONS │
     └────────┬────────┘
              ▼
     ┌─────────────────┐
     │  FAMILY SERVICES │
     └────────┬────────┘
              ▼
     ┌─────────────────┐
     │    SAMMENA SIS   │
     └────────┬────────┘
              ▼
     ┌─────────────────┐
     │ CONNECTED SCHOOL │
     │     PLATFORM     │
     └─────────────────┘
```

---

# 📊 Project Health

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

# 🌍 The Bigger Vision

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

The long-term goal is a connected platform that reduces administrative friction while keeping security, clarity and human oversight at the center.

---

<div align="center">

### Built with intent. Designed to grow. Verified before trusted.

**SAMMENA SCHOOLS**

`Website → Admissions → Family Hub → SIS → Connected School Platform`

</div>
