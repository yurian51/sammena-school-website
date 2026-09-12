import type { ApplicationStatus } from "../admissions/types"
import type { CmsContentStatus } from "../cms/types"

export interface ApplicationRow {
  id: string
  reference: string
  status: ApplicationStatus
  academic_year: string
  study_type: "Day" | "Boarding"
  guardian_full_name: string
  guardian_phone: string
  guardian_secondary_phone: string | null
  guardian_nida_number: string
  guardian_email: string | null
  guardian_relationship: string | null
  learner_full_name: string
  learner_date_of_birth: string
  learner_entry_level: string
  learner_previous_school: string | null
  submitted_at: string | null
  created_at: string
  updated_at: string
}

export interface NewsRow {
  id: string
  type: "NEWS"
  title: string
  slug: string
  excerpt: string
  body: string
  category: string
  status: CmsContentStatus
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface AnnouncementRow {
  id: string
  type: "ANNOUNCEMENT"
  title: string
  slug: string
  summary: string
  priority: "NORMAL" | "IMPORTANT"
  status: CmsContentStatus
  published_at: string | null
  expires_at: string | null
  created_at: string
  updated_at: string
}

export type CmsContentRow = NewsRow | AnnouncementRow
