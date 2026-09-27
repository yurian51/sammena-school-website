import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

test("school-core integrity migration protects cross-school relationships and duplicates", () => {
  const sql = fs.readFileSync("supabase/migrations/0015_school_core_integrity.sql", "utf8")
  assert.match(sql, /ASSESSMENT_STUDENT_SCHOOL_MISMATCH/)
  assert.match(sql, /ENROLLMENT_STUDENT_SCHOOL_MISMATCH/)
  assert.match(sql, /ENROLLMENT_ACADEMIC_YEAR_SCHOOL_MISMATCH/)
  assert.match(sql, /ENROLLMENT_CLASS_SCHOOL_MISMATCH/)
  assert.match(sql, /ATTENDANCE_STUDENT_SCHOOL_MISMATCH/)
  assert.match(sql, /ASSESSMENT_DUPLICATES_EXIST/)
  assert.match(sql, /ACTIVE_ENROLLMENT_DUPLICATES_EXIST/)
  assert.match(sql, /assessments_duplicate_guard_idx/)
  assert.match(sql, /active_enrollment_per_student_year_idx/)
})
