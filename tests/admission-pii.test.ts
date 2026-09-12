import { describe, expect, it, beforeEach } from "vitest"
import { decryptAdmissionPii, encryptAdmissionPii } from "../lib/security/pii"

describe("admission PII encryption", () => {
  beforeEach(() => {
    process.env.ADMISSIONS_PII_ENCRYPTION_KEY = "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
  })

  it("encrypts and decrypts NIDA without storing plaintext", () => {
    const nida = "12345678901234567890"
    const encrypted = encryptAdmissionPii(nida)

    expect(encrypted).toMatch(/^v1:/)
    expect(encrypted).not.toContain(nida)
    expect(decryptAdmissionPii(encrypted)).toBe(nida)
  })

  it("uses a fresh IV for repeated values", () => {
    const nida = "12345678901234567890"
    expect(encryptAdmissionPii(nida)).not.toBe(encryptAdmissionPii(nida))
  })

  it("rejects tampered ciphertext", () => {
    const encrypted = encryptAdmissionPii("12345678901234567890")
    const parts = encrypted.split(":")
    parts[3] = `${parts[3]}x`
    expect(() => decryptAdmissionPii(parts.join(":"))).toThrow()
  })

  it("requires a valid 32-byte key", () => {
    process.env.ADMISSIONS_PII_ENCRYPTION_KEY = "too-short"
    expect(() => encryptAdmissionPii("12345678901234567890")).toThrow("must decode to exactly 32 bytes")
  })
})
