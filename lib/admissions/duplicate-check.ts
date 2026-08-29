export type AdmissionDuplicateCandidate = {
  learnerName: string
  dateOfBirth?: string
  guardianPhone?: string
}

const normalize = (value = "") => value.trim().toLowerCase().replace(/\s+/g, " ")
const digits = (value = "") => value.replace(/\D/g, "")

export function calculateDuplicateSignals(a: AdmissionDuplicateCandidate, b: AdmissionDuplicateCandidate) {
  const sameName = normalize(a.learnerName) === normalize(b.learnerName)
  const sameDob = Boolean(a.dateOfBirth && b.dateOfBirth && a.dateOfBirth === b.dateOfBirth)
  const samePhone = Boolean(a.guardianPhone && b.guardianPhone && digits(a.guardianPhone) === digits(b.guardianPhone))
  const score = Number(sameName) * 2 + Number(sameDob) * 2 + Number(samePhone)
  return { sameName, sameDob, samePhone, score, likelyDuplicate: score >= 4 }
}
