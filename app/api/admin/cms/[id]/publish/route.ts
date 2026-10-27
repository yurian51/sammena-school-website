import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { publishCmsContent } from "@/lib/api/admin-cms"
import { mapDomainError, apiError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { PostgresCmsRepository } from "@/lib/db/repositories/cms-postgres"

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "cms:publish")
    const { id: contentId } = await params
    const repository = new PostgresCmsRepository()
    const existing = await repository.findById(contentId)
    if (!existing) return apiError("NOT_FOUND", "CMS content was not found.", 404, id)
    const data = await publishCmsContent(context, existing, id)
    return Response.json({ data, requestId: id }, { status: 200 })
  } catch (error) {
    return mapDomainError(error, id)
  }
}
