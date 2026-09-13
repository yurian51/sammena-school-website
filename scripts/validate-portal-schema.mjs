import { readFile } from "node:fs/promises"
import { resolve } from "node:path"

const migrationPath = resolve(process.cwd(), "supabase/migrations/0006_portal_data.sql")
const sql = await readFile(migrationPath, "utf8")

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
]

for (const constraint of requiredConstraints) {
  if (!sql.toLowerCase().includes(constraint)) {
    throw new Error(`Missing portal data integrity constraint: ${constraint}`)
  }
}

console.log(`Portal schema validation passed: ${requiredTables.length} tables and ${requiredConstraints.length} core constraints present.`)
