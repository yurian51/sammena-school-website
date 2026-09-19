import test from "node:test"
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"

test("release gate has the required quality scripts", async () => {
  const pkg = JSON.parse(await readFile("package.json", "utf8"))
  for (const script of ["typecheck", "test", "test:unit", "test:data", "test:portal-schema", "build"]) {
    assert.equal(typeof pkg.scripts[script], "string", `missing script: ${script}`)
  }
})

test("release gate includes CI and production security baseline", async () => {
  const ci = await readFile(".github/workflows/ci.yml", "utf8")
  const next = await readFile("next.config.mjs", "utf8")
  assert.match(ci, /pnpm install --frozen-lockfile/)
  assert.match(ci, /pnpm run typecheck/)
  assert.match(ci, /pnpm run build/)
  assert.match(next, /X-Content-Type-Options/)
  assert.match(next, /Strict-Transport-Security/)
})
