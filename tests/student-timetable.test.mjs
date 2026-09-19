import test from "node:test"
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"

test("student timetable migration defines school-safe scheduling", async () => {
  const sql = await readFile("supabase/migrations/0012_student_timetable.sql", "utf8")
  assert.match(sql, /create table if not exists student_timetable_entries/i)
  assert.match(sql, /unique \(school_id, academic_year_id, class_id, day_of_week, period_number\)/i)
  assert.match(sql, /student_timetable_school_integrity/i)
  assert.match(sql, /STUDENT_TIMETABLE_CLASS_SCHOOL_MISMATCH/i)
})

test("student timetable endpoint is authenticated and private", async () => {
  const route = await readFile("app/api/portal/student/timetable/route.ts", "utf8")
  assert.match(route, /getAuthContext/)
  assert.match(route, /getStudentTimetable/)
  assert.match(route, /private, no-store/)
})
