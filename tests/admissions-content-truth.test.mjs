import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"

const read = (path) => fs.readFileSync(path, "utf8")

test("admissions does not advertise unverified boarding availability", () => {
  const constants = read("lib/admissions/admission-constants.ts")
  const schema = read("lib/admissions/application-schema.ts")
  const validation = read("lib/admissions/validation.ts")
  const page = read("app/admissions/apply/page.tsx")

  assert.match(constants, /STUDY_TYPES = \["Day"\]/)
  assert.match(schema, /studyType: z\.literal\("Day"\)/)
  assert.match(validation, /input\.studyType !== "Day"/)
  assert.match(page, /STUDY_TYPES/)
  assert.doesNotMatch(page, /options=\{\["Day","Boarding"\]\}/)
})
