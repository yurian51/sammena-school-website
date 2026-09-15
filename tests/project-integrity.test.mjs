import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const read = f => fs.readFileSync(path.join(root, f), 'utf8')
const exists = f => fs.existsSync(path.join(root, f))
const match = (source, patterns) => patterns.forEach(p => assert.match(source, p))


test('toolchain, scripts and core routes are present', () => {
  const pkg = JSON.parse(read('package.json'))
  assert.equal(pkg.packageManager, 'pnpm@10.15.0')
  assert.equal(pkg.scripts.typecheck, 'tsc --noEmit')
  assert.equal(pkg.scripts.test, 'node --test')
  assert.equal(pkg.scripts['test:unit'], 'vitest run')
  assert.equal(typeof pkg.devDependencies.vitest, 'string')
  assert.equal(typeof pkg.dependencies.next, 'string')
  assert.equal(typeof pkg.dependencies.pg, 'string')
  assert.equal(typeof pkg.devDependencies['@types/pg'], 'string')
  assert.match(read('pnpm-lock.yaml'), /lockfileVersion:/)
  for (const route of ['', 'about', 'academics', 'admissions', 'gallery', 'contact', 'secondary', 'resources', 'news', 'calendar', 'search', 'services']) {
    const file = route ? `app/${route}/page.tsx` : 'app/page.tsx'
    assert.ok(exists(file), `Missing route entrypoint: ${file}`)
  }
})

