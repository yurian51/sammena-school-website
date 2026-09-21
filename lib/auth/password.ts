import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto"

const KEY_LENGTH = 64
const SALT_BYTES = 16
const SCRYPT_OPTIONS = { N: 16384, r: 8, p: 1, maxmem: 32 * 1024 * 1024 }

export function hashPassword(password: string): string {
  if (password.length < 8) throw new Error("PASSWORD_TOO_SHORT")
  const salt = randomBytes(SALT_BYTES)
  const derived = scryptSync(password, salt, KEY_LENGTH, SCRYPT_OPTIONS)
  return `scrypt$16384$8$1$${salt.toString("base64url")}$${derived.toString("base64url")}`
}

export function verifyPassword(password: string, encoded: string): boolean {
  const parts = encoded.split("$")
  if (parts.length !== 6 || parts[0] !== "scrypt") return false
  const [, n, r, p, saltEncoded, hashEncoded] = parts
  const salt = Buffer.from(saltEncoded, "base64url")
  const expected = Buffer.from(hashEncoded, "base64url")
  if (salt.length !== SALT_BYTES || expected.length !== KEY_LENGTH) return false

  const actual = scryptSync(password, salt, KEY_LENGTH, {
    N: Number(n),
    r: Number(r),
    p: Number(p),
    maxmem: 32 * 1024 * 1024,
  })
  return timingSafeEqual(actual, expected)
}
