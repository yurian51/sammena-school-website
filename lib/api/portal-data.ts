import { getDbClient } from "@/lib/db/client"
import type { AuthContext } from "@/lib/auth/authorization"
import type { PaginationInput, PaginationMeta } from "@/lib/api/pagination"
import type { PortalAssessment, PortalLibraryBook, PortalStudent } from "@/lib/portal/types"
import type { PortalSummary } from "@/lib/api/portal"
import type { QualityDomain, QualitySummary } from "@/lib/api/quality"

function requireSchoolId(context: AuthContext): string {
  if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
  return context.schoolId
}

function meta(page: number, pageSize: number, total: number): PaginationMeta {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(page, totalPages)
  return { page: safePage, pageSize, total, totalPages, hasNextPage: safePage < totalPages, hasPreviousPage: safePage > 1 }
}

export async function getPortalSummaryData(context: AuthContext): Promise<PortalSummary> {
  const schoolId = requireSchoolId(context)
  const db = getDbClient()
  const [students, attendance, academics, library, quality] = await Promise.all([
    db.query<{ total: number; pre_primary: number; standard_one: number }>(
      `select count(distinct s.id)::int as total,
        count(distinct s.id) filter (where c.name in ('Pre-primary','Awali'))::int as pre_primary,
        count(distinct s.id) filter (where c.name in ('Standard I','Darasa la I'))::int as standard_one
       from students s
       left join enrollments e on e.student_id = s.id and e.school_id = s.school_id and e.status = 'ACTIVE'
       left join classes c on c.id = e.class_id
       where s.school_id = $1 and s.is_active = true`,
      [schoolId],
    ),
    db.query<{ present: number; absent: number; late: number }>(
      `select
        count(*) filter (where status = 'PRESENT')::int as present,
        count(*) filter (where status = 'ABSENT')::int as absent,
        count(*) filter (where status = 'LATE')::int as late
       from attendance_records
       where school_id = $1 and attendance_date = current_date`,
      [schoolId],
    ),
    db.query<{ average: number | null }>(
      `select round(coalesce(avg(score / nullif(max_score, 0) * 100), 0), 1)::float as average
       from assessments where school_id = $1`,
      [schoolId],
    ),
    db.query<{ books: number; issued: number }>(
      `select coalesce(sum(b.quantity), 0)::int as books,
        coalesce((select count(*) from library_issues i where i.school_id = $1 and i.returned_at is null), 0)::int as issued
       from library_books b where b.school_id = $1`,
      [schoolId],
    ),
    db.query<{ overall: number | null; evidence: number; open_actions: number }>(
      `select
        round(coalesce(avg(qi.score), 0), 1)::float as overall,
        coalesce((select count(*) from quality_evidence qe where qe.school_id = $1), 0)::int as evidence,
        coalesce((select count(*) from quality_actions qa where qa.school_id = $1 and qa.status in ('OPEN','IN_PROGRESS')), 0)::int as open_actions
       from quality_indicators qi
       join quality_domains qd on qd.id = qi.domain_id
       where qd.school_id = $1 and qi.score is not null`,
      [schoolId],
    ),
  ])

  const student = students.rows[0]
  const att = attendance.rows[0]
  const totalAttendance = (att?.present ?? 0) + (att?.absent ?? 0) + (att?.late ?? 0)
  const attendanceRate = totalAttendance === 0 ? 0 : Number((((att?.present ?? 0) + (att?.late ?? 0)) / totalAttendance * 100).toFixed(1))
  const lib = library.rows[0]
  const q = quality.rows[0]

  return {
    schoolId,
    role: context.role,
    students: { total: student?.total ?? 0, prePrimary: student?.pre_primary ?? 0, standardOne: student?.standard_one ?? 0 },
    attendance: { present: att?.present ?? 0, absent: att?.absent ?? 0, late: att?.late ?? 0, rate: attendanceRate },
    academics: { average: academics.rows[0]?.average ?? 0 },
    library: { books: lib?.books ?? 0, available: Math.max(0, (lib?.books ?? 0) - (lib?.issued ?? 0)), issued: lib?.issued ?? 0 },
    quality: { overall: q?.overall ?? 0, openActions: q?.open_actions ?? 0 },
  }
}

export async function listStudentsData(context: AuthContext, className: string | undefined, pagination: PaginationInput) {
  const schoolId = requireSchoolId(context)
  const db = getDbClient()
  const filter = className?.trim() || null
  const countResult = await db.query<{ total: number }>(
    `select count(*)::int as total
     from students s
     left join lateral (
       select e.class_id
       from enrollments e
       where e.student_id = s.id and e.school_id = s.school_id and e.status = 'ACTIVE'
       order by e.created_at desc, e.id desc
       limit 1
     ) e on true
     left join classes c on c.id = e.class_id
     where s.school_id = $1 and ($2::text is null or lower(c.name) = lower($2))`,
    [schoolId, filter],
  )
  const total = countResult.rows[0]?.total ?? 0
  const page = Math.min(pagination.page, Math.max(1, Math.ceil(total / pagination.pageSize)))
  const offset = (page - 1) * pagination.pageSize
  const result = await db.query<PortalStudent>(
    `select s.id::text,
      s.admission_number as "admissionNumber",
      concat_ws(' ', s.first_name, s.middle_name, s.last_name) as "fullName",
      s.gender,
      coalesce(c.name, 'Unassigned') as "className",
      case when s.is_active then 'ACTIVE' else 'INACTIVE' end as status,
      coalesce(round((select count(*) filter (where ar.status in ('PRESENT','LATE')) * 100.0 / nullif(count(*),0) from attendance_records ar where ar.student_id = s.id and ar.school_id = s.school_id)::numeric, 1), 0)::float as "attendanceRate",
      coalesce(round((select avg(a.score / nullif(a.max_score,0) * 100) from assessments a where a.student_id = s.id and a.school_id = s.school_id)::numeric, 1), 0)::float as "academicAverage"
     from students s
     left join lateral (
       select e.class_id
       from enrollments e
       where e.student_id = s.id and e.school_id = s.school_id and e.status = 'ACTIVE'
       order by e.created_at desc, e.id desc
       limit 1
     ) e on true
     left join classes c on c.id = e.class_id
     where s.school_id = $1 and ($2::text is null or lower(c.name) = lower($2))
     order by s.last_name, s.first_name, s.admission_number
     limit $3 offset $4`,
    [schoolId, filter, pagination.pageSize, offset],
  )
  return { data: result.rows, meta: meta(page, pagination.pageSize, total) }
}

