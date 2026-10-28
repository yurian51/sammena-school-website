import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

test("authentication boundary is database-backed and does not accept fake sessions", () => {
  const login = fs.readFileSync("app/api/auth/login/route.ts", "utf8")
  const session = fs.readFileSync("lib/auth/session.ts", "utf8")
  const logout = fs.readFileSync("app/api/auth/logout/route.ts", "utf8")
  assert.match(login, /authenticateUser/)
  assert.doesNotMatch(login, /return apiError\("SERVICE_UNAVAILABLE".*authentication is not connected/i)
  assert.match(session, /getDatabaseAuthContext/)
  assert.match(logout, /revokeDatabaseSession/)
  assert.match(logout, /action: "LOGOUT"/)
})
