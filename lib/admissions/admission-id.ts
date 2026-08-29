export function isValidAdmissionReference(reference: string) {
  return /^SAM-\d{4}-[A-Z0-9]{6}$/.test(reference.trim().toUpperCase())
}
