export function normalizeDuplicateKey(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]/g, "")
}

export function admissionDuplicateKeys(input: { learner: string; dob: string; phone: string }) {
  return {
    learnerDob: `${normalizeDuplicateKey(input.learner)}:${input.dob}`,
    phone: normalizeDuplicateKey(input.phone),
  }
}
