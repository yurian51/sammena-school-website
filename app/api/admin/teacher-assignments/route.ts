export const dynamic = "force-dynamic"
import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { getRuntimeDbClient } from "@/lib/db/runtime"
import { apiError, mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { auditAction } from "@/lib/api/admin-audit"
import { AUDIT_ACTIONS } from "@/lib/audit/events"
import { z } from "zod"

const assignment = z.object({ userId: z.string().uuid(), classId: z.string().uuid() })

export async function GET(request: Request) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "teaching:assign")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const { rows } = await getRuntimeDbClient().query(
      `select t.user_id as "userId", t.class_id as "classId", c.name as "className" from teacher_class_assignments t join classes c on c.id = t.class_id where t.school_id = $1 order by c.level_order, c.name`,
      [context.schoolId],
    )
    return Response.json({ data: rows, requestId: id }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) { return mapDomainError(error, id) }
}

export async function POST(request: Request) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "teaching:assign")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const parsed = assignment.safeParse(await request.json().catch((): null => null))
    if (!parsed.success) return apiError("VALIDATION_ERROR", "A teacher account and a class are required.", 400, id)
    const { rows: ok } = await getRuntimeDbClient().query<{ ok: boolean }>(`select exists(select 1 from classes where id = $1 and school_id = $2) as ok`, [parsed.data.classId, context.schoolId])
    if (!ok[0]?.ok) return apiError("NOT_FOUND", "The class was not found.", 404, id)
    await getRuntimeDbClient().query(
      `insert into teacher_class_assignments (school_id, user_id, class_id) values ($1, $2, $3) on conflict do nothing`,
      [context.schoolId, parsed.data.userId, parsed.data.classId],
    )
    await auditAction(context, AUDIT_ACTIONS.TEACHER_ASSIGNED, "teacher_class", parsed.data.classId, id)
    return Response.json({ data: parsed.data, requestId: id }, { status: 201 })
  } catch (error) { return mapDomainError(error, id) }
}
