import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")

test("services directory exposes audience-oriented routes that exist in the application", () => {
  const services = read("app/services/page.tsx")
  assert.match(services, /href: \"\/admissions\"/)
  assert.match(services, /href: \"\/portal\/parent\"/)
  assert.match(services, /href: \"\/portal\/student\"/)
  assert.match(services, /href: \"\/portal\"/)
  assert.match(services, /href: \"\/portal\/library\"/)
  assert.match(services, /href: \"\/calendar\"/)
  assert.match(services, /href: \"\/resources\"/)
  assert.match(services, /Each destination below maps to an existing Sammena route\./)
})

test("homepage exposes the same audience pathways without inventing private records", () => {
  const gateway = read("components/audience-gateway.tsx")
  assert.match(gateway, /href: \"\/admissions\"/)
  assert.match(gateway, /href: \"\/portal\/parent\"/)
  assert.match(gateway, /href: \"\/portal\/student\"/)
  assert.match(gateway, /href: \"\/about\"/)
  assert.match(gateway, /href: \"\/services\"/)
  assert.match(gateway, /Prospective family/)
  assert.match(gateway, /Current family/)
  assert.match(gateway, /Current learner/)
})

test("public search indexes family and student service entry points", () => {
  const search = read("app/search/page.tsx")
  assert.match(search, /href: \"\/services\"/)
  assert.match(search, /href: \"\/portal\/parent\"/)
  assert.match(search, /href: \"\/portal\/student\"/)
  assert.match(search, /href: \"\/portal\"/)
  assert.match(search, /href: \"\/portal\/library\"/)
})

test("service search does not fabricate operational records", () => {
  const search = read("app/search/page.tsx")
  assert.doesNotMatch(search, /students\s*:\s*\[/)
  assert.doesNotMatch(search, /attendance\s*:\s*\{/)
  assert.doesNotMatch(search, /academicAverage\s*:/)
})
