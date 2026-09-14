import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')
const exists = (file) => fs.existsSync(path.join(root, file))

 test('package scripts use the locked toolchain', () => {
  const pkg = JSON.parse(read('package.json'))
  assert.equal(pkg.packageManager, 'pnpm@10.15.0')
  assert.equal(pkg.scripts.typecheck, 'tsc --noEmit')
  assert.equal(pkg.scripts.test, 'node --test')
  assert.equal(typeof pkg.devDependencies.vitest, 'string')
  assert.equal(pkg.scripts['test:unit'], 'vitest run')
  assert.equal(typeof pkg.dependencies.next, 'string')
  assert.equal(typeof pkg.dependencies.pg, 'string')
  assert.equal(typeof pkg.devDependencies['@types/pg'], 'string')
  const lockfile = read('pnpm-lock.yaml')
  assert.match(lockfile, /lockfileVersion:/)
})

test('core institutional routes have page entrypoints', () => {
  const routes = ['', 'about', 'academics', 'admissions', 'gallery', 'contact', 'secondary', 'resources', 'news', 'calendar', 'search']
  for (const route of routes) {
    const file = route ? `app/${route}/page.tsx` : 'app/page.tsx'
    assert.ok(exists(file), `Missing route entrypoint: ${file}`)
  }
})

test('production metadata routes are present', () => {
  assert.ok(exists('app/sitemap.ts'))
  assert.ok(exists('app/robots.ts'))
  assert.ok(exists('app/layout.tsx'))
  assert.ok(exists('app/manifest.ts'))
})

