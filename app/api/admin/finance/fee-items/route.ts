import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { getRuntimeDbClient } from "@/lib/db/runtime"
import { apiError, mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { auditAction } from "@/lib/api/admin-audit"
import { AUDIT_ACTIONS } from "@/lib/audit/events"
import { feeItemInput } from "@/lib/finance/ledger"

export async function GET(request: Request) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "finance:read")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const { rows } = await getRuntimeDbClient().query(
      `select f.id, f.name, f.term, f.amount::float8 as amount from fee_items f join academic_years y on y.id = f.academic_year_id and y.is_current
        where f.school_id = $1 order by f.term, f.name`,
      [context.schoolId],
    )
    return Response.json({ data: rows, requestId: id }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) { return mapDomainError(error, id) }
}

export async function POST(request: Request) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "finance:write")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const parsed = feeItemInput.safeParse(await request.json().catch((): null => null))
    if (!parsed.success) return apiError("VALIDATION_ERROR", "Check the fee name, term and amount.", 400, id)
    const db = getRuntimeDbClient()
    const { rows: year } = await db.query<{ id: string }>(`select id from academic_years where school_id = $1 and is_current limit 1`, [context.schoolId])
    if (!year[0]) return apiError("VALIDATION_ERROR", "No current academic year is set for this school.", 400, id)
    const { rows } = await db.query<{ id: string }>(
      `insert into fee_items (school_id, academic_year_id, name, term, amount) values ($1,$2,$3,$4,$5) returning id`,
      [context.schoolId, year[0].id, parsed.data.name, parsed.data.term, parsed.data.amount],
    )
    await auditAction(context, AUDIT_ACTIONS.FEE_ITEM_SAVED, "fee_item", rows[0]?.id, id)
    return Response.json({ data: { id: rows[0]?.id }, requestId: id }, { status: 201 })
  } catch (error) { return mapDomainError(error, id) }
}
