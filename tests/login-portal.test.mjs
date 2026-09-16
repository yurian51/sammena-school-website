import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = path => fs.readFileSync(path, "utf8")

test("login navigation exposes all four requested account types", () => {
  const navbar = read("components/navbar.tsx")
  for (const type of ["parent", "staff", "email", "admin"]) assert.match(navbar, new RegExp(`/login\\?type=${type}`))
  assert.match(navbar, /Parents Login/)
  assert.match(navbar, /Staff Login/)
  assert.match(navbar, /Email Login/)
  assert.match(navbar, /Web-Admin Login/)
})

test("login portal has one secure form with role-specific presentation", () => {
  const login = read("components/login-portal.tsx")
  assert.match(login, /type LoginAudience = \"parent\" \| \"staff\" \| \"email\" \| \"admin\"/)
  assert.match(login, /fetch\("\/api\/auth\/login"/)
  assert.match(login, /Remember this device/)
  assert.match(login, /Forgot password\?/)
  assert.match(login, /type=\$\{active\}/)
  assert.match(login, /Private school records remain behind authenticated access/)
})

test("login API never fabricates a successful session", () => {
  const route = read("app/api/auth/login/route.ts")
  assert.match(route, /AUTH_PROVIDER_NOT_CONFIGURED|authentication is not connected/i)
  assert.match(route, /503/)
  assert.doesNotMatch(route, /Response\.json\(\{\s*data:\s*\{\s*token/i)
})
