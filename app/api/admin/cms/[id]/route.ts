import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { PostgresCmsRepository } from "@/lib/db/repositories/cms-postgres"
import { mapDomainError, apiError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { auditAction } from "@/lib/api/admin-audit"
import { AUDIT_ACTIONS } from "@/lib/audit/events"

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "cms:write")
    const { id: contentId } = await params
    const repository = new PostgresCmsRepository()
    const existing = await repository.findById(contentId)
    if (!existing) return apiError("NOT_FOUND", "CMS content was not found.", 404, id)
    const body = await request.json() as Record<string, unknown>
    const title = typeof body.title === "string" ? body.title.trim() : existing.title
    if (!title) return apiError("VALIDATION_ERROR", "A title is required.", 400, id)
    const slug = typeof body.slug === "string" && body.slug.trim() ? body.slug.trim() : existing.slug
    const updated = existing.type === "NEWS"
      ? { ...existing, title, slug, excerpt: typeof body.excerpt === "string" ? body.excerpt.trim() : existing.excerpt, body: typeof body.body === "string" ? body.body.trim() : existing.body, category: typeof body.category === "string" && body.category.trim() ? body.category.trim() : existing.category, updatedAt: new Date().toISOString() }
      : { ...existing, title, slug, summary: typeof body.summary === "string" ? body.summary.trim() : existing.summary, priority: body.priority === "IMPORTANT" ? "IMPORTANT" as const : existing.priority, expiresAt: typeof body.expiresAt === "string" && body.expiresAt ? body.expiresAt : existing.expiresAt, updatedAt: new Date().toISOString() }
    const data = await repository.update(updated)
    await auditAction(context, AUDIT_ACTIONS.CMS_UPDATED, "cms_content", data.id, id)
    return Response.json({ data, requestId: id })
  } catch (error) { return mapDomainError(error, id) }
}
