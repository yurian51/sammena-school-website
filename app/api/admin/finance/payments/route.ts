export const dynamic = "force-dynamic"
import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { ensurePostgresDbClient } from "@/lib/db/runtime"
import { apiError, mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { auditAction } from "@/lib/api/admin-audit"
import { AUDIT_ACTIONS } from "@/lib/audit/events"
import { balanceDue, formatReceiptNumber, paymentInput } from "@/lib/finance/ledger"

/**
 * Records a payment against an invoice. The invoice row is locked so two payments cannot both
 * pass the balance check. Receipt numbers come from a database sequence, so they never repeat.
 */
export async function POST(request: Request) {
  const id = requestId(request)
  const client = await ensurePostgresDbClient().connect()
  try {
    const context = requireAuthorized(await getAuthContext(request), "finance:write")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const parsed = paymentInput.safeParse(await request.json().catch((): null => null))
    if (!parsed.success) return apiError("VALIDATION_ERROR", "Check the invoice, amount and payment method.", 400, id)
    const d = parsed.data
    await client.query("begin")
    const { rows: inv } = await client.query<{ total: number; paid: number }>(
      `select i.total::float8 as total, coalesce((select sum(p.amount) from payments p where p.invoice_id = i.id), 0)::float8 as paid
         from invoices i where i.id = $1 and i.school_id = $2 for update`,
      [d.invoiceId, context.schoolId],
    )
    if (!inv[0]) { await client.query("rollback"); return apiError("NOT_FOUND", "The invoice was not found.", 404, id) }
    const due = balanceDue(inv[0].total, inv[0].paid)
    if (d.amount > due) { await client.query("rollback"); return apiError("VALIDATION_ERROR", `The payment is more than the balance due (${due.toFixed(2)}).`, 400, id) }
    const { rows: seq } = await client.query<{ n: string }>(`select nextval('receipt_number_seq')::text as n`)
    const receipt = formatReceiptNumber(Number(seq[0]?.n ?? 0), new Date().getUTCFullYear())
    const { rows } = await client.query<{ id: string }>(
      `insert into payments (school_id, invoice_id, amount, method, reference, receipt_number, received_on, recorded_by)
       values ($1,$2,$3,$4,nullif($5,''),$6, coalesce($7::date, current_date), null) returning id`,
      [context.schoolId, d.invoiceId, d.amount, d.method, d.reference, receipt, d.receivedOn ?? null],
    )
    await client.query("commit")
    await auditAction(context, AUDIT_ACTIONS.PAYMENT_RECORDED, "payment", rows[0]?.id, id)
    return Response.json({ data: { id: rows[0]?.id, receiptNumber: receipt, balanceAfter: balanceDue(inv[0].total, inv[0].paid + d.amount) }, requestId: id }, { status: 201 })
  } catch (error) {
    await client.query("rollback").catch((): undefined => undefined)
    return mapDomainError(error, id)
  } finally { client.release() }
}
