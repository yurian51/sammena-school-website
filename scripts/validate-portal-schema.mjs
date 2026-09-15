import { readFile } from "node:fs/promises"
import { resolve } from "node:path"

const migrationPaths = [
  resolve(process.cwd(), "supabase/migrations/0006_portal_data.sql"),
  resolve(process.cwd(), "supabase/migrations/0007_school_scope_integrity.sql"),
]
const sql = (await Promise.all(migrationPaths.map(path => readFile(path, "utf8")))).join("\n")

const requiredTables = [
  "academic_years",
  "classes",
  "students",
  "guardians",
  "student_guardians",
  "enrollments",
  "attendance_records",
  "assessments",
  "library_books",
  "library_issues",
  "quality_domains",
  "quality_indicators",
  "quality_evidence",
  "quality_actions",
]

for (const table of requiredTables) {
  if (!new RegExp(`create\\s+table\\s+if\\s+not\\s+exists\\s+${table}\\b`, "i").test(sql)) {
    throw new Error(`Missing portal table definition: ${table}`)
  }
}

const requiredConstraints = [
  "unique (school_id, admission_number)",
  "unique (student_id, academic_year_id)",
  "unique (student_id, attendance_date)",
  "check (score <= max_score)",
  "check (progress between 0 and 100)",
  "enrollments_student_school_fk",
  "enrollments_academic_year_school_fk",
  "enrollments_class_school_fk",
  "attendance_student_school_fk",
  "assessments_student_school_fk",
  "student_guardians_student_school_fk",
  "student_guardians_guardian_school_fk",
  "library_issues_book_school_fk",
  "library_issues_student_school_fk",
  "quality_indicators_domain_school_fk",
  "quality_evidence_indicator_school_fk",
]

for (const constraint of requiredConstraints) {
  if (!sql.toLowerCase().includes(constraint.toLowerCase())) {
    throw new Error(`Missing portal data integrity constraint: ${constraint}`)
  }
}

console.log(`Portal schema validation passed: ${requiredTables.length} tables and ${requiredConstraints.length} core integrity checks present.`)
