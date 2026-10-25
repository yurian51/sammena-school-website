import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getAuthContext } from "@/lib/auth/session"
import { requirePermission } from "@/lib/auth/authorization"
import { getDbClient } from "@/lib/db/client"
import { mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"

const querySchema = z.object({
  q: z.string().trim().max(120).optional(),
  active: z.enum(["true", "false", "all"]).optional().default("true"),
  page: z.coerce.number().int().min(1).max(10000).optional().default(1),
  pageSize: z.coerce.number().int().min(10).max(100).optional().default(25),
})

export async function GET(request: NextRequest) {
  const id = requestId(request)
  try {
    const auth = requirePermission(await getAuthContext(request), "sis:students:read")
    if (!auth.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const input = querySchema.parse(Object.fromEntries(request.nextUrl.searchParams))
    const offset = (input.page - 1) * input.pageSize
    const db = getDbClient()
    const values: unknown[] = [auth.schoolId]
    const predicates = ["s.school_id = $1"]
    if (input.active !== "all") {
      values.push(input.active === "true")
      predicates.push(`s.is_active = $${values.length}`)
    }
    if (input.q) {
      values.push(`%${input.q}%`)
      predicates.push(`(s.admission_number ilike $${values.length} or concat_ws(' ', s.first_name, s.middle_name, s.last_name) ilike $${values.length})`)
    }
    const where = predicates.join(" and ")
    const count = await db.query<{ count: number }>(`select count(*)::int as count from students s where ${where}`, values)
    values.push(input.pageSize, offset)
    const rows = await db.query(
      `select s.id::text, s.admission_number as "admissionNumber",
        concat_ws(' ', s.first_name, s.middle_name, s.last_name) as name,
        s.gender, s.date_of_birth as "dateOfBirth", s.is_active as "isActive",
        e.status as "enrollmentStatus", c.name as class_name,
        coalesce(att.present_days, 0)::int as "presentDays",
        coalesce(att.absent_days, 0)::int as "absentDays"
       from students s
       left join lateral (
         select e.status, c.name
         from enrollments e join classes c on c.id=e.class_id and c.school_id=e.school_id
         where e.student_id=s.id and e.school_id=s.school_id
         order by e.started_on desc, e.created_at desc limit 1
       ) e on true
       left join lateral (
         select count(*) filter (where ar.status='PRESENT') as present_days,
                count(*) filter (where ar.status='ABSENT') as absent_days
         from attendance_records ar
         where ar.student_id=s.id and ar.school_id=s.school_id
           and ar.attendance_date >= current_date - interval '30 days'
       ) att on true
       where ${where}
       order by s.last_name, s.first_name, s.admission_number
       limit $${values.length-1} offset $${values.length}`,
      values,
    )
    return NextResponse.json({
      data: { items: rows.rows, page: input.page, pageSize: input.pageSize, total: count.rows[0]?.count ?? 0 },
      requestId: id,
    }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) {
    if (error instanceof z.ZodError) return mapDomainError(new Error("VALIDATION_ERROR"), id)
    return mapDomainError(error, id)
  }
}

const createStudentSchema = z.object({
  admissionNumber: z.string().trim().min(1).max(40),
  firstName: z.string().trim().min(1).max(80),
  middleName: z.string().trim().max(80).optional().default(""),
  lastName: z.string().trim().min(1).max(80),
  gender: z.enum(["MALE", "FEMALE"]),
  dateOfBirth: z.string().date().optional().or(z.literal("")),
  guardianFullName: z.string().trim().min(2).max(160),
  guardianPhone: z.string().trim().min(5).max(40),
  guardianEmail: z.union([z.string().trim().email().max(254), z.literal("")]).optional(),
  guardianRelationship: z.string().trim().max(80).optional().default(""),
})

export async function POST(request: NextRequest) {
  const id = requestId(request)
  try {
    const auth = requirePermission(await getAuthContext(request), "sis:students:write")
    if (!auth.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const input = createStudentSchema.parse(await request.json())
    const db = getDbClient()
    const result = await db.query<{ id: string; admissionNumber: string }>(
      "with new_student as (" +
      " insert into students (school_id, admission_number, first_name, middle_name, last_name, gender, date_of_birth)" +
      " values ($1, $2, $3, nullif($4, ''), $5, $6, nullif($7, '')::date)" +
      " returning id, school_id, admission_number" +
      "), new_guardian as (" +
      " insert into guardians (school_id, full_name, phone, email, relationship)" +
      " select school_id, $8, $9, nullif($10, ''), nullif($11, '') from new_student returning id, school_id" +
      "), guardian_link as (" +
      " insert into student_guardians (student_id, guardian_id, is_primary, school_id)" +
      " select s.id, g.id, true, s.school_id from new_student s cross join new_guardian g returning student_id" +
      "), audit as (" +
      " insert into audit_events (action, entity_type, entity_id, request_id)" +
      " select 'STUDENT_CREATED', 'student', id, $12 from new_student returning id" +
      ")" +
      " select s.id::text as id, s.admission_number as \\"admissionNumber\\" from new_student s join guardian_link gl on gl.student_id=s.id",
      [auth.schoolId, input.admissionNumber, input.firstName, input.middleName, input.lastName, input.gender, input.dateOfBirth ?? "", input.guardianFullName, input.guardianPhone, input.guardianEmail ?? "", input.guardianRelationship, id],
    )
    if (!result.rows[0]) throw new Error("STUDENT_CREATE_FAILED")
    return NextResponse.json({ data: result.rows[0], requestId: id }, { status: 201, headers: { "Cache-Control": "private, no-store" } })
  } catch (error) {
    if (error instanceof z.ZodError) return mapDomainError(new Error("VALIDATION_ERROR"), id)
    if (typeof error === "object" && error !== null && "code" in error && (error as { code?: string }).code === "23505") {
      return NextResponse.json({ error: { code: "CONFLICT", message: "That admission number is already registered at this school.", requestId: id } }, { status: 409 })
    }
    return mapDomainError(error, id)
  }
}
