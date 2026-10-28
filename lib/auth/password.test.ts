import { describe, expect, it } from "vitest"
import { hashPassword, verifyPassword } from "./password"

describe("password hashing", () => {
  it("hashes and verifies passwords without storing plaintext", () => {
    const password = "Correct-Horse-Battery-7!"
    const encoded = hashPassword(password)

    expect(encoded).toMatch(/^scrypt\$16384\$8\$1\$/)
    expect(encoded).not.toContain(password)
    expect(verifyPassword(password, encoded)).toBe(true)
    expect(verifyPassword("wrong-password", encoded)).toBe(false)
  })

  it("rejects short passwords", () => {
    expect(() => hashPassword("short")).toThrow("PASSWORD_TOO_SHORT")
  })
})
