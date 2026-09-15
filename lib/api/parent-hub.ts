import type { AuthContext } from "@/lib/auth/authorization"
import { requireAuthenticatedContext } from "@/lib/auth/authorization"
import { getDbClient } from "@/lib/db/client"

function requireParent(context: AuthContext | null) {
  const auth = requireAuthenticatedContext(context)
  if (auth.role !== "PARENT") throw new Error("FORBIDDEN")
  if (!auth.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
  return auth
}

export interface ParentHubStudent {
  id: string
  admissionNumber: string
  fullName: string
  className: string
  gender: "MALE" | "FEMALE"
  attendanceRate: number
  academicAverage: number
}

export interface ParentHubData {
  schoolId: string
  guardian: { name: string; relationship: string | null }
  students: ParentHubStudent[]
  attendance: { present: number; absent: number; late: number; excused: number; rate: number }
  recentAssessments: Array<{ id: string; studentName: string; subject: string; assessment: string; percentage: number; term: string; assessedAt: string }>
  library: { books: number; available: number }
}

export async function getParentHubData(context: AuthContext | null): Promise<ParentHubData> {
  const auth = requireParent(context)
  const db = getDbClient()
  const [guardian, students, attendance, assessments, library] = await Promise.all([
    db.query<{ name: string; relationship: string | null }>(
      `select g.full_name as name, g.relationship
       from guardian_accounts ga join guardians g on g.id = ga.guardian_id
       where ga.user_id = $1 and ga.school_id = $2
       limit 1`,
      [auth.userId, auth.schoolId],
    ),
    db.query<ParentHubStudent>(
      `select s.id::text,
        s.admission_number as "admissionNumber",
        concat_ws(' ', s.first_name, s.middle_name, s.last_name) as "fullName",
        coalesce(c.name, 'Unassigned') as "className",
        s.gender,
        coalesce(round((select count(*) filter (where ar.status in ('PRESENT','LATE')) * 100.0 / nullif(count(*),0)
          from attendance_records ar where ar.student_id = s.id and ar.school_id = s.school_id)::numeric, 1), 0)::float as "attendanceRate",
        coalesce(round((select avg(a.score / nullif(a.max_score,0) * 100)
          from assessments a where a.student_id = s.id and a.school_id = s.school_id)::numeric, 1), 0)::float as "academicAverage"
       from parent_linked_students pls
       join students s on s.id = pls.student_id
       left join lateral (
         select e.class_id from enrollments e
         where e.student_id = s.id and e.school_id = s.school_id and e.status = 'ACTIVE'
         order by e.created_at desc, e.id desc limit 1
       ) e on true
       left join classes c on c.id = e.class_id
       where pls.user_id = $1 and pls.school_id = $2 and s.is_active = true
       order by s.last_name, s.first_name, s.admission_number`,
      [auth.userId, auth.schoolId],
    ),
    db.query<{ present: number; absent: number; late: number; excused: number }>(
      `select count(*) filter (where ar.status = 'PRESENT')::int as present,
        count(*) filter (where ar.status = 'ABSENT')::int as absent,
        count(*) filter (where ar.status = 'LATE')::int as late,
        count(*) filter (where ar.status = 'EXCUSED')::int as excused
       from attendance_records ar
       where ar.school_id = $2 and ar.attendance_date >= current_date - interval '30 days'
       and exists (select 1 from parent_linked_students pls where pls.user_id = $1 and pls.school_id = ar.school_id and pls.student_id = ar.student_id)`,
      [auth.userId, auth.schoolId],
    ),
    db.query<{ id: string; studentName: string; subject: string; assessment: string; percentage: number; term: string; assessedAt: string }>(
      `select a.id::text,
        concat_ws(' ', s.first_name, s.middle_name, s.last_name) as "studentName",
        a.subject, a.assessment_name as assessment,
        round((a.score / nullif(a.max_score,0) * 100)::numeric, 1)::float as percentage,
        a.term, a.assessed_at::text as "assessedAt"
       from assessments a join students s on s.id = a.student_id and s.school_id = a.school_id
       where a.school_id = $2
       and exists (select 1 from parent_linked_students pls where pls.user_id = $1 and pls.school_id = a.school_id and pls.student_id = a.student_id)
       order by a.assessed_at desc, a.created_at desc limit 8`,
      [auth.userId, auth.schoolId],
    ),
    db.query<{ books: number; issued: number }>(
      `select coalesce(sum(b.quantity),0)::int as books,
        coalesce((select count(*) from library_issues i
          where i.school_id = $1 and i.returned_at is null
          and exists (
            select 1 from parent_linked_students pls
            where pls.user_id = $2 and pls.school_id = i.school_id and pls.student_id = i.student_id
          )),0)::int as issued
       from library_books b where b.school_id = $1`,
      [auth.schoolId, auth.userId],
    ),
  ])

  const att = attendance.rows[0]
  const total = (att?.present ?? 0) + (att?.absent ?? 0) + (att?.late ?? 0) + (att?.excused ?? 0)
  const rate = total ? Number((((att?.present ?? 0) + (att?.late ?? 0)) / total * 100).toFixed(1)) : 0
  const guardianRow = guardian.rows[0]
  if (!guardianRow) throw new Error("PARENT_ACCOUNT_NOT_LINKED")
  const lib = library.rows[0]

  return {
    schoolId: auth.schoolId,
    guardian: guardianRow,
    students: students.rows,
    attendance: { present: att?.present ?? 0, absent: att?.absent ?? 0, late: att?.late ?? 0, excused: att?.excused ?? 0, rate },
    recentAssessments: assessments.rows,
    library: { books: lib?.books ?? 0, available: Math.max(0, (lib?.books ?? 0) - (lib?.issued ?? 0)) },
  }
}
