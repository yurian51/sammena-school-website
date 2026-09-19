import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const adminPage = fs.readFileSync("app/admissions/admin/page.tsx", "utf8")
const reviewPage = fs.readFileSync("app/admissions/admin/[reference]/page.tsx", "utf8")
const adminApi = fs.readFileSync("app/api/admin/admissions/[reference]/route.ts", "utf8")
const statusApi = fs.readFileSync("app/api/admin/admissions/[reference]/status/route.ts", "utf8")

test("admissions staff UI does not expose prototype applicant data", () => {
  assert.match(adminPage, /Staff authentication is unavailable/)
  assert.doesNotMatch(adminPage, /demoApplications|Pending applicant|School Administrator/)
  assert.match(reviewPage, /Applicant review requires staff authentication/)
  assert.doesNotMatch(reviewPage, /Applicant record pending live API connection|Accept|Reject/)
})

test("admissions staff APIs remain authorization-gated", () => {
  assert.match(adminApi, /getAuthContext/)
  assert.match(adminApi, /getStaffAdmission/)
  assert.match(statusApi, /getAuthContext/)
  assert.match(statusApi, /updateStaffAdmissionStatus/)
})
