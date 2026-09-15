import type { ApplicationRow, CmsContentRow } from "./types"
import type { AdmissionApplication, AdmissionApplicationData } from "../admissions/types"
import type { CmsContent } from "../cms/types"

function mapApplicationData(value: Record<string, unknown> | null): AdmissionApplicationData | undefined {
  if (!value) return undefined
  return value as AdmissionApplicationData
}

export function mapApplicationRow(row: ApplicationRow): AdmissionApplication {
  return {
    reference: row.reference,
    status: row.status,
    academicYear: row.academic_year,
    studyType: row.study_type,
    guardian: {
      fullName: row.guardian_full_name,
      phone: row.guardian_phone,
      email: row.guardian_email ?? undefined,
      relationship: row.guardian_relationship ?? undefined,
    },
    learner: {
      fullName: row.learner_full_name,
      dateOfBirth: row.learner_date_of_birth,
      entryLevel: row.learner_entry_level,
      previousSchool: row.learner_previous_school ?? undefined,
    },
    applicationData: mapApplicationData(row.application_data),
    submittedAt: row.submitted_at ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function mapCmsRow(row: CmsContentRow): CmsContent {
  const base = { id: row.id, title: row.title, slug: row.slug, status: row.status, createdAt: row.created_at, updatedAt: row.updated_at, publishedAt: row.published_at ?? undefined }
  if (row.type === "NEWS") {
    if (!row.excerpt || !row.body || !row.category) throw new Error("INVALID_CMS_NEWS_ROW")
    return { ...base, type: "NEWS", excerpt: row.excerpt, body: row.body, category: row.category }
  }
  if (!row.summary || !row.priority) throw new Error("INVALID_CMS_ANNOUNCEMENT_ROW")
  return { ...base, type: "ANNOUNCEMENT", summary: row.summary, expiresAt: row.expires_at ?? undefined, priority: row.priority }
}
