import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")

test("student hub migration creates a school-scoped student account boundary", () => {
  const sql = read("supabase/migrations/0011_student_hub.sql")
  assert.match(sql, /create table if not exists student_accounts/i)
  assert.match(sql, /unique \(school_id, user_id\)/i)
  assert.match(sql, /unique \(student_id\)/i)
  assert.match(sql, /student_linked_accounts/i)
  assert.match(sql, /assessments_student_school_date_idx/i)
  assert.match(sql, /attendance_student_school_date_idx/i)
})

test("student hub service enforces student role and school scope", () => {
  const source = read("lib/api/student-hub.ts")
  assert.match(source, /requireAuthenticatedContext\(context\)/)
  assert.match(source, /auth\.role !== \"STUDENT\"/)
  assert.match(source, /!auth\.schoolId/)
  assert.match(source, /sla\.user_id = \$1/)
  assert.match(source, /sla\.school_id = \$2/)
})

test("student academic data is scoped to the current academic year when configured", () => {
  const source = read("lib/api/student-hub.ts")
  assert.match(source, /from academic_years/i)
  assert.match(source, /is_current = true/i)
  assert.match(source, /a\.assessed_at between cy\.starts_on and cy\.ends_on/i)
  assert.match(source, /avg\(a\.score \/ nullif\(a\.max_score,0\) \* 100\) over \(\)/i)
})

test("student hub API is private and no-store", () => {
  const source = read("app/api/portal/student/route.ts")
  assert.match(source, /getAuthContext\(request\)/)
  assert.match(source, /getStudentHubData\(context\)/)
  assert.match(source, /Cache-Control.*private, no-store/)
  assert.match(source, /mapDomainError\(error, id\)/)
})

test("student hub does not depend on school-wide assessment or library counts", () => {
  const source = read("lib/api/student-hub.ts")
  assert.doesNotMatch(source, /where a\.school_id = \$2\s+order by/i)
  assert.match(source, /join student_linked_accounts sla on sla\.student_id = a\.student_id and sla\.school_id = a\.school_id/i)
  assert.match(source, /sla\.student_id = i\.student_id and sla\.school_id = i\.school_id/i)
})

test("student portal exposes identity and guardian data from the authenticated student boundary", () => {
  const source = read("lib/api/student-hub.ts")
  assert.match(source, /s\.date_of_birth::text as "dateOfBirth"/)
  assert.match(source, /join student_guardians sg on sg\.student_id = sla\.student_id and sg\.school_id = sla\.school_id/)
  assert.match(source, /join guardians g on g\.id = sg\.guardian_id/)
  assert.match(source, /sla\.user_id = \$1 and sla\.school_id = \$2/)
})

test("student SIS read permission is restricted to administrative roles", () => {
  const source = read("lib/auth/roles.ts")
  assert.match(source, /"sis:students:read"/)
  assert.match(source, /SUPER_ADMIN:.*sis:students:read/s)
  assert.match(source, /SCHOOL_ADMIN:.*sis:students:read/s)
  assert.doesNotMatch(source, /TEACHER: \[[^\]]*"sis:students:read"/)
  assert.doesNotMatch(source, /PARENT: \[[^\]]*"sis:students:read"/)
  assert.doesNotMatch(source, /STUDENT: \[[^\]]*"sis:students:read"/)
})
