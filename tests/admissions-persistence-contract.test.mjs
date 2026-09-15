import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")

test("admission submission persists the complete validated intake payload", () => {
  const route = read("app/api/admissions/submit/route.ts")
  const repository = read("lib/db/repositories/admissions-postgres.ts")
  assert.match(route, /applicationData:/)
  assert.match(route, /medical: parsed\.data\.medical/)
  assert.match(route, /allergies: parsed\.data\.allergies/)
  assert.match(route, /consentAccepted: true/)
  assert.match(repository, /"applicationData"/)
  assert.match(repository, /JSON\.stringify\(input\.applicationData \?\? \{\}\)/)
})

test("admission Prisma schema and migration define the same intake payload boundary", () => {
  const schema = read("prisma/schema.prisma")
  const migration = read("prisma/migrations/0003_admission_application_data/migration.sql")
  assert.match(schema, /applicationData\s+Json\?/) 
  assert.match(migration, /ADD COLUMN "applicationData" JSONB/)
})

test("admission row mapper exposes persisted intake data without inventing values", () => {
  const mapper = read("lib/db/mappers.ts")
  assert.match(mapper, /applicationData: mapApplicationData\(row\.application_data\)/)
  assert.match(mapper, /if \(!value\) return undefined/)
})
