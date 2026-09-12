import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto"

const ALGORITHM = "aes-256-gcm"
const VERSION = "v1"
const IV_BYTES = 12
const KEY_BYTES = 32

function getKey() {
  const encoded = process.env.ADMISSIONS_PII_ENCRYPTION_KEY?.trim()
  if (!encoded) throw new Error("ADMISSIONS_PII_ENCRYPTION_KEY is required")

  const key = /^[0-9a-fA-F]{64}$/.test(encoded) ? Buffer.from(encoded, "hex") : Buffer.from(encoded, "base64")
  if (key.length !== KEY_BYTES) throw new Error("ADMISSIONS_PII_ENCRYPTION_KEY must decode to exactly 32 bytes")
  return key
}

export function encryptAdmissionPii(value: string) {
  const iv = randomBytes(IV_BYTES)
  const cipher = createCipheriv(ALGORITHM, getKey(), iv)
  const ciphertext = Buffer.concat([cipher.update(value, "utf8"), cipher.final()])
  return `${VERSION}:${iv.toString("base64url")}:${cipher.getAuthTag().toString("base64url")}:${ciphertext.toString("base64url")}`
}

export function decryptAdmissionPii(value: string) {
  if (value === "") return ""
  const [version, ivText, tagText, ciphertextText] = value.split(":")
  if (version !== VERSION || !ivText || !tagText || !ciphertextText) throw new Error("INVALID_ENCRYPTED_PII")
  const iv = Buffer.from(ivText, "base64url")
  const tag = Buffer.from(tagText, "base64url")
  const ciphertext = Buffer.from(ciphertextText, "base64url")
  if (iv.length !== IV_BYTES || tag.length !== 16 || ciphertext.length === 0) throw new Error("INVALID_ENCRYPTED_PII")
  const decipher = createDecipheriv(ALGORITHM, getKey(), iv)
  decipher.setAuthTag(tag)
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8")
}
