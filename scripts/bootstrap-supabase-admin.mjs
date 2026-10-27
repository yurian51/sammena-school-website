#!/usr/bin/env node
/**
 * Create the first Sammena administrator in Supabase Auth.
 * Run locally with SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_EMAIL,
 * ADMIN_PASSWORD and SAMMENA_SCHOOL_ID in the environment. Never commit secrets.
 */
const url = process.env.SUPABASE_URL?.trim().replace(/\/$/, "")
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
const password = process.env.ADMIN_PASSWORD
const schoolId = process.env.SAMMENA_SCHOOL_ID?.trim()

if (!url || !serviceKey || !email || !password || !schoolId) {
  console.error("Missing required env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_EMAIL, ADMIN_PASSWORD, SAMMENA_SCHOOL_ID")
  process.exit(1)
}
if (password.length < 20) {
  console.error("ADMIN_PASSWORD must be at least 20 characters. Generate a random password and store it in a password manager.")
  process.exit(1)
}

const response = await fetch(`${url}/auth/v1/admin/users`, {
  method: "POST",
  headers: { "Content-Type": "application/json", apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
  body: JSON.stringify({
    email,
    password,
    email_confirm: true,
    app_metadata: { role: "SUPER_ADMIN", school_id: schoolId },
  }),
  cache: "no-store",
})
const result = await response.json().catch(() => ({}))
if (!response.ok) {
  console.error(`Supabase administrator creation failed (HTTP ${response.status}).`)
  if (response.status === 422 || response.status === 409) console.error("An account with this email may already exist. Do not overwrite its password automatically; review it in Supabase Auth first.")
  else if (result.msg || result.message) console.error(String(result.msg ?? result.message).slice(0, 240))
  process.exit(1)
}
console.log("Supabase SUPER_ADMIN account created.")
console.log(`User ID: ${result.id}`)
console.log(`Email: ${result.email}`)
console.log("The password was not printed. Store it in your password manager and remove ADMIN_PASSWORD from the shell environment.")
