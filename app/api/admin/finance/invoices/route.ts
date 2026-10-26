import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { ensurePostgresDbClient, getRuntimeDbClient } from "@/lib/db/runtime"
import { apiError, mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { auditAction } from "@/lib/api/admin-audit"
import { AUDIT_ACTIONS } from "@/lib/audit/events"
import { balanceDue, invoiceInput } from "@/lib/finance/ledger"

/** Invoices for a student with amount paid and balance due. */
export async function GET(request: Request) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "finance:read")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const studentId = new URL(request.url).searchParams.get("studentId") ?? ""
    if (!/^[0-9a-f-]{36}$/i.test(studentId)) return apiError("VALIDATION_ERROR", "A student is required.", 400, id)
    const { rows } = await getRuntimeDbClient().query<{ id: string; term: string; total: number; paid: number; createdAt: string }>(
      `select i.id, i.term, i.total::float8 as total, coalesce(sum(p.amount), 0)::float8 as paid, i.created_at as "createdAt"
         from invoices i left join payments p on p.invoice_id = i.id
        where i.school_id = $1 and i.student_id = $2
        group by i.id order by i.created_at desc`,
      [context.schoolId, studentId],
    )
    const data = rows.map((r) => ({ ...r, balance: balanceDue(r.total, r.paid) }))
    return Response.json({ data, requestId: id }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) { return mapDomainError(error, id) }
}

/** Creates an invoice from selected fee items. Totals are summed on the server, never taken from the client. */
export async function POST(request: Request) {
  const id = requestId(request)
  const client = await ensurePostgresDbClient().connect()
  try {
    const context = requireAuthorized(await getAuthContext(request), "finance:write")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const parsed = invoiceInput.safeParse(await request.json().catch((): null => null))
    if (!parsed.success) return apiError("VALIDATION_ERROR", "A student, a term and at least one fee are required.", 400, id)
    const d = parsed.data
    await client.query("begin")
    const { rows: year } = await client.query<{ id: string }>(`select id from academic_years where school_id = $1 and is_current limit 1`, [context.schoolId])
    if (!year[0]) { await client.query("rollback"); return apiError("VALIDATION_ERROR", "No current academic year is set for this school.", 400, id) }
    const { rows: student } = await client.query(`select id from students where id = $1 and school_id = $2 and is_active`, [d.studentId, context.schoolId])
    if (!student[0]) { await client.query("rollback"); return apiError("NOT_FOUND", "The student was not found or is inactive.", 404, id) }
    const { rows: fees } = await client.query<{ id: string; name: string; amount: number }>(
      `select id, name, amount::float8 as amount from fee_items where school_id = $1 and academic_year_id = $2 and term = $3 and id = any($4::uuid[])`,
      [context.schoolId, year[0].id, d.term, d.feeItemIds],
    )
    if (fees.length !== new Set(d.feeItemIds).size) { await client.query("rollback"); return apiError("VALIDATION_ERROR", "Some fee items do not belong to this term.", 400, id) }
    const total = Math.round(fees.reduce((sum, f) => sum + f.amount, 0) * 100) / 100
    const { rows: inv } = await client.query<{ id: string }>(
      `insert into invoices (school_id, student_id, academic_year_id, term, total) values ($1,$2,$3,$4,$5) returning id`,
      [context.schoolId, d.studentId, year[0].id, d.term, total],
    )
    for (const fee of fees) {
      await client.query(`insert into invoice_lines (invoice_id, fee_item_id, description, amount) values ($1,$2,$3,$4)`, [inv[0]?.id, fee.id, fee.name, fee.amount])
    }
    await client.query("commit")
    await auditAction(context, AUDIT_ACTIONS.INVOICE_CREATED, "invoice", inv[0]?.id, id)
    return Response.json({ data: { id: inv[0]?.id, total }, requestId: id }, { status: 201 })
  } catch (error) {
    await client.query("rollback").catch((): undefined => undefined)
    return mapDomainError(error, id)
  } finally { client.release() }
}
