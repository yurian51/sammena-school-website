export type ContactFormInput = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export type ContactFormValidation =
  | { valid: true; value: ContactFormInput }
  | { valid: false; error: string }

export function validateContactForm(input: ContactFormInput): ContactFormValidation {
  const value = {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    subject: input.subject.trim(),
    message: input.message.trim(),
  }

  if (value.name.length < 2) return { valid: false, error: "Please provide your full name." }
  if (value.email.length < 5 || value.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) {
    return { valid: false, error: "Please provide a valid email address." }
  }
  const phoneDigits = value.phone.replace(/\D/g, "")
  if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    return { valid: false, error: "Please provide a valid phone number." }
  }
  if (value.subject.length < 2) return { valid: false, error: "Please select a subject." }
  if (value.message.length < 10) return { valid: false, error: "Please provide a message of at least 10 characters." }
  if (value.name.length > 100 || value.phone.length > 100 || value.subject.length > 100 || value.message.length > 2000) {
    return { valid: false, error: "One or more fields exceed the allowed length." }
  }

  return { valid: true, value }
}
