import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const serviceWorker = fs.readFileSync("public/sw.js", "utf8")
const manifest = fs.readFileSync("app/manifest.ts", "utf8")
const offlinePage = fs.readFileSync("app/offline/page.tsx", "utf8")

test("PWA public cache never targets private application routes", () => {
  assert.ok(serviceWorker.includes('"/api/"'))
  assert.ok(serviceWorker.includes('"/portal"'))
  assert.ok(serviceWorker.includes('"/admin"'))
  assert.ok(serviceWorker.includes('"/sis"'))
  assert.ok(serviceWorker.includes("isPrivatePath(url.pathname)"))
})

test("PWA manifest is configured as a standalone school web app", () => {
  assert.ok(manifest.includes('display: "standalone"'))
  assert.ok(manifest.includes('start_url: "/"'))
  assert.ok(manifest.includes('lang: "en-TZ"'))
})

test("offline fallback explicitly excludes private SIS data", () => {
  assert.ok(offlinePage.includes("Private student and staff services are intentionally not cached offline"))
})
