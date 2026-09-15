import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")

test("services hub exposes audience-oriented routes without inventing private data", () => {
  const source = read("app/services/page.tsx")
  assert.match(source, /Parent & Family/)
  assert.match(source, /Student Hub/)
  assert.match(source, /\/portal\/parent/)
  assert.match(source, /\/portal\/student/)
  assert.match(source, /Data boundary/)
})

test("public search covers the services hub and core institutional journeys", () => {
  const source = read("app/search/page.tsx")
  for (const term of ["School Services", "Admissions", "Academic Results", "Academic Calendar", "Resources", "School Location", "Secondary School"]) {
    assert.ok(source.includes(term), `missing searchable entry: ${term}`)
  }
  assert.match(source, /const tokens = q\.split\(\/\\s\+\//)
})
