import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { getRuntimeDbClient } from "@/lib/db/runtime"
import { mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"

export async function GET(request: Request) {
  const id = requestId(request)
  try {
    requireAuthorized(await getAuthContext(request), "cms:read")
    const db = getRuntimeDbClient()
    const result = await db.query("select id::text, action, entity_type, entity_id::text, request_id, created_at::text from audit_events order by created_at desc limit 100")
    return Response.json({ data: result.rows, requestId: id }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) {
    return mapDomainError(error, id)
  }
}