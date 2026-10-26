import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { getRuntimeDbClient } from "@/lib/db/runtime"
import { mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { parseStatusFilter } from "@/lib/contact/inbox"

export async function GET(request: Request) {
  const id = requestId(request)
  try {
    requireAuthorized(await getAuthContext(request), "inbox:read")
    const status = parseStatusFilter(new URL(request.url).searchParams.get("status"))
    const { rows } = await getRuntimeDbClient().query(
      `select id, name, email, phone, subject, message, status, created_at, updated_at
         from contact_messages
        where ($1::text is null or status = $1)
        order by created_at desc
        limit 200`,
      [status ?? null],
    )
    return Response.json({ data: rows, requestId: id }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) {
    return mapDomainError(error, id)
  }
}
