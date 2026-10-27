import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { mapDomainError, apiError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { PostgresCmsRepository } from "@/lib/db/repositories/cms-postgres"
import { auditAction } from "@/lib/api/admin-audit"
import { AUDIT_ACTIONS } from "@/lib/audit/events"

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 120)
}

export async function GET(request: Request) {
  const id = requestId(request)
  try {
    requireAuthorized(await getAuthContext(request), "cms:write")
    const data = await new PostgresCmsRepository().listAll()
    return Response.json({ data, requestId: id }, {
      headers: { "Cache-Control": "no-store" },
    })
  } catch (error) {
    return mapDomainError(error, id)
  }
}

export async function POST(request: Request) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "cms:write")
    let body: { type?: string; title?: string; excerpt?: string; body?: string; category?: string; summary?: string; priority?: string; expiresAt?: string }
    try {
      body = await request.json()
    } catch {
      return apiError("VALIDATION_ERROR", "The submitted JSON is invalid.", 400, id)
    }

    const title = body.title?.trim()
    if (!title) return apiError("VALIDATION_ERROR", "A title is required.", 400, id)
    if (body.type !== "NEWS" && body.type !== "ANNOUNCEMENT") {
      return apiError("VALIDATION_ERROR", "Content type must be NEWS or ANNOUNCEMENT.", 400, id)
    }

    const now = new Date().toISOString()
    const content = body.type === "NEWS"
      ? { id: crypto.randomUUID(), type: "NEWS" as const, title, slug: slugify(title), excerpt: body.excerpt?.trim() ?? "", body: body.body?.trim() ?? "", category: body.category?.trim() || "School News", status: "DRAFT" as const, createdAt: now, updatedAt: now }
      : { id: crypto.randomUUID(), type: "ANNOUNCEMENT" as const, title, slug: slugify(title), summary: body.summary?.trim() ?? "", priority: body.priority === "IMPORTANT" ? "IMPORTANT" as const : "NORMAL" as const, expiresAt: body.expiresAt || undefined, status: "DRAFT" as const, createdAt: now, updatedAt: now }

    const data = await new PostgresCmsRepository().save(content)
    await auditAction(context, AUDIT_ACTIONS.CMS_CREATED, "cms_content", data.id, id)
    return Response.json({ data, requestId: id }, { status: 201, headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    return mapDomainError(error, id)
  }
}
