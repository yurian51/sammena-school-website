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