import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getAuthContext } from "@/lib/auth/session"
import { requirePermission } from "@/lib/auth/authorization"
import { getDbClient } from "@/lib/db/client"
import { mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const id = requestId(request)
  try {
    const auth = requirePermission(await getAuthContext(request), "sis:students:read")
    if (!auth.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const studentId = z.string().uuid().parse((await context.params).id)
    const db = getDbClient()
    const [student, guardians, enrollments, attendance, assessments] = await Promise.all([
      db.query(`select id::text, admission_number as "admissionNumber", first_name as "firstName", middle_name as "middleName", last_name as "lastName", gender, date_of_birth as "dateOfBirth", is_active as "isActive" from students where id=$1 and school_id=$2`, [studentId, auth.schoolId]),
      db.query(`select g.id::text, g.full_name as "fullName", g.phone, g.email, g.relationship, sg.is_primary as "isPrimary" from student_guardians sg join guardians g on g.id=sg.guardian_id and g.school_id=sg.school_id where sg.student_id=$1 and sg.school_id=$2 order by sg.is_primary desc, g.full_name`, [studentId, auth.schoolId]),
      db.query(`select e.id::text, ay.name as "academicYear", c.name as class, e.status, e.started_on as "startedOn", e.ended_on as "endedOn" from enrollments e join academic_years ay on ay.id=e.academic_year_id and ay.school_id=e.school_id join classes c on c.id=e.class_id and c.school_id=e.school_id where e.student_id=$1 and e.school_id=$2 order by e.started_on desc`, [studentId, auth.schoolId]),
      db.query(`select attendance_date as date, status from attendance_records where student_id=$1 and school_id=$2 order by attendance_date desc limit 60`, [studentId, auth.schoolId]),
      db.query(`select subject, assessment_name as "assessmentName", term, score, max_score as "maxScore", assessed_at as "assessedAt" from assessments where student_id=$1 and school_id=$2 order by assessed_at desc limit 50`, [studentId, auth.schoolId]),
    ])
    if (!student.rows[0]) throw new Error("SIS_STUDENT_NOT_FOUND")
    return NextResponse.json({ data: { student: student.rows[0], guardians: guardians.rows, enrollments: enrollments.rows, attendance: attendance.rows, assessments: assessments.rows }, requestId: id }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) {
    if (error instanceof z.ZodError) return mapDomainError(new Error("VALIDATION_ERROR"), id)
    return mapDomainError(error, id)
  }
}