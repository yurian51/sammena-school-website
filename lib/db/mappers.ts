import type { ApplicationRow, CmsContentRow } from "./types"
import type { AdmissionsApplication } from "../admissions/types"
import type { CmsContent } from "../cms/types"

export function mapApplicationRow(row: ApplicationRow): AdmissionsApplication {
  return {
    reference: row.reference,
    status: row.status,
    guardian: { fullName: row.guardian_full_name, phone: row.guardian_phone, email: row.guardian_email ?? undefined },
    learner: { fullName: row.learner_full_name, dateOfBirth: row.learner_date_of_birth, entryLevel: row.learner_entry_level, previousSchool: row.learner_previous_school ?? undefined },
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function mapCmsRow(row: CmsContentRow): CmsContent {
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt ?? undefined,
    body: row.body,
    status: row.status,
    publishedAt: row.published_at ?? undefined,
    expiresAt: row.expires_at ?? undefined,
  }
}
