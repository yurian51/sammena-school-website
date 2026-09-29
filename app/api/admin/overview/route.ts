import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { getRuntimeDbClient } from "@/lib/db/runtime"
import { mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"

export async function GET(request: Request) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "cms:read")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const db = getRuntimeDbClient()
    const schoolId = context.schoolId

    const [applications, pendingApplications, cmsDrafts, cmsPublished, upcomingEvents, activeStudents, audit, recentAudit] = await Promise.all([
      db.query<{ count: number }>('select count(*)::int as count from "AdmissionApplication"'),
      db.query<{ count: number }>('select count(*)::int as count from "AdmissionApplication" where "status" in (\'SUBMITTED\',\'UNDER_REVIEW\',\'ASSESSMENT\')'),
      db.query<{ count: number }>("select count(*)::int as count from cms_content where status in ('DRAFT','REVIEW','APPROVED')"),
      db.query<{ count: number }>("select count(*)::int as count from cms_content where status = 'PUBLISHED'"),
      db.query<{ count: number }>("select count(*)::int as count from school_events where school_id = $1 and status = 'PUBLISHED' and starts_at >= now()", [schoolId]),
      db.query<{ count: number }>("select count(*)::int as count from students where school_id = $1 and is_active = true", [schoolId]),
      db.query<{ count: number }>("select count(*)::int as count from audit_events where created_at >= now() - interval '30 days'"),
      db.query<{ id: string; action: string; entity_type: string; entity_id: string | null; created_at: string }>("select id, action, entity_type, entity_id, created_at from audit_events order by created_at desc limit 8"),
    ])

    return Response.json({
      data: {
        role: context.role,
        schoolId,
        applications: applications.rows[0]?.count ?? 0,
        pendingApplications: pendingApplications.rows[0]?.count ?? 0,
        draftContent: cmsDrafts.rows[0]?.count ?? 0,
        publishedContent: cmsPublished.rows[0]?.count ?? 0,
        upcomingEvents: upcomingEvents.rows[0]?.count ?? 0,
        activeStudents: activeStudents.rows[0]?.count ?? 0,
        auditEvents30d: audit.rows[0]?.count ?? 0,
        recentActivity: recentAudit.rows,
      },
      requestId: id,
    }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) {
    return mapDomainError(error, id)
  }
}
