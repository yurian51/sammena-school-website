export type ApplicationStatus = "DRAFT" | "SUBMITTED" | "UNDER_REVIEW" | "ASSESSMENT" | "DECISION" | "ACCEPTED" | "WAITLISTED" | "DECLINED" | "ENROLLED"

export interface ApplicationRow { id:string; reference:string; status:ApplicationStatus; guardian_full_name:string; guardian_phone:string; guardian_email:string|null; learner_full_name:string; learner_date_of_birth:string; learner_entry_level:string; learner_previous_school:string|null; created_at:string; updated_at:string }

export interface CmsContentRow {
  id:string; type:"NEWS"|"ANNOUNCEMENT"; title:string; slug:string; excerpt:string|null; body:string|null;
  category:string|null; summary:string|null; priority:"NORMAL"|"IMPORTANT"|null;
  status:"DRAFT"|"REVIEW"|"APPROVED"|"PUBLISHED"|"ARCHIVED"; published_at:string|null; expires_at:string|null; created_at:string; updated_at:string
}
