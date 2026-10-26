import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { getRuntimeDbClient } from "@/lib/db/runtime"
import { apiError, mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { auditAction } from "@/lib/api/admin-audit"
import { AUDIT_ACTIONS } from "@/lib/audit/events"
import { bookInput, availableCopies } from "@/lib/library/library"

export async function GET(request: Request) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "library:read")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const q = (new URL(request.url).searchParams.get("q") ?? "").trim().slice(0, 120)
    const { rows } = await getRuntimeDbClient().query<{ id: string; accessionNumber: string; title: string; author: string; category: string; quantity: number; onLoan: number }>(
      `select b.id, b.accession_number as "accessionNumber", b.title, b.author, b.category, b.quantity,
              (select count(*)::int from library_issues i where i.book_id = b.id and i.returned_at is null) as "onLoan"
         from library_books b
        where b.school_id = $1 and ($2 = '' or b.title ilike '%' || $2 || '%' or b.author ilike '%' || $2 || '%' or b.accession_number ilike '%' || $2 || '%')
        order by b.title
        limit 500`,
      [context.schoolId, q],
    )
    const data = rows.map((row) => ({ ...row, available: availableCopies(row.quantity, row.onLoan) }))
    return Response.json({ data, requestId: id }, { headers: { "Cache-Control": "private, no-store" } })
  } catch (error) {
    return mapDomainError(error, id)
  }
}

export async function POST(request: Request) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "library:write")
    if (!context.schoolId) throw new Error("SCHOOL_SCOPE_REQUIRED")
    const parsed = bookInput.safeParse(await request.json().catch((): null => null))
    if (!parsed.success) return apiError("VALIDATION_ERROR", "Check the book details and try again.", 400, id)
    const b = parsed.data
    const { rows } = await getRuntimeDbClient().query<{ id: string }>(
      `insert into library_books (school_id, accession_number, title, author, category, quantity)
       values ($1, $2, $3, $4, $5, $6)
       on conflict (school_id, accession_number) do nothing
       returning id`,
      [context.schoolId, b.accessionNumber, b.title, b.author, b.category, b.quantity],
    )
    if (!rows[0]) return apiError("CONFLICT", "A book with this accession number already exists.", 409, id)
    await auditAction(context, AUDIT_ACTIONS.LIBRARY_BOOK_SAVED, "library_book", rows[0].id, id)
    return Response.json({ data: { id: rows[0].id }, requestId: id }, { status: 201 })
  } catch (error) {
    return mapDomainError(error, id)
  }
}
