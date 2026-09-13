import { readFile } from "node:fs/promises"
import { resolve } from "node:path"

const migrationPath = resolve(process.cwd(), "supabase/migrations/0006_portal_data.sql")
const integrityMigrationPath = resolve(process.cwd(), "supabase/migrations/0007_portal_school_integrity.sql")
const sql = await readFile(migrationPath, "utf8")
const integritySql = await readFile(integrityMigrationPath, "utf8")

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

const requiredIntegrityTriggers = [
  "enrollments_school_integrity",
  "attendance_school_integrity",
  "assessments_school_integrity",
  "library_issues_school_integrity",
  "quality_evidence_school_integrity",
]

for (const trigger of requiredIntegrityTriggers) {
  if (!integritySql.toLowerCase().includes(trigger)) {
    throw new Error(`Missing portal school-integrity trigger: ${trigger}`)
  }
}

console.log(`Portal schema validation passed: ${requiredTables.length} tables, ${requiredConstraints.length} core constraints, and ${requiredIntegrityTriggers.length} school-integrity triggers present.`)
