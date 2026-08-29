const REFERENCE_PATTERN = /^SAM-\d{4}-[A-Z0-9]{6}$/

export function isValidAdmissionReference(reference: string) {
  return REFERENCE_PATTERN.test(reference.trim().toUpperCase())
}
