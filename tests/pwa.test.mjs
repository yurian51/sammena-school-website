import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const serviceWorker = fs.readFileSync("public/sw.js", "utf8")
const manifest = fs.readFileSync("app/manifest.ts", "utf8")
const offlinePage = fs.readFileSync("app/offline/page.tsx", "utf8")

test("PWA public cache never targets private application routes", () => {
  assert.match(serviceWorker, /const PRIVATE_PREFIXES = \["\/api\/", "\/portal", "\/admin", "\/sis"\]/)
  assert.match(serviceWorker, /isPrivatePath\(url\.pathname\)/)
  assert.doesNotMatch(serviceWorker, /cache\.put\([^\n]*\/api\//)
})

test("PWA manifest is configured as a standalone school web app", () => {
  assert.match(manifest, /display: ['"]standalone['"]/)
  assert.match(manifest, /start_url: ['"]\/['"]/)
  assert.match(manifest, /lang: ['"]en-TZ['"]/)
})

test("offline fallback explicitly excludes private SIS data", () => {
  assert.match(offlinePage, /Private student and staff services are intentionally not cached offline/)
})
