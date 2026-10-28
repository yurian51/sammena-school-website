import { randomUUID } from "node:crypto"
import { NextResponse } from "next/server"
import { getAuthContext } from "@/lib/auth/session"
import { createSchoolAccount, type ManagedRole } from "@/lib/auth/school-accounts"
import { getRuntimeDbClient } from "@/lib/db/runtime"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const allowedRoles = new Set<ManagedRole>(["SCHOOL_ADMIN", "EDITOR", "TEACHER", "PARENT", "STUDENT"])

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: { message } }, { status, headers: { "Cache-Control": "no-store" } })
}

async function requireSuperAdmin(request: Request) {
  const context = await getAuthContext(request)
  if (!context || context.role !== "SUPER_ADMIN") return null
  return context
}

export async function GET(request: Request) {
  const actor = await requireSuperAdmin(request)
  if (!actor) return errorResponse("Super Admin access is required.", 403)
  if (!actor.schoolId) return errorResponse("The administrator is not linked to a school tenant.", 503)
  try {
    const db = getRuntimeDbClient()
    const result = await db.query(
      `select id, email, display_name, role, is_active, created_at
         from app_users where school_id = $1 order by created_at desc`,
      [actor.schoolId],
    )
    return NextResponse.json({ data: result.rows }, { headers: { "Cache-Control": "no-store" } })
  } catch {
    return errorResponse("Account storage is unavailable. Check the production database configuration and migrations.", 503)
  }
}

export async function POST(request: Request) {
  const actor = await requireSuperAdmin(request)
  if (!actor) return errorResponse("Super Admin access is required.", 403)
  if (!actor.schoolId) return errorResponse("The administrator is not linked to a school tenant.", 503)

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return errorResponse("Provide a valid JSON request.", 400)
  }

  const displayName = typeof body.displayName === "string" ? body.displayName.trim() : ""
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : ""
  const roleValue = typeof body.role === "string" ? body.role : ""
  const password = typeof body.password === "string" ? body.password : ""

  if (displayName.length < 2 || displayName.length > 120) return errorResponse("Name must contain 2 to 120 characters.", 400)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return errorResponse("Enter a valid email address.", 400)
  if (!allowedRoles.has(roleValue as ManagedRole)) return errorResponse("Choose an allowed school role. Super Admin accounts cannot be created here.", 400)
  const role = roleValue as ManagedRole
  if (password.length < 12 || password.length > 256) return errorResponse("Temporary password must contain at least 12 characters.", 400)

  try {
    const db = getRuntimeDbClient()
    const school = await db.query<{ id: string }>("select id from schools where id = $1 limit 1", [actor.schoolId])
    if (school.rows.length !== 1) return errorResponse("School tenant was not found.", 503)

    const account = await createSchoolAccount({
      schoolId: actor.schoolId,
      email,
      displayName,
      role,
      password,
      createdBy: actor.userId || randomUUID(),
    })
    return NextResponse.json({ data: account }, { status: 201, headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    const code = (error as { code?: string })?.code
    if (code === "23505") return errorResponse("An account with this email already exists for this school.", 409)
    return errorResponse("The account could not be created. Confirm the production database migrations are applied.", 503)
  }
}
