import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { getRuntimeDbClient } from "@/lib/db/runtime"
import { mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"

export async function GET(request: Request) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "cms:read")
    const db = getRuntimeDbClient()
    const checks = await Promise.all([
      db.query("select 1 as ok"),
      db.query("select to_regclass('public.cms_content') is not null as ok"),
      db.query("select to_regclass('public.school_events') is not null as ok"),
      db.query("select to_regclass('public.audit_events') is not null as ok"),
    ])
    return Response.json({ data: {
      role: context.role,
      schoolId: context.schoolId ?? null,
      database: checks[0].rows[0]?.ok === 1,
      cms: checks[1].rows[0]?.ok === true,
      calendar: checks[2].rows[0]?.ok === true,
      audit: checks[3].rows[0]?.ok === true,
      sessionMode: "Signed HTTP-only admin session",
      secretsExposed: false,
    }, requestId: id }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) { return mapDomainError(error, id) }
}
