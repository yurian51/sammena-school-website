import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { getRuntimeDbClient } from "@/lib/db/runtime"
import { mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { backendHealth } from "@/lib/api/health"

export async function GET(request: Request) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "cms:read")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const db = getRuntimeDbClient()
    const schoolId = context.schoolId

    const isSuperAdmin = context.role === "SUPER_ADMIN"

    const [applications, pendingApplications, cmsDrafts, cmsPublished, upcomingEvents, activeStudents, audit, health, publishedByType, institutionRow, institutionRows] = await Promise.all([
      db.query<{ count: number }>('select count(*)::int as count from applications'),
      db.query<{ count: number }>('select count(*)::int as count from applications where "status" in (\'SUBMITTED\',\'UNDER_REVIEW\',\'ASSESSMENT\')'),
      db.query<{ count: number }>("select count(*)::int as count from cms_content where status in ('DRAFT','REVIEW','APPROVED')"),
      db.query<{ count: number }>("select count(*)::int as count from cms_content where status = 'PUBLISHED'"),
      db.query<{ count: number }>("select count(*)::int as count from school_events where school_id = $1 and status = 'PUBLISHED' and starts_at >= now()", [schoolId]),
      db.query<{ count: number }>("select count(*)::int as count from students where school_id = $1 and is_active = true", [schoolId]),
      db.query<{ count: number }>("select count(*)::int as count from audit_events where created_at >= now() - interval '30 days'"),
      backendHealth(),
      db.query<{ type: string; count: number; latest: string | null }>("select type, count(*)::int as count, max(published_at)::text as latest from cms_content where status = 'PUBLISHED' group by type"),
      db.query<{ id: string; name: string; slug: string }>("select id, name, slug from schools where id = $1", [schoolId]),
      isSuperAdmin
        ? db.query<{ id: string; name: string; slug: string; activeStudents: number }>("select s.id, s.name, s.slug, (select count(*)::int from students st where st.school_id = s.id and st.is_active = true) as \"activeStudents\" from schools s order by s.name")
        : Promise.resolve({ rows: [] as { id: string; name: string; slug: string; activeStudents: number }[] }),
    ])

    const newsRow = publishedByType.rows.find((row) => row.type === "NEWS")
    const announcementRow = publishedByType.rows.find((row) => row.type === "ANNOUNCEMENT")
    const latestPublished = publishedByType.rows
      .map((row) => row.latest)
      .filter((value): value is string => Boolean(value))
      .sort()
      .at(-1) ?? null
    const institution = institutionRow.rows[0] ?? null

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
        website: {
          databaseStatus: health.database,
          healthStatus: health.status,
          publishedNews: newsRow?.count ?? 0,
          publishedAnnouncements: announcementRow?.count ?? 0,
          latestPublishedAt: latestPublished,
          checkedAt: health.timestamp,
        },
        institution,
        institutions: isSuperAdmin ? institutionRows.rows : [],
      },
      requestId: id,
    }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) {
    return mapDomainError(error, id)
  }
}
