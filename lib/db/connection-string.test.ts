import { describe, expect, it } from "vitest"
import { parseDatabaseUrl } from "./connection-string"

describe("parseDatabaseUrl", () => {
  it("reads a standard Supabase pooler URL", () => {
    expect(parseDatabaseUrl("postgresql://postgres.abc123:secret@aws-0-us-east-1.pooler.supabase.com:5432/postgres?sslmode=require")).toEqual({
      user: "postgres.abc123",
      password: "secret",
      host: "aws-0-us-east-1.pooler.supabase.com",
      port: 5432,
      database: "postgres",
      sslmode: "require",
    })
  })

  it("accepts unescaped @ and # inside the password", () => {
    const parsed = parseDatabaseUrl("postgresql://postgres.abc:pa@ss#word@host.example.com:5432/postgres?sslmode=require")
    expect(parsed?.password).toBe("pa@ss#word")
    expect(parsed?.host).toBe("host.example.com")
  })

  it("decodes percent-encoded passwords", () => {
    expect(parseDatabaseUrl("postgresql://u:p%40ss%23@h:5432/db")?.password).toBe("p@ss#")
  })

  it("defaults port and database when omitted", () => {
    const parsed = parseDatabaseUrl("postgres://u:p@h")
    expect(parsed?.port).toBe(5432)
    expect(parsed?.database).toBe("postgres")
    expect(parsed?.sslmode).toBeNull()
  })

  it("rejects strings that are not database URLs", () => {
    expect(parseDatabaseUrl("")).toBeNull()
    expect(parseDatabaseUrl("mysql://u:p@h:3306/db")).toBeNull()
    expect(parseDatabaseUrl("postgresql://nohost")).toBeNull()
    expect(parseDatabaseUrl("postgresql://u:p@h:99999/db")).toBeNull()
  })
})
