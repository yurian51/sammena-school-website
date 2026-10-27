export const dynamic = "force-dynamic"
import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { getRuntimeDbClient } from "@/lib/db/runtime"
import { apiError, mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { auditAction } from "@/lib/api/admin-audit"
import { AUDIT_ACTIONS } from "@/lib/audit/events"
import { idParam } from "@/lib/library/library"

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "library:write")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const issueId = idParam.safeParse((await params).id)
    if (!issueId.success) return apiError("NOT_FOUND", "The loan was not found.", 404, id)
    const { rows } = await getRuntimeDbClient().query(
      `update library_issues set returned_at = now() where id = $1 and school_id = $2 and returned_at is null returning id, returned_at as "returnedAt"`,
      [issueId.data, context.schoolId],
    )
    if (!rows[0]) return apiError("NOT_FOUND", "The open loan was not found.", 404, id)
    await auditAction(context, AUDIT_ACTIONS.LIBRARY_BOOK_RETURNED, "library_issue", issueId.data, id)
    return Response.json({ data: rows[0], requestId: id })
  } catch (error) {
    return mapDomainError(error, id)
  }
}
