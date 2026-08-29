export type AdmissionConsent = { privacyAccepted: boolean; termsAccepted: boolean; consentedAt: string }

export function validateAdmissionConsent(consent: Partial<AdmissionConsent>) {
  const errors: string[] = []
  if (consent.privacyAccepted !== true) errors.push("Privacy consent is required")
  if (consent.termsAccepted !== true) errors.push("Terms acceptance is required")
  return { valid: errors.length === 0, errors }
}
