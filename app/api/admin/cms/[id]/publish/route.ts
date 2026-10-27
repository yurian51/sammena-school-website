import { getAuthContext } from "@/lib/auth/session"
import { requireAuthorized } from "@/lib/auth/guards"
import { publishCmsContent } from "@/lib/api/admin-cms"
import { mapDomainError } from "@/lib/api/errors"
import { requestId } from "@/lib/api/request"
import { PostgresCmsRepository } from "@/lib/db/repositories/cms-postgres"

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = requestId(request)
  try {
    const context = requireAuthorized(await getAuthContext(request), "cms:publish")
    const { id: contentId } = await params
    const repository = new PostgresCmsRepository()
    const existing = await repository.findById(contentId)
    if (!existing) throw new Error("CMS_CONTENT_NOT_FOUND")
    const data = await publishCmsContent(context, existing, id)
    return Response.json({ data, requestId: id }, { status: 200 })
  } catch (error) {
    return mapDomainError(error, id)
  }
}
