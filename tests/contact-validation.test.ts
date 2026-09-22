import { describe, expect, it } from "vitest"
import { validateContactForm } from "@/lib/contact-validation"

const valid = {
  name: "  Sammena Parent  ",
  email: "  PARENT@EXAMPLE.ORG ",
  phone: " +255 750 227 073 ",
  subject: " Admissions Enquiry ",
  message: " I would like to ask about admissions. ",
}

describe("contact form validation", () => {
  it("normalizes a valid enquiry before handoff", () => {
    const result = validateContactForm(valid)
    expect(result).toEqual({
      valid: true,
      value: {
        name: "Sammena Parent",
        email: "parent@example.org",
        phone: "+255 750 227 073",
        subject: "Admissions Enquiry",
        message: "I would like to ask about admissions.",
      },
    })
  })

  it("rejects incomplete messages", () => {
    const result = validateContactForm({ ...valid, message: " short " })
    expect(result).toEqual({
      valid: false,
      error: "Please provide a message of at least 10 characters.",
    })
  })

  it("rejects malformed email addresses", () => {
    const result = validateContactForm({ ...valid, email: "not-an-email" })
    expect(result).toEqual({
      valid: false,
      error: "Please provide a valid email address.",
    })
  })

  it("rejects oversized fields", () => {
    const result = validateContactForm({ ...valid, message: "x".repeat(2001) })
    expect(result).toEqual({
      valid: false,
      error: "One or more fields exceed the allowed length.",
    })
  })
})
