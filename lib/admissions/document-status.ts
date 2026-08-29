export type DocumentStatus = "MISSING" | "PENDING_REVIEW" | "VERIFIED" | "REJECTED"
export type AdmissionDocument = { key: string; label: string; status: DocumentStatus; required: boolean }

export const defaultAdmissionDocuments: AdmissionDocument[] = [
  { key: "student_photo", label: "Student photo", status: "MISSING", required: true },
  { key: "birth_record", label: "Birth record / certificate", status: "MISSING", required: true },
  { key: "previous_school", label: "Previous school documentation", status: "MISSING", required: false },
  { key: "medical_information", label: "Medical information", status: "MISSING", required: false },
]

export function documentCompletion(documents: AdmissionDocument[]) {
  const required = documents.filter(document => document.required)
  const verified = required.filter(document => document.status === "VERIFIED")
  return { required: required.length, verified: verified.length, complete: required.length > 0 && verified.length === required.length, percentage: required.length ? Math.round((verified.length / required.length) * 100) : 0 }
}
