import type { AuthContext } from "@/lib/auth/authorization"
import { requireAuthenticatedContext } from "@/lib/auth/authorization"
import { getDbClient } from "@/lib/db/client"

function requireStudent(context: AuthContext | null) {
  const auth = requireAuthenticatedContext(context)
  if (auth.role !== "STUDENT") throw new Error("FORBIDDEN")
  if (!auth.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
  return auth
}

export interface StudentHubData {
  schoolId: string
  student: {
    id: string
    admissionNumber: string
    fullName: string
    className: string
    gender: "MALE" | "FEMALE"
    dateOfBirth: string | null
    phone: string | null
    email: string | null
  }
  guardian: { name: string; phone: string | null; email: string | null; relationship: string | null } | null
  attendance: { present: number; absent: number; late: number; excused: number; rate: number }
  academicYearName: string
  academicAverage: number
  recentAssessments: Array<{ id: string; subject: string; assessment: string; percentage: number; term: string; assessedAt: string }>
  library: { books: number; issued: number; outstanding: number }
}

export async function getStudentHubData(context: AuthContext | null): Promise<StudentHubData> {
  const auth = requireStudent(context)
  const db = getDbClient()
  const [student, guardian, attendance, academicYear, assessments, library] = await Promise.all([
    db.query<StudentHubData["student"]>(
      `select s.id::text, s.admission_number as "admissionNumber",
        concat_ws(' ', s.first_name, s.middle_name, s.last_name) as "fullName",
        coalesce(c.name, 'Unassigned') as "className", s.gender,
        s.date_of_birth::text as "dateOfBirth", s.phone, s.email
       from student_linked_accounts sla
       join students s on s.id = sla.student_id and s.school_id = sla.school_id
       left join lateral (
         select e.class_id from enrollments e
         where e.student_id = s.id and e.school_id = s.school_id and e.status = 'ACTIVE'
         order by e.created_at desc, e.id desc limit 1
       ) e on true
       left join classes c on c.id = e.class_id
       where sla.user_id = $1 and sla.school_id = $2 and s.is_active = true
       limit 1`,
      [auth.userId, auth.schoolId],
    ),
    db.query<StudentHubData["guardian"]>(
      `select g.full_name as name, g.phone, g.email, sg.relationship
       from student_linked_accounts sla
       join student_guardians sg on sg.student_id = sla.student_id and sg.school_id = sla.school_id
       join guardians g on g.id = sg.guardian_id
       where sla.user_id = $1 and sla.school_id = $2
       order by sg.is_primary desc nulls last, sg.created_at asc, g.id
       limit 1`,
      [auth.userId, auth.schoolId],
    ),
    db.query<{ present: number; absent: number; late: number; excused: number }>(
      `select count(*) filter (where ar.status = 'PRESENT')::int as present,
        count(*) filter (where ar.status = 'ABSENT')::int as absent,
        count(*) filter (where ar.status = 'LATE')::int as late,
        count(*) filter (where ar.status = 'EXCUSED')::int as excused
       from attendance_records ar
       join student_linked_accounts sla on sla.student_id = ar.student_id and sla.school_id = ar.school_id
       where sla.user_id = $1 and sla.school_id = $2
         and ar.attendance_date >= current_date - interval '30 days'`,
      [auth.userId, auth.schoolId],
    ),
    db.query<{ name: string }>(
      `select name from academic_years
       where school_id = $1 and is_current = true
       order by starts_on desc, id desc limit 1`,
      [auth.schoolId],
    ),
    db.query<{
      id: string
      subject: string
      assessment: string
      percentage: number
      term: string
      assessedAt: string
      academicAverage: number
    }>(
      `with current_year as (
         select starts_on, ends_on
         from academic_years
         where school_id = $2 and is_current = true
         order by starts_on desc, id desc
         limit 1
       )
       select a.id::text, a.subject, a.assessment_name as assessment,
        round((a.score / nullif(a.max_score,0) * 100)::numeric, 1)::float as percentage,
        a.term, a.assessed_at::text as "assessedAt",
        round(avg(a.score / nullif(a.max_score,0) * 100) over ()::numeric, 1)::float as "academicAverage"
       from assessments a
       join student_linked_accounts sla on sla.student_id = a.student_id and sla.school_id = a.school_id
       left join current_year cy on true
       where sla.user_id = $1 and sla.school_id = $2
         and (cy.starts_on is null or a.assessed_at between cy.starts_on and cy.ends_on)
       order by a.assessed_at desc, a.created_at desc limit 8`,
      [auth.userId, auth.schoolId],
    ),
    db.query<{ books: number; issued: number }>(
      `select coalesce(sum(b.quantity),0)::int as books,
        coalesce((select count(*) from library_issues i
          join student_linked_accounts sla on sla.student_id = i.student_id and sla.school_id = i.school_id
          where sla.user_id = $1 and sla.school_id = $2 and i.returned_at is null),0)::int as issued
       from library_books b where b.school_id = $2`,
      [auth.userId, auth.schoolId],
    ),
  ])

  const studentRow = student.rows[0]
  if (!studentRow) throw new Error("STUDENT_ACCOUNT_NOT_LINKED")
  const att = attendance.rows[0]
  const total = (att?.present ?? 0) + (att?.absent ?? 0) + (att?.late ?? 0) + (att?.excused ?? 0)
  const rate = total ? Number((((att?.present ?? 0) + (att?.late ?? 0)) / total * 100).toFixed(1)) : 0
  const academicAverage = assessments.rows[0]?.academicAverage ?? 0
  const academicYearName = academicYear.rows[0]?.name ?? "Current academic records"
  const lib = library.rows[0]

  return {
    schoolId: auth.schoolId,
    student: studentRow,
    guardian: guardian.rows[0] ?? null,
    attendance: { present: att?.present ?? 0, absent: att?.absent ?? 0, late: att?.late ?? 0, excused: att?.excused ?? 0, rate },
    academicYearName,
    academicAverage,
    recentAssessments: assessments.rows.map(({ academicAverage: _average, ...row }) => row),
    library: { books: lib?.books ?? 0, issued: lib?.issued ?? 0, outstanding: lib?.issued ?? 0 },
  }
}
