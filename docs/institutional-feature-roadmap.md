# SAMMENA SCHOOLS Institutional Feature Roadmap

## Product direction

SAMMENA SCHOOLS is designed as an institutional education platform, not only a marketing website. The public website should provide the information architecture and trust signals of a major institution while remaining simpler and more useful for parents.

## Reference principles

- Institutional navigation and information density inspired by university-grade public websites.
- Modern responsive UX and clear parent journeys.
- No unverified operational claims.
- Future Secondary School expansion must not require a platform redesign.

## Public information architecture

1. Home
2. About Sammena
3. Our Schools
   - Pre & Primary
   - Secondary School (planned 2028)
4. Academics
5. Admissions
6. School Life
7. News & Events
8. Resources
9. Academic Calendar
10. Contact
11. Search
12. Portal

## High-value features

### Admissions
- Admission information
- Online application
- Application reference number
- Application status tracking
- Required-document checklist
- Admission enquiries
- Future payment integration point

### Institutional communications
- News
- Announcements
- Events
- Academic calendar
- Emergency/important notice banner
- Newsletter-ready content model

### Resources
- Prospectus
- Policies
- Forms
- Academic documents
- School calendar
- Parent resources
- Searchable downloads

### Family experience
- Parent portal entry point
- Student portal entry point
- Staff portal entry point
- Family Hub concept for future unified access
- Contact/enquiry routing

### Discoverability
- Global search
- Structured metadata
- OpenGraph/social cards
- XML sitemap
- robots.txt
- canonical URLs
- Organization/EducationalOrganization structured data

### Trust and accessibility
- Clear institutional identity
- Leadership section
- Verified registration information when confirmed
- Privacy and safeguarding information
- Accessible navigation and keyboard support
- Good contrast and reduced-motion support
- Mobile-first layouts

## Future digital platform

SAMMENA SCHOOLS should become the public front door for:

Website -> Admissions -> SIS -> Parent Portal -> Student Portal -> Staff Portal

The public site should therefore expose stable integration boundaries without prematurely pretending that back-office systems already exist.

## Quality gates

Before production merge:

- lint passes
- production build passes
- critical routes resolve
- navigation links are checked
- no unverified institutional claims are published
- mobile layout is reviewed
- accessibility baseline is reviewed
- metadata is complete

## Priority

P0: public UX, navigation, admissions information, resources, announcements, search, SEO, accessibility, CI.

P1: CMS, application tracking, events, staff directory, family hub integration, analytics.

P2: multilingual content, virtual tour, alumni, advanced notifications and deeper SIS integration.
