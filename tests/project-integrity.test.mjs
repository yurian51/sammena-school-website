import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')

test('package scripts use the locked toolchain', () => {
  const pkg = JSON.parse(read('package.json'))
  assert.equal(pkg.packageManager, 'pnpm@10.15.0')
  assert.equal(pkg.scripts.typecheck, 'tsc --noEmit')
  assert.equal(pkg.scripts.test, 'node --test')
  assert.equal(typeof pkg.devDependencies.vitest, 'string')
  assert.equal(pkg.scripts['test:unit'], 'vitest run')
})

test('production metadata routes are present', () => {
  assert.ok(fs.existsSync(path.join(root, 'app', 'sitemap.ts')))
  assert.ok(fs.existsSync(path.join(root, 'app', 'robots.ts')))
  assert.ok(fs.existsSync(path.join(root, 'app', 'layout.tsx')))
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
  assert.match(robots, /['"]\/api\//)
  assert.match(robots, /['"]\/portal\//)
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

test('CI workflow uses the repository package manager', () => {
  const ci = read('.github/workflows/ci.yml')
  assert.match(ci, /pnpm\/action-setup@v4/)
  assert.match(ci, /version: 10\.15\.0/)
  assert.match(ci, /pnpm install --frozen-lockfile/)
  assert.match(ci, /pnpm run typecheck/)
  assert.match(ci, /pnpm test/)
  assert.match(ci, /pnpm run build/)
})