test('public sitemap contains core institutional routes and excludes private areas', () => {
  const sitemap = read('app/sitemap.ts')
  for (const route of ['/about', '/academics', '/admissions', '/gallery', '/contact', '/news', '/calendar', '/resources']) {
    assert.match(sitemap, new RegExp(`['"]${route.replace('/', '\\/')}['"]`))
  }
  assert.doesNotMatch(sitemap, /['"]\/portal['"]|['"]\/admissions\/admin['"]|['"]\/api['"]|['"]\/api\//)
})

test('robots protects private and service routes', () => {
  const robots = read('app/robots.ts')
  assert.match(robots, /sitemap:/)
  assert.match(robots, /sitemap\.xml/)
  assert.match(robots, /['"]\/api['"]|['"]\/api\//)
  assert.match(robots, /['"]\/portal['"]|['"]\/portal\//)
})

test('motion system fails open so animation cannot hide page content', () => {
  const hook = read('hooks/use-scroll-animation.ts')
  const globals = read('app/globals.css')
  const motion = read('app/motion.css')
  assert.match(hook, /useState\(true\)/)
  assert.match(globals, /data-motion=\\"section\\"/)
  assert.match(motion, /\[data-motion=\\"section\\"\]\{ opacity:1; transform:none;/)
})

test('mobile navigation has resilient interaction controls', () => {
  const nav = read('components/navbar.tsx')
  assert.match(nav, /"use client"/)
  assert.match(nav, /setMobileOpen\(v => !v\)/)
  assert.match(nav, /aria-expanded=\{mobileOpen\}/)
  assert.match(nav, /role="dialog"/)
  assert.match(nav, /aria-modal="true"/)
  assert.match(nav, /event\.key === "Escape"/)
  assert.match(nav, /min-h-11 min-w-11/)
  assert.match(nav, /overscroll-contain/)
})

test('CI workflow uses the repository package manager', () => {
  const ci = read('.github/workflows/ci.yml')
  assert.match(ci, /pnpm\/action-setup@v4/)
  assert.match(ci, /version: 10\.15\.0/)
  assert.match(ci, /pnpm install --frozen-lockfile/)
  assert.match(ci, /pnpm run typecheck/)
  assert.match(ci, /pnpm test/)
  assert.match(ci, /pnpm run build/)
})

test('lockfile synchronization workflow is the active workflow and is non-destructive', () => {
  const workflow = read('.github/workflows/lockfile-sync.yml')
  assert.ok(!exists('.github/workflows/sync-lockfile.yml'), 'Removed duplicate lockfile workflow must stay removed')
  assert.match(workflow, /pnpm install --lockfile-only --ignore-scripts/)
  assert.match(workflow, /contents: write/)
  assert.match(workflow, /github-actions\[bot\]/)
  assert.match(workflow, /git diff --quiet -- pnpm-lock\.yaml/)
})

test('portal school-integrity migration is present and fail-closed', () => {
  const migration = read('supabase/migrations/0007_portal_school_integrity.sql')
  assert.match(migration, /PORTAL_INTEGRITY/)
  assert.match(migration, /CREATE OR REPLACE FUNCTION enforce_portal_school_integrity/)
  assert.match(migration, /enrollments_school_integrity/)
  assert.match(migration, /attendance_school_integrity/)
  assert.match(migration, /assessments_school_integrity/)
  assert.match(migration, /library_issues_school_integrity/)
  assert.match(migration, /quality_evidence_school_integrity/)
  assert.match(migration, /prevent_portal_parent_school_change/)
})

test('portal query indexes cover school-scoped student, assessment and library lookups', () => {
  const migration = read('supabase/migrations/0008_portal_query_indexes.sql')
  assert.match(migration, /attendance_student_school_date_idx/)
  assert.match(migration, /assessments_student_school_date_idx/)
  assert.match(migration, /library_issues_book_school_open_idx/)
  assert.match(migration, /library_issues_student_school_open_idx/)
  assert.match(migration, /where returned_at is null/)
})

test('portal relationship indexes cover latest enrollment and page-level aggregations', () => {
  const migration = read('supabase/migrations/0009_portal_relationship_indexes.sql')
  assert.match(migration, /enrollments_school_student_status_created_idx/)
  assert.match(migration, /assessments_school_student_date_idx/)
  assert.match(migration, /library_issues_school_book_open_idx/)
  assert.match(migration, /where returned_at is null/)
})

test('portal read queries enforce school scope and avoid duplicate active enrollments', () => {
  const portalData = read('lib/api/portal-data.ts')
  assert.match(portalData, /count\(distinct s\.id\)/)
  assert.match(portalData, /order by e\.created_at desc, e\.id desc/)
  assert.match(portalData, /where s\.school_id = \$1/)
  assert.match(portalData, /ar\.school_id = s\.school_id/)
  assert.match(portalData, /a\.school_id = s\.school_id/)
  assert.match(portalData, /where a\.school_id = \$1/)
  assert.match(portalData, /where b\.school_id = \$1/)
  assert.match(portalData, /with open_issues as/)
  assert.match(portalData, /left join open_issues oi/)
})

test('results archive is present and traceable', () => {
  const results = read('app/results/page.tsx')
  for (const year of ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025']) assert.match(results, new RegExp(year))
  assert.match(results, /PS0101160/)
  assert.match(results, /historicalArchive/)
  assert.match(results, /verified/)
})

test('public contact channels remain wired', () => {
  const nav = read('components/navbar.tsx')
  const contact = read('app/contact/page.tsx')
  assert.match(nav, /tel:\+255750227073/)
  assert.match(contact, /wa\.me\/255750227073/)
  assert.match(contact, /\+255 750 227 073/)
})

test('production fallback URL is the live Render service', () => {
  assert.match(read('app/sitemap.ts'), /sammena-school-website\.onrender\.com/)
  assert.match(read('app/robots.ts'), /sammena-school-website\.onrender\.com/)
})

test('institutional pages are not empty shells', () => {
  const routes = ['app/page.tsx', 'app/about/page.tsx', 'app/academics/page.tsx', 'app/admissions/page.tsx', 'app/gallery/page.tsx', 'app/news/page.tsx', 'app/results/page.tsx', 'app/contact/page.tsx', 'app/calendar/page.tsx', 'app/resources/page.tsx', 'app/secondary/page.tsx', 'app/search/page.tsx']
  for (const route of routes) {
    const source = read(route)
    assert.ok(source.length > 2500, `Suspiciously small page: ${route}`)
    assert.match(source, /<main[\s>]/, `Missing main content root: ${route}`)
    assert.match(source, /<section[\s>]/, `Missing section content: ${route}`)
  }
})

test('admissions service endpoints are implemented and not mock-only', () => {
  assert.ok(exists('app/api/admissions/route.ts'))
  assert.ok(exists('app/api/admissions/submit/route.ts'))
  assert.ok(exists('app/api/admissions/track/route.ts'))
  const intake = read('app/api/admissions/route.ts')
  const submit = read('app/api/admissions/submit/route.ts')
  const track = read('app/api/admissions/track/route.ts')
  const policy = read('lib/admissions/reference-validation.ts')
  assert.match(intake, /admissions\.createDraft/)
  assert.match(intake, /status: 201/)
  assert.match(submit, /admissions\.createDraft/)
  assert.match(submit, /academicYear: parsed\.data\.academicYear/)
  assert.match(submit, /studyType: parsed\.data\.studyType/)
  assert.match(submit, /relationship: parsed\.data\.relationship/)
  assert.match(submit, /admissions\.updateStatus\(application\.reference, "SUBMITTED"\)/)
  assert.doesNotMatch(submit, /application-store|Math\.random|createAdmissionReference/)
  assert.match(submit, /readJson<unknown>/)
  assert.match(submit, /requestId\(request\)/)
  assert.match(submit, /status: 201/)
  assert.match(track, /admissions\.getByReference/)
  assert.match(track, /status: 404/)
  assert.match(track, /isValidAdmissionReference/)
  assert.match(policy, /SAM-\\d\{4\}-\[A-Z0-9\]\{6\}/)
})

test('admission form submits to the server and never fabricates references', () => {
  const page = read('app/admissions/apply/page.tsx')
  assert.match(page, /fetch\("\/api\/admissions\/submit"/)
  assert.match(page, /method:"POST"/)
  assert.match(page, /JSON\.stringify\(form\)/)
  assert.match(page, /payload\.data\?\.reference/)
  assert.match(page, /setReference\(payload\.data\.reference\)/)
  assert.match(page, /Application submitted/)
  assert.match(page, /Track application/)
  assert.match(page, /disabled=\{submitting\}/)
  assert.match(page, /consent/)
  assert.doesNotMatch(page, /Math\.random|makeReference/)
})

test('admission schema requires affirmative consent at the server boundary', () => {
  const schema = read('lib/admissions/application-schema.ts')
  assert.match(schema, /consent: z\.literal\(true\)/)
})

test('admission persistence uses the Prisma PostgreSQL schema rather than a legacy applications table', () => {
  const repository = read('lib/db/repositories/admissions-postgres.ts')
  const migration = read('prisma/migrations/0002_admission_learner_fields/migration.sql')
  const schema = read('prisma/schema.prisma')
  assert.match(repository, /"AdmissionGuardian"/)
  assert.match(repository, /"AdmissionApplication"/)
  assert.doesNotMatch(repository, /insert into applications|from applications|update applications/i)
  assert.match(repository, /learnerFullName/)
  assert.match(repository, /learnerDateOfBirth/)
  assert.match(migration, /ADD COLUMN "learnerFullName"/)
  assert.match(migration, /ADD COLUMN "learnerDateOfBirth"/)
  assert.match(schema, /learnerFullName\s+String/)
  assert.match(schema, /learnerDateOfBirth\s+String/)
})

test('runtime database adapter is environment-driven and connection health is explicit', () => {
  const client = read('lib/db/client.ts')
  assert.match(client, /process\.env\.DATABASE_URL/)
  assert.match(client, /new Pool\(/)
  assert.match(client, /connectionTimeoutMillis/)
