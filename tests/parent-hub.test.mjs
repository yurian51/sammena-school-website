import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")

test("parent hub migration links authenticated users to guardians and students", () => {
  const sql = read("supabase/migrations/0010_parent_hub.sql")
  assert.match(sql, /create table if not exists guardian_accounts/i)
  assert.match(sql, /unique \(school_id, user_id\)/i)
  assert.match(sql, /student_guardians/i)
  assert.match(sql, /create or replace view parent_linked_students/i)
})

test("parent hub service requires a parent role and school scope", () => {
  const source = read("lib/api/parent-hub.ts")
  assert.match(source, /requireAuthenticatedContext\(context\)/)
  assert.match(source, /auth\.role !== \"PARENT\"/)
  assert.match(source, /!auth\.schoolId/)
  assert.match(source, /pls\.user_id = \$1/)
  assert.match(source, /pls\.school_id = \$2/)
})

test("parent library counts only open issues belonging to linked children", () => {
  const source = read("lib/api/parent-hub.ts")
  assert.match(source, /from library_issues i[\s\S]*i\.returned_at is null[\s\S]*exists \([\s\S]*parent_linked_students pls[\s\S]*pls\.user_id = \$2[\s\S]*pls\.student_id = i\.student_id/i)
})

test("parent hub UI is backed by private API data rather than fixture metrics", () => {
  const page = read("app/portal/parent/page.tsx")
  assert.match(page, /fetch\(\"\/api\/portal\/parent\"/)
  assert.doesNotMatch(page, /value=\"94%\"/)
  assert.doesNotMatch(page, /value=\"A−\"/)
  assert.match(page, /data\.students\.length/)
  assert.match(page, /data\.attendance\.rate/)
})