test('production metadata, sitemap and robots are protected', () => {
  for (const file of ['app/sitemap.ts', 'app/robots.ts', 'app/layout.tsx', 'app/manifest.ts']) assert.ok(exists(file))
  const sitemap = read('app/sitemap.ts')
  for (const route of ['/about', '/academics', '/admissions', '/gallery', '/contact', '/news', '/calendar', '/resources', '/services']) assert.match(sitemap, new RegExp(`['"]${route.replace('/', '\\/')}['"]`))
  assert.doesNotMatch(sitemap, /['"]\/portal['"]|['"]\/admissions\/admin['"]|['"]\/api(?:\/|['"])/)
  match(read('app/robots.ts'), [/sitemap:/, /sitemap\.xml/, /['"]\/api(?:\/|['"])/, /['"]\/portal(?:\/|['"])/])
})

test('motion and mobile navigation remain resilient', () => {
  match(read('hooks/use-scroll-animation.ts'), [/useState\(true\)/])
  match(read('app/globals.css'), [/data-motion=\\"section\\"/])
  match(read('app/motion.css'), [/\[data-motion=\\"section\\"\]\{ opacity:1; transform:none;/])
  match(read('components/navbar.tsx'), [/"use client"/, /setMobileOpen\(v => !v\)/, /aria-expanded=\{mobileOpen\}/, /role="dialog"/, /aria-modal="true"/, /event\.key === "Escape"/, /min-h-11 min-w-11/, /overscroll-contain/])
})

test('CI and lockfile workflows use the locked toolchain safely', () => {
  const ci = read('.github/workflows/ci.yml')
  match(ci, [/pnpm\/action-setup@v4/, /version: 10\.15\.0/, /pnpm install --frozen-lockfile/, /pnpm run typecheck/, /pnpm test/, /pnpm run build/])
  const sync = read('.github/workflows/lockfile-sync.yml')
  assert.ok(!exists('.github/workflows/sync-lockfile.yml'))
  match(sync, [/pnpm install --lockfile-only --ignore-scripts/, /contents: write/, /github-actions\[bot\]/, /git diff --quiet -- pnpm-lock\.yaml/])
})

test('portal integrity and relationship migrations are present and uniquely versioned', () => {
  const migrationDir = path.join(root, 'supabase/migrations')
  const migrations = fs.readdirSync(migrationDir).filter(name => name.endsWith('.sql'))
  const versions = new Map()
  for (const name of migrations) {
    const version = name.match(/^(\d+)_/)?.[1]
    if (!version) continue
    const previous = versions.get(version)
    assert.equal(previous, undefined, `Duplicate Supabase migration version ${version}: ${previous} and ${name}`)
    versions.set(version, name)
  }

  const integrity = read('supabase/migrations/0007_school_scope_integrity.sql')
  match(integrity, [/tenant\/school boundaries/, /enrollments_student_school_fk/, /enrollments_academic_year_school_fk/, /enrollments_class_school_fk/, /attendance_student_school_fk/, /assessments_student_school_fk/, /student_guardians_student_school_fk/])
  const indexes = read('supabase/migrations/0008_portal_query_indexes.sql')
  match(indexes, [/attendance_student_school_date_idx/, /assessments_student_school_date_idx/, /library_issues_book_school_open_idx/, /library_issues_student_school_open_idx/, /where returned_at is null/])
  const rel = read('supabase/migrations/0009_portal_relationship_indexes.sql')
  match(rel, [/enrollments_school_student_status_created_idx/, /assessments_school_student_date_idx/, /library_issues_school_book_open_idx/, /where returned_at is null/])
  const portalIntegrity = read('supabase/migrations/0011_portal_school_integrity.sql')
  match(portalIntegrity, [/PORTAL_INTEGRITY/, /CREATE OR REPLACE FUNCTION enforce_portal_school_integrity/, /enrollments_school_integrity/, /attendance_school_integrity/, /assessments_school_integrity/, /library_issues_school_integrity/, /quality_evidence_school_integrity/, /prevent_portal_parent_school_change/])
})

test('unified services hub exposes only real existing destinations', () => {
  const page = read('app/services/page.tsx')
  match(page, [/href: "\/admissions"/, /href: "\/admissions\/fees"/, /href: "\/calendar"/, /href: "\/resources"/, /href: "\/academics"/, /href: "\/search"/, /href: "\/portal"/, /href: "\/portal\/library"/])
  assert.doesNotMatch(page, /Math\.random|fake|mock/i)
  match(read('components/navbar.tsx'), [/label: "Services"/, /\/services/])
})

test('portal reads are school-scoped and duplicate-safe', () => {
  const source = read('lib/api/portal-data.ts')
  match(source, [/count\(distinct s\.id\)/, /order by e\.created_at desc, e\.id desc/, /where s\.school_id = \$1/, /ar\.school_id = s\.school_id/, /a\.school_id = s\.school_id/, /where a\.school_id = \$1/, /where b\.school_id = \$1/, /with open_issues as/, /left join open_issues oi/])
})

test('public results, contact and deployment metadata remain traceable', () => {
  const results = read('app/results/page.tsx')
  for (const year of ['2018','2019','2020','2021','2022','2023','2024','2025']) assert.match(results, new RegExp(year))
  match(results, [/PS0101160/, /historicalArchive/, /verified/])
  const nav = read('components/navbar.tsx'); const contact = read('app/contact/page.tsx')
  match(nav, [/tel:\+255750227073/]); match(contact, [/wa\.me\/255750227073/, /\+255 750 227 073/])
  match(read('app/sitemap.ts'), [/sammena-school-website\.onrender\.com/]); match(read('app/robots.ts'), [/sammena-school-website\.onrender\.com/])
})

test('institutional pages contain substantive main sections', () => {
  for (const file of ['app/page.tsx','app/about/page.tsx','app/academics/page.tsx','app/admissions/page.tsx','app/gallery/page.tsx','app/news/page.tsx','app/results/page.tsx','app/contact/page.tsx','app/calendar/page.tsx','app/resources/page.tsx','app/secondary/page.tsx','app/search/page.tsx','app/services/page.tsx']) {
    const source = read(file); assert.ok(source.length > 2500, `Suspiciously small page: ${file}`); match(source, [/<main[\s>]/, /<section[\s>]/])
  }
})

test('admissions service is real, validated and server-backed', () => {
  for (const file of ['app/api/admissions/route.ts','app/api/admissions/submit/route.ts','app/api/admissions/track/route.ts']) assert.ok(exists(file))
  const intake = read('app/api/admissions/route.ts'), submit = read('app/api/admissions/submit/route.ts'), track = read('app/api/admissions/track/route.ts'), policy = read('lib/admissions/reference-validation.ts')
  match(intake, [/admissions\.createDraft/, /status: 201/])
  match(submit, [/admissions\.createDraft/, /academicYear: parsed\.data\.academicYear/, /studyType: parsed\.data\.studyType/, /relationship: parsed\.data\.relationship/, /admissions\.updateStatus\(application\.reference, "SUBMITTED"\)/, /readJson<unknown>/, /requestId\(request\)/, /status: 201/])
  assert.doesNotMatch(submit, /application-store|Math\.random|createAdmissionReference/)
  match(track, [/admissions\.getByReference/, /status: 404/, /isValidAdmissionReference/]); match(policy, [/SAM-\\d\{4\}-\[A-Z0-9\]\{6\}/])
  const form = read('app/admissions/apply/page.tsx')
  match(form, [/fetch\("\/api\/admissions\/submit"/, /method:"POST"/, /JSON\.stringify\(form\)/, /payload\.data\?\.reference/, /setReference\(payload\.data\.reference\)/, /Application submitted/, /Track application/, /disabled=\{submitting\}/, /consent/]); assert.doesNotMatch(form, /Math\.random|makeReference/)
  assert.match(read('lib/admissions/application-schema.ts'), /consent: z\.literal\(true\)/)
})

test('admission persistence and tracking UI use the real schema and stages', () => {
  const repository = read('lib/db/repositories/admissions-postgres.ts'), migration = read('prisma/migrations/0002_admission_learner_fields/migration.sql'), schema = read('prisma/schema.prisma')
  match(repository, [/"AdmissionGuardian"/, /"AdmissionApplication"/, /learnerFullName/, /learnerDateOfBirth/]); assert.doesNotMatch(repository, /insert into applications|from applications|update applications/i)
  match(migration, [/ADD COLUMN "learnerFullName"/, /ADD COLUMN "learnerDateOfBirth"/]); match(schema, [/learnerFullName\s+String/, /learnerDateOfBirth\s+String/])
  const track = read('app/admissions/track/page.tsx')
  match(track, [/fetch\(`\/api\/admissions\/track\?reference=/, /Status retrieved from the admissions service/, /ACCEPTED: "DECISION"/, /REJECTED: "DECISION"/, /ENROLLED: "ENROLLED"/, /const activeStatus = status \? \(stageForStatus\[status\] \?\? "SUBMITTED"\)/])
})

test('database and JSON API health boundaries fail safely', () => {
  const client = read('lib/db/client.ts'); match(client, [/process\.env\.DATABASE_URL/, /new Pool\(/, /connectionTimeoutMillis/, /ssl:/, /DATABASE_CLIENT_NOT_CONFIGURED/])
  const ready = read('app/api/ready/route.ts'); match(ready, [/getDbClient/, /select 1 as ok/, /status: "ready"/, /status: 503/, /not_ready/])
  const request = read('lib/api/request.ts'), errors = read('lib/api/errors.ts')
  match(request, [/MAX_JSON_BYTES = 32 \* 1024/, /request\.text\(\)/, /JSON\.parse\(raw\)/, /REQUEST_TOO_LARGE/, /x-request-id/]); match(errors, [/REQUEST_TOO_LARGE/, /status, 413/])
})
