import { getAuthContext } from "@/lib/auth/session"
import { getStaffAdmission } from "@/lib/api/admin-admissions"
import { mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"

export async function GET(request: Request, { params }: { params: Promise<{ reference: string }> }) {
  const id = requestId(request)
  try {
    const { reference } = await params
    const data = await getStaffAdmission(await getAuthContext(request), reference)
    return Response.json({ data, requestId: id }, { status: 200 })
  } catch (error) {
    return mapDomainError(error, id)
  }
}
