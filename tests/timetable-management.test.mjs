import test from "node:test"
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"

test("timetable management is permission and school scoped", async () => {
  const route = await readFile("app/api/sis/timetable/route.ts", "utf8")
  assert.match(route, /sis:timetable:read/)
  assert.match(route, /sis:timetable:write/)
  assert.match(route, /t\.school_id = \$1/)
  assert.match(route, /where id = \$1 and school_id = \$2/)
})

test("timetable writes validate period and clock boundaries", async () => {
  const route = await readFile("app/api/sis/timetable/route.ts", "utf8")
  assert.match(route, /dayOfWeek: z\.number\(\)\.int\(\)\.min\(1\)\.max\(7\)/)
  assert.match(route, /periodNumber: z\.number\(\)\.int\(\)\.min\(1\)\.max\(12\)/)
  assert.match(route, /End time must be after start time/)
})

test("timetable management workspace uses the real SIS API", async () => {
  const page = await readFile("app/portal/timetable/manage/page.tsx", "utf8")
  assert.match(page, /\/api\/sis\/timetable/)
  assert.match(page, /method:"POST"/)
  assert.match(page, /method:"DELETE"/)
})
