import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const read = file => fs.readFileSync(path.join(root, file), 'utf8')

test('student hub is server-backed and school-scoped', () => {
  const api = read('app/api/portal/student/route.ts')
  const data = read('lib/api/student-hub.ts')
  const migration = read('supabase/migrations/0012_student_hub.sql')
  const page = read('app/portal/student/page.tsx')

  assert.match(api, /getAuthContext\(request\)/)
  assert.match(api, /getStudentHubData\(context\)/)
  assert.match(api, /Cache-Control.*private, no-store/)
  assert.match(data, /auth\.role !== "STUDENT"/)
  assert.match(data, /auth\.schoolId/)
  assert.match(data, /sa\.user_id = \$1/)
  assert.match(data, /sa\.school_id = \$2/)
  assert.match(data, /s\.school_id = sa\.school_id/)
  assert.match(data, /ar\.school_id/)
  assert.match(data, /a\.school_id/)
  assert.match(data, /b\.school_id = \$2/)
  assert.match(migration, /create table if not exists student_accounts/)
  assert.match(migration, /unique \(school_id, user_id\)/)
  assert.match(migration, /unique \(student_id\)/)
  assert.match(migration, /student_linked_accounts/)
  assert.match(page, /fetch\("\/api\/portal\/student"/)
  assert.doesNotMatch(page, /Term 2 · 2026|94%|Room A|Ms\. Neema|Mr\. Juma|Coach Asha|Fee status|Assignments/) 
})