export async function listAssessmentsData(context: AuthContext, studentId: string | undefined, pagination: PaginationInput) {
  const schoolId = requireSchoolId(context)
  const db = getDbClient()
  const filter = studentId?.trim() || null
  const count = await db.query<{ total: number }>(
    `select count(*)::int as total from assessments where school_id = $1 and ($2::text is null or student_id::text = $2)`,
    [schoolId, filter],
  )
  const total = count.rows[0]?.total ?? 0
  const page = Math.min(pagination.page, Math.max(1, Math.ceil(total / pagination.pageSize)))
  const offset = (page - 1) * pagination.pageSize
  const result = await db.query<PortalAssessment>(
    `select a.id::text,
      a.student_id::text as "studentId",
      concat_ws(' ', s.first_name, s.middle_name, s.last_name) as "studentName",
      a.subject,
      a.assessment_name as assessment,
      a.score::float,
      a.max_score::float as "maxScore",
      round((a.score / nullif(a.max_score,0) * 100)::numeric, 1)::float as percentage,
      a.term,
      a.assessed_at::text as "assessedAt"
     from assessments a join students s on s.id = a.student_id and s.school_id = a.school_id
     where a.school_id = $1 and ($2::text is null or a.student_id::text = $2)
     order by a.assessed_at desc, a.created_at desc
     limit $3 offset $4`,
    [schoolId, filter, pagination.pageSize, offset],
  )
  return { data: result.rows, meta: meta(page, pagination.pageSize, total) }
}

export async function listLibraryData(context: AuthContext, category: string | undefined, pagination: PaginationInput) {
  const schoolId = requireSchoolId(context)
  const db = getDbClient()
  const filter = category?.trim() || null
  const count = await db.query<{ total: number }>(
    `select count(*)::int as total from library_books where school_id = $1 and ($2::text is null or lower(category) = lower($2))`,
    [schoolId, filter],
  )
  const total = count.rows[0]?.total ?? 0
  const page = Math.min(pagination.page, Math.max(1, Math.ceil(total / pagination.pageSize)))
  const offset = (page - 1) * pagination.pageSize
  const result = await db.query<PortalLibraryBook>(
    `with open_issues as (
       select school_id, book_id, count(*)::int as issued
       from library_issues
       where school_id = $1 and returned_at is null
       group by school_id, book_id
     )
     select b.id::text,
       b.accession_number as "accessionNumber",
       b.title,
       b.author,
       b.category,
       b.quantity,
       greatest(0, b.quantity - coalesce(oi.issued, 0))::int as available,
       coalesce(oi.issued, 0)::int as issued
      from library_books b
      left join open_issues oi on oi.book_id = b.id and oi.school_id = b.school_id
      where b.school_id = $1 and ($2::text is null or lower(b.category) = lower($2))
      order by b.title, b.accession_number
      limit $3 offset $4`,
    [schoolId, filter, pagination.pageSize, offset],
  )
  return { data: result.rows, meta: meta(page, pagination.pageSize, total) }
}

export async function getQualitySummaryData(context: AuthContext): Promise<QualitySummary> {
  const schoolId = requireSchoolId(context)
  const db = getDbClient()
  const [domains, totals] = await Promise.all([
    db.query<QualityDomain & { indicators_json: unknown }>(
      `select qd.name, round(coalesce(avg(qi.score),0),1)::float as score,
        coalesce(json_agg(qi.name order by qi.name) filter (where qi.id is not null), '[]') as indicators_json
       from quality_domains qd
       left join quality_indicators qi on qi.domain_id = qd.id
       where qd.school_id = $1
       group by qd.id, qd.name, qd.sort_order
       order by qd.sort_order, qd.name`,
      [schoolId],
    ),
    db.query<{ overall: number | null; evidence: number; open_actions: number }>(
      `select round(coalesce(avg(qi.score),0),1)::float as overall,
        (select count(*) from quality_evidence qe where qe.school_id = $1)::int as evidence,
        (select count(*) from quality_actions qa where qa.school_id = $1 and qa.status in ('OPEN','IN_PROGRESS'))::int as open_actions
       from quality_domains qd left join quality_indicators qi on qi.domain_id = qd.id
       where qd.school_id = $1 and qi.score is not null`,
      [schoolId],
    ),
  ])
  const total = totals.rows[0]
  return {
    schoolId,
    overall: total?.overall ?? 0,
    evidenceItems: total?.evidence ?? 0,
    domains: domains.rows.map((domain) => ({ name: domain.name, score: domain.score, indicators: Array.isArray(domain.indicators_json) ? domain.indicators_json.map(String) : [] })),
    openActions: total?.open_actions ?? 0,
  }
}
