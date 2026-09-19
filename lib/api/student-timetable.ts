import type { AuthContext } from "@/lib/auth/authorization"
import { requireAuthenticatedContext } from "@/lib/auth/authorization"
import { getDbClient } from "@/lib/db/client"

export interface StudentTimetableEntry {
  id: string
  dayOfWeek: number
  periodNumber: number
  startsAt: string
  endsAt: string
  subject: string
  teacherName: string | null
  room: string | null
}

function requireStudent(context: AuthContext | null) {
  const auth = requireAuthenticatedContext(context)
  if (auth.role !== "STUDENT") throw new Error("FORBIDDEN")
  if (!auth.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
  return auth
}

export async function getStudentTimetable(context: AuthContext | null) {
  const auth = requireStudent(context)
  const db = getDbClient()
  const sql = [
    "select ay.name as \"academicYearName\", c.name as \"className\",",
    "t.id::text, t.day_of_week as \"dayOfWeek\", t.period_number as \"periodNumber\",",
    "t.starts_at::text as \"startsAt\", t.ends_at::text as \"endsAt\", t.subject,",
    "t.teacher_name as \"teacherName\", t.room",
    "from student_linked_accounts sla",
    "join enrollments e on e.student_id = sla.student_id and e.school_id = sla.school_id and e.status = 'ACTIVE'",
    "join classes c on c.id = e.class_id and c.school_id = e.school_id",
    "join academic_years ay on ay.id = e.academic_year_id and ay.school_id = e.school_id and ay.is_current = true",
    "join student_timetable_entries t on t.class_id = c.id and t.school_id = e.school_id and t.academic_year_id = ay.id",
    "where sla.user_id = $1 and sla.school_id = $2",
    "order by t.day_of_week, t.period_number, t.starts_at"
  ].join(" ")

  const result = await db.query<{
    academicYearName: string
    className: string
    id: string
    dayOfWeek: number
    periodNumber: number
    startsAt: string
    endsAt: string
    subject: string
    teacherName: string | null
    room: string | null
  }>(sql, [auth.userId, auth.schoolId])

  return {
    academicYearName: result.rows[0]?.academicYearName ?? "Current academic records",
    className: result.rows[0]?.className ?? "Unassigned",
    entries: result.rows.map(({ academicYearName: _year, className: _class, ...entry }) => entry),
  }
}
