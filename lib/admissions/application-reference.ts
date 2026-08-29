export function createAdmissionReference(year = new Date().getFullYear()): string {
  const suffix = crypto.randomUUID().replace(/-/g, "").slice(0, 6).toUpperCase()
  return `SAM-${year}-${suffix}`
}
