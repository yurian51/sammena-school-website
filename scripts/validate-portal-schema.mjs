import { readFile } from "node:fs/promises"
import { resolve } from "node:path"

const migrationPath = resolve(process.cwd(), "supabase/migrations/0006_portal_data.sql")
const integrityMigrationPath = resolve(process.cwd(), "supabase/migrations/0007_portal_school_integrity.sql")
const timetableMigrationPath = resolve(process.cwd(), "supabase/migrations/0012_student_timetable.sql")
const guardianIntegrityMigrationPath = resolve(process.cwd(), "supabase/migrations/0013_student_guardian_school_integrity.sql")
const sql = await readFile(migrationPath, "utf8")
const integritySql = await readFile(integrityMigrationPath, "utf8")
const timetableSql = await readFile(timetableMigrationPath, "utf8")
const guardianIntegritySql = await readFile(guardianIntegrityMigrationPath, "utf8")

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

const requiredExistingDataGuards = [
  "EXISTING_ENROLLMENT_STUDENT_SCHOOL_MISMATCH",
  "EXISTING_ENROLLMENT_ACADEMIC_YEAR_SCHOOL_MISMATCH",
  "EXISTING_ENROLLMENT_CLASS_SCHOOL_MISMATCH",
  "EXISTING_ATTENDANCE_SCHOOL_MISMATCH",
  "EXISTING_ASSESSMENT_SCHOOL_MISMATCH",
  "EXISTING_LIBRARY_BOOK_SCHOOL_MISMATCH",
  "EXISTING_LIBRARY_STUDENT_SCHOOL_MISMATCH",
  "EXISTING_QUALITY_INDICATOR_SCHOOL_MISMATCH",
]

for (const guard of requiredExistingDataGuards) {
  if (!integritySql.includes(guard)) {
    throw new Error(`Missing existing-data integrity guard: ${guard}`)
  }
}

const requiredTimetableContracts = [
  "create table if not exists student_timetable_entries",
  "unique (school_id, academic_year_id, class_id, day_of_week, period_number)",
  "student_timetable_school_integrity",
  "STUDENT_TIMETABLE_CLASS_SCHOOL_MISMATCH",
]
for (const contract of requiredTimetableContracts) {
  if (!timetableSql.toLowerCase().includes(contract.toLowerCase())) {
    throw new Error(`Missing student timetable schema contract: ${contract}`)
  }
}

const requiredGuardianIntegrityContracts = [
  "EXISTING_STUDENT_GUARDIAN_STUDENT_SCHOOL_MISMATCH",
  "EXISTING_STUDENT_GUARDIAN_GUARDIAN_SCHOOL_MISMATCH",
  "student_guardians_school_integrity",
  "STUDENT_GUARDIAN_STUDENT_SCHOOL_MISMATCH",
  "STUDENT_GUARDIAN_GUARDIAN_SCHOOL_MISMATCH",
]
for (const contract of requiredGuardianIntegrityContracts) {
  if (!guardianIntegritySql.includes(contract)) {
    throw new Error(`Missing guardian school-integrity contract: ${contract}`)
  }
}

console.log(`Portal schema validation passed: ${requiredTables.length} tables, ${requiredConstraints.length} core constraints, ${requiredIntegrityTriggers.length} school-integrity triggers, ${requiredExistingDataGuards.length} existing-data guards, and ${requiredTimetableContracts.length} timetable contracts, ${requiredGuardianIntegrityContracts.length} guardian-integrity contracts present.`)
