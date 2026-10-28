import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

test("admission submission exposes a bounded Idempotency-Key and persists a fingerprint", () => {
  const route = fs.readFileSync("app/api/admissions/submit/route.ts", "utf8")
  const service = fs.readFileSync("lib/admissions/service.ts", "utf8")
  const repository = fs.readFileSync("lib/db/repositories/admissions-postgres.ts", "utf8")
  assert.match(route, /Idempotency-Key/)
  assert.match(route, /length < 16/)
  assert.match(route, /length > 128/)
  assert.match(service, /findByIdempotencyKey/)
  assert.match(service, /findByFingerprint/)
  assert.match(repository, /"idempotencyKey"/)
  assert.match(repository, /"submissionFingerprint"/)
})
