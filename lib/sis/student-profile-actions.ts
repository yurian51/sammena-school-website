export type StudentProfileAction =
  | "edit_student"
  | "add_guardian"
  | "manage_enrollment"
  | "record_attendance"
  | "view_results"
  | "view_fees"
  | "manage_documents"
  | "print_student_id"
  | "generate_report_card"
  | "contact_guardian"

export interface StudentProfileActionContext {
  role: "admin" | "teacher" | "finance" | "parent"
  hasGuardian: boolean
  hasEnrollment: boolean
}

export function getAvailableStudentProfileActions(
  context: StudentProfileActionContext,
): StudentProfileAction[] {
  const actions: StudentProfileAction[] = []

  if (context.role === "admin") {
    actions.push(
      "edit_student",
      "add_guardian",
      "manage_enrollment",
      "manage_documents",
      "print_student_id",
      "generate_report_card",
    )
  }

  if (context.role === "teacher" && context.hasEnrollment) {
    actions.push("record_attendance", "view_results", "generate_report_card")
  }

  if (context.role === "finance") {
    actions.push("view_fees")
  }

  if (context.role === "admin" || context.role === "teacher") {
    if (context.hasGuardian) actions.push("contact_guardian")
  }

  return [...new Set(actions)]
}
