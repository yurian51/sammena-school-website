import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { getRuntimeDbClient } from "@/lib/db/runtime"
import { mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"

export async function GET(request: Request) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "messages:read")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const url = new URL(request.url)
    const status = url.searchParams.get("status")
    const q = url.searchParams.get("q")?.trim() ?? ""
    const db = getRuntimeDbClient()
    const result = await db.query(
      "select id, sender_name, sender_email, sender_phone, subject, message, status, created_at, updated_at from contact_messages where school_id=$1 and ($2::text is null or status=$2) and ($3::text='' or sender_name ilike '%'||$3||'%' or sender_email ilike '%'||$3||'%' or subject ilike '%'||$3||'%' or message ilike '%'||$3||'%') order by created_at desc limit 100",
      [context.schoolId, status || null, q],
    )
    return Response.json({ data: result.rows, requestId: id }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) {
    return mapDomainError(error, id)
  }
}

export async function PATCH(request: Request) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "messages:write")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const body = await request.json()
    const messageId = typeof body?.id === "string" ? body.id : ""
    const status = typeof body?.status === "string" ? body.status : ""
    if (!messageId || !["UNREAD","READ","REPLIED","ARCHIVED"].includes(status)) throw new Error("VALIDATION_ERROR")
    const db = getRuntimeDbClient()
    const result = await db.query<{ id: string; status: string }>(
      `with updated as (
         update contact_messages
         set status=$1, updated_at=now()
         where id=$2 and school_id=$3
         returning id, status
       ), audited as (
         insert into audit_events (actor_user_id, action, entity_type, entity_id, request_id)
         select $4, 'CONTACT_MESSAGE_STATUS_UPDATED', 'contact_message', id, $5
         from updated
         returning entity_id
       )
       select id, status from updated`,
      [status, messageId, context.schoolId, context.userId, id],
    )
    if (!result.rows.length) throw new Error("NOT_FOUND")
    return Response.json({ data: result.rows[0], requestId: id })
  } catch (error) {
    return mapDomainError(error, id)
  }
}
