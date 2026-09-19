import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getAuthContext } from "@/lib/auth/session"
import { requirePermission } from "@/lib/auth/authorization"
import { getDbClient } from "@/lib/db/client"
import { mapDomainError } from "@/lib/api/errors"
import { readJson, requestId } from "@/lib/api/request"

const entrySchema = z.object({
  academicYearId: z.string().uuid(),
  classId: z.string().uuid(),
  dayOfWeek: z.number().int().min(1).max(7),
  periodNumber: z.number().int().min(1).max(12),
  startsAt: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Invalid start time"),
  endsAt: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Invalid end time"),
  subject: z.string().trim().min(1).max(120),
  teacherName: z.string().trim().max(160).nullable().optional(),
  room: z.string().trim().max(80).nullable().optional(),
}).superRefine((value, ctx) => {
  if (value.endsAt <= value.startsAt) ctx.addIssue({ code: "custom", path: ["endsAt"], message: "End time must be after start time" })
})

function requireTimetableWrite(context: Awaited<ReturnType<typeof getAuthContext>>) {
  return requirePermission(context, "sis:timetable:write")
}

export async function GET(request: NextRequest) {
  const id = requestId(request)
  try {
    const context = await getAuthContext(request)
    const auth = requirePermission(context, "sis:timetable:read")
    if (!auth.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const db = getDbClient()
    const result = await db.query(
      `select t.id::text, t.academic_year_id::text as "academicYearId",
        t.class_id::text as "classId", c.name as "className",
        t.day_of_week as "dayOfWeek", t.period_number as "periodNumber",
        t.starts_at::text as "startsAt", t.ends_at::text as "endsAt",
        t.subject, t.teacher_name as "teacherName", t.room
       from student_timetable_entries t
       join classes c on c.id = t.class_id and c.school_id = t.school_id
       where t.school_id = $1
       order by t.academic_year_id, c.name, t.day_of_week, t.period_number, t.starts_at`,
      [auth.schoolId],
    )
    return NextResponse.json({ data: result.rows, requestId: id }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) {
    return mapDomainError(error, id)
  }
}

export async function POST(request: NextRequest) {
  const id = requestId(request)
  try {
    const auth = requireTimetableWrite(await getAuthContext(request))
    if (!auth.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const input = entrySchema.parse(await readJson(request))
    const db = getDbClient()
    const result = await db.query(
      `insert into student_timetable_entries
        (school_id, academic_year_id, class_id, day_of_week, period_number, starts_at, ends_at, subject, teacher_name, room)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       returning id::text, academic_year_id::text as "academicYearId", class_id::text as "classId",
         day_of_week as "dayOfWeek", period_number as "periodNumber",
         starts_at::text as "startsAt", ends_at::text as "endsAt",
         subject, teacher_name as "teacherName", room`,
      [auth.schoolId, input.academicYearId, input.classId, input.dayOfWeek, input.periodNumber, input.startsAt, input.endsAt, input.subject, input.teacherName ?? null, input.room ?? null],
    )
    return NextResponse.json({ data: result.rows[0], requestId: id }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) return mapDomainError(new Error("VALIDATION_ERROR"), id)
    if (error instanceof Error && error.message.includes("duplicate key")) return mapDomainError(new Error("CONFLICT"), id)
    return mapDomainError(error, id)
  }
}

export async function DELETE(request: NextRequest) {
  const id = requestId(request)
  try {
    const auth = requireTimetableWrite(await getAuthContext(request))
    if (!auth.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const entryId = new URL(request.url).searchParams.get("id")
    if (!entryId || !z.string().uuid().safeParse(entryId).success) throw new Error("VALIDATION_ERROR")
    const db = getDbClient()
    const result = await db.query(
      "delete from student_timetable_entries where id = $1 and school_id = $2 returning id::text",
      [entryId, auth.schoolId],
    )
    if (!result.rows[0]) throw new Error("TIMETABLE_ENTRY_NOT_FOUND")
    return NextResponse.json({ data: { deleted: true, id: entryId }, requestId: id })
  } catch (error) {
    return mapDomainError(error, id)
  }
}
