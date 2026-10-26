import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { getRuntimeDbClient } from "@/lib/db/runtime"
import { apiError, mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { auditAction } from "@/lib/api/admin-audit"
import { AUDIT_ACTIONS } from "@/lib/audit/events"
import { messageInput } from "@/lib/messages/messages"

export async function GET(request: Request) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "communication:read")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const { rows } = await getRuntimeDbClient().query(
      `select m.id, m.audience, m.title, m.body, m.created_at as "createdAt", c.name as "className", s.first_name || ' ' || s.last_name as "studentName"
         from parent_messages m
         left join classes c on c.id = m.class_id
         left join students s on s.id = m.student_id
        where m.school_id = $1 order by m.created_at desc limit 100`,
      [context.schoolId],
    )
    return Response.json({ data: rows, requestId: id }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) { return mapDomainError(error, id) }
}

export async function POST(request: Request) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "communication:write")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const parsed = messageInput.safeParse(await request.json().catch((): null => null))
    if (!parsed.success) return apiError("VALIDATION_ERROR", parsed.error.issues[0]?.message ?? "Check the message.", 400, id)
    const m = parsed.data
    const db = getRuntimeDbClient()
    if (m.classId) {
      const { rows } = await db.query(`select 1 from classes where id = $1 and school_id = $2`, [m.classId, context.schoolId])
      if (!rows[0]) return apiError("NOT_FOUND", "The class was not found.", 404, id)
    }
    if (m.studentId) {
      const { rows } = await db.query(`select 1 from students where id = $1 and school_id = $2`, [m.studentId, context.schoolId])
      if (!rows[0]) return apiError("NOT_FOUND", "The student was not found.", 404, id)
    }
    const { rows } = await db.query<{ id: string }>(
      `insert into parent_messages (school_id, audience, class_id, student_id, title, body, created_by)
       values ($1,$2,$3,$4,$5,$6, null) returning id`,
      [context.schoolId, m.audience, m.audience === "CLASS" ? m.classId : null, m.audience === "STUDENT" ? m.studentId : null, m.title, m.body],
    )
    await auditAction(context, AUDIT_ACTIONS.MESSAGE_SENT, "parent_message", rows[0]?.id, id)
    return Response.json({ data: { id: rows[0]?.id }, requestId: id }, { status: 201 })
  } catch (error) { return mapDomainError(error, id) }
}
