import type { AuthContext } from "@/lib/auth/authorization"
import { requirePermission } from "@/lib/auth/authorization"
import { getDbClient } from "@/lib/db/client"

export interface Student360Data {
  schoolId: string
  student: {
    id: string
    admissionNumber: string
    fullName: string
    gender: "MALE" | "FEMALE"
    dateOfBirth: string | null
    phone: string | null
    email: string | null
    isActive: boolean
  }
  guardian: {
    id: string
    fullName: string
    phone: string | null
    email: string | null
    relationship: string | null
  } | null
  enrollment: {
    className: string
    academicYear: string
    status: string
  } | null
  attendance: {
    present: number
    absent: number
    late: number
    excused: number
    rate: number
  }
  academics: {
    average: number
    assessments: Array<{
      id: string
      subject: string
      assessment: string
      percentage: number
      term: string
      assessedAt: string
    }>
  }
  library: {
    issued: number
    outstanding: number
  }
}

export async function getStudent360Data(context: AuthContext | null, studentId: string): Promise<Student360Data> {
  const auth = requirePermission(context, "sis:students:read")
  if (!auth.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
  if (!studentId) throw new Error("STUDENT_ID_REQUIRED")

  const db = getDbClient()
  const [student, guardian, enrollment, attendance, academics, library] = await Promise.all([
    db.query<Student360Data["student"]>(
      `select s.id::text, s.admission_number as "admissionNumber",
        concat_ws(' ', s.first_name, s.middle_name, s.last_name) as "fullName",
        s.gender, s.date_of_birth::text as "dateOfBirth", s.phone, s.email,
        s.is_active as "isActive"
       from students s
       where s.id = $1 and s.school_id = $2
       limit 1`,
      [studentId, auth.schoolId],
    ),
    db.query<Student360Data["guardian"]>(
      `select g.id::text, g.full_name as "fullName", g.phone, g.email, sg.relationship
       from student_guardians sg
       join guardians g on g.id = sg.guardian_id
       where sg.student_id = $1 and sg.school_id = $2
       order by sg.is_primary desc nulls last, sg.created_at asc, g.id
       limit 1`,
      [studentId, auth.schoolId],
    ),
    db.query<Student360Data["enrollment"]>(
      `select c.name as "className", ay.name as "academicYear", e.status
       from enrollments e
       join classes c on c.id = e.class_id and c.school_id = e.school_id
       join academic_years ay on ay.id = e.academic_year_id and ay.school_id = e.school_id
       where e.student_id = $1 and e.school_id = $2
       order by (e.status = 'ACTIVE') desc, ay.starts_on desc, e.created_at desc
       limit 1`,
      [studentId, auth.schoolId],
    ),
    db.query<{ present: number; absent: number; late: number; excused: number }>(
      `select count(*) filter (where status = 'PRESENT')::int as present,
        count(*) filter (where status = 'ABSENT')::int as absent,
        count(*) filter (where status = 'LATE')::int as late,
        count(*) filter (where status = 'EXCUSED')::int as excused
       from attendance_records
       where student_id = $1 and school_id = $2`,
      [studentId, auth.schoolId],
    ),
    db.query<Student360Data["academics"]["assessments"][number] & { average: number }>(
      `select a.id::text, a.subject, a.assessment_name as assessment,
        round((a.score / nullif(a.max_score, 0) * 100)::numeric, 1)::float as percentage,
        a.term, a.assessed_at::text as "assessedAt",
        round(avg(a.score / nullif(a.max_score, 0) * 100) over ()::numeric, 1)::float as average
       from assessments a
       where a.student_id = $1 and a.school_id = $2
       order by a.assessed_at desc, a.created_at desc
       limit 20`,
      [studentId, auth.schoolId],
    ),
    db.query<{ issued: number; outstanding: number }>(
      `select count(*)::int as issued,
        count(*) filter (where returned_at is null)::int as outstanding
       from library_issues
       where student_id = $1 and school_id = $2`,
      [studentId, auth.schoolId],
    ),
  ])

  const studentRow = student.rows[0]
  if (!studentRow) throw new Error("STUDENT_NOT_FOUND")

  const att = attendance.rows[0] ?? { present: 0, absent: 0, late: 0, excused: 0 }
  const total = att.present + att.absent + att.late + att.excused
  const rate = total ? Number((((att.present + att.late) / total) * 100).toFixed(1)) : 0
  const average = academics.rows[0]?.average ?? 0

  return {
    schoolId: auth.schoolId,
    student: studentRow,
    guardian: guardian.rows[0] ?? null,
    enrollment: enrollment.rows[0] ?? null,
    attendance: { ...att, rate },
    academics: {
      average,
      assessments: academics.rows.map(({ average: _average, ...row }) => row),
    },
    library: library.rows[0] ?? { issued: 0, outstanding: 0 },
  }
}
