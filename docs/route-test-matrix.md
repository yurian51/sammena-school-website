# SAMMENA Critical Route Test Matrix

| Route | Purpose | Priority | Expected |
|---|---|---:|---|
| `/` | Institutional home | P0 | 200/render |
| `/about` | Institution information | P0 | 200/render |
| `/academics` | Academic information | P0 | 200/render |
| `/admissions` | Admissions overview | P0 | 200/render |
| `/admissions/apply` | Application UX | P0 | 200/render |
| `/news` | News/events | P1 | 200/render |
| `/resources` | Resource centre | P1 | 200/render |
| `/calendar` | Academic calendar | P1 | 200/render |
| `/portal` | Family Hub gateway | P1 | 200/render |
| `/contact` | Contact | P0 | 200/render |
| `/search` | Public search | P1 | 200/render |
| `/secondary` | 2028 expansion | P1 | 200/render |

## Smoke checks

- no route should produce an unexpected 5xx
- internal navigation should not point to known missing routes
- application flow should be usable without a backend connection
- portal must clearly indicate when authentication is not live
- public pages must not expose private data
