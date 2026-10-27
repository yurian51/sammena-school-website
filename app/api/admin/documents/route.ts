export const dynamic = "force-dynamic"

import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { getRuntimeDbClient } from "@/lib/db/runtime"
import { apiError, mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { auditAction } from "@/lib/api/admin-audit"

function validDate(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value))
}

export async function GET(request: Request) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "library:write")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const result = await getRuntimeDbClient().query(
      `select v.id::text, v.resource_id::text as "resourceId", r.title as "resourceTitle",
              v.version_label as "versionLabel", v.document_date::text as "documentDate",
              v.effective_from::text as "effectiveFrom", v.effective_until::text as "effectiveUntil",
              v.source_url as "sourceUrl", v.change_summary as "changeSummary", v.status,
              v.created_at::text as "createdAt"
         from document_versions v
         join digital_library_resources r on r.id = v.resource_id and r.school_id = v.school_id
        where v.school_id = $1
        order by v.document_date desc, v.created_at desc
        limit 500`,
      [context.schoolId],
    )
    return Response.json({ data: result.rows, requestId: id }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) { return mapDomainError(error, id) }
}

export async function POST(request: Request) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "library:write")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const body = await request.json().catch((): null => null) as Record<string, unknown> | null
    if (!body || typeof body.resourceId !== "string" || !/^[0-9a-f-]{36}$/i.test(body.resourceId)
      || typeof body.versionLabel !== "string" || body.versionLabel.trim().length < 1 || body.versionLabel.trim().length > 80
      || !validDate(body.documentDate)
      || (body.effectiveFrom !== undefined && body.effectiveFrom !== null && !validDate(body.effectiveFrom))
      || (body.effectiveUntil !== undefined && body.effectiveUntil !== null && !validDate(body.effectiveUntil))
      || typeof body.sourceUrl !== "string" || !/^https:\/\//i.test(body.sourceUrl)
      || (body.changeSummary !== undefined && typeof body.changeSummary !== "string")
      || (body.status !== undefined && body.status !== "DRAFT" && body.status !== "PUBLISHED")) {
      return apiError("VALIDATION_ERROR", "Check the document version, dates and HTTPS source URL.", 400, id)
    }
    const effectiveFrom = typeof body.effectiveFrom === "string" ? body.effectiveFrom : null
    const effectiveUntil = typeof body.effectiveUntil === "string" ? body.effectiveUntil : null
    if (effectiveFrom && effectiveUntil && effectiveUntil < effectiveFrom) {
      return apiError("VALIDATION_ERROR", "The end date cannot be earlier than the effective date.", 400, id)
    }
    const status = body.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT"
    if (status === "PUBLISHED") requireAuthorized(context, "cms:publish")
    const result = await getRuntimeDbClient().query<{ id: string }>(
      `insert into document_versions
        (school_id, resource_id, version_label, document_date, effective_from, effective_until, source_url, change_summary, status, created_by)
       select $1, r.id, $3, $4::date, $5::date, $6::date, $7, $8, $9, $10
         from digital_library_resources r
        where r.id = $2 and r.school_id = $1
       on conflict (resource_id, version_label) do nothing
       returning id::text as id`,
      [context.schoolId, body.resourceId, body.versionLabel.trim(), body.documentDate, effectiveFrom, effectiveUntil,
        body.sourceUrl.trim(), typeof body.changeSummary === "string" ? body.changeSummary.trim().slice(0, 2000) : "", status, context.userId],
    )
    if (!result.rows[0]) return apiError("CONFLICT", "The resource was not found in this school, or this version label already exists.", 409, id)
    await auditAction(context, "DOCUMENT_VERSION_CREATED", "document_version", result.rows[0].id, id)
    return Response.json({ data: { id: result.rows[0].id, status }, requestId: id }, { status: 201, headers: { "Cache-Control": "no-store" } })
  } catch (error) { return mapDomainError(error, id) }
}
