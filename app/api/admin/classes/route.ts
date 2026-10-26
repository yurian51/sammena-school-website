import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { getRuntimeDbClient } from "@/lib/db/runtime"
import { mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { assignedClassIds } from "@/lib/auth/teacher-scope"

export async function GET(request: Request) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "attendance:read")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const scope = await assignedClassIds(context)
    const { rows } = await getRuntimeDbClient().query(
      `select id, name, level_order as "levelOrder" from classes where school_id = $1 and ($2::uuid[] is null or id = any($2::uuid[])) order by level_order, name`,
      [context.schoolId, scope === "all" ? null : scope],
    )
    return Response.json({ data: rows, requestId: id }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) {
    return mapDomainError(error, id)
  }
}
