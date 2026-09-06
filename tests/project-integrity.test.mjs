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
  assert.match(globals, /\[data-motion=\\"section\\"\]\{opacity:1!important/)
  assert.match(globals, /visibility:visible!important/)
  assert.match(motion, /\[data-motion=\\"section\\"\]\{ opacity:1; transform:none;/)
})

test('mobile navigation has resilient interaction controls', () => {
  const nav = read('components/navbar.tsx')
  assert.match(nav, /"use client"/)
  assert.match(nav, /setMobileOpen\(v => !v\)/)
  assert.match(nav, /aria-expanded=\{mobileOpen\}/)
  assert.match(nav, /aria-controls="mobile-navigation"/)
  assert.match(nav, /role="dialog"/)
  assert.match(nav, /aria-modal="true"/)
  assert.match(nav, /event\.key === "Escape"/)
  assert.match(nav, /min-h-11 min-w-11/)
  assert.match(nav, /overscroll-contain/)
  assert.match(nav, /safe-area-inset-bottom/)
  assert.match(nav, /const closeMobileMenu = \(\) => setMobileOpen\(false\)/)
  assert.match(nav, /onClick=\{closeMobileMenu\}/)
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
