import type { AuthContext } from "../auth/authorization"
import { requirePermission } from "../auth/authorization"
import { CmsService } from "../cms/service"
import { PostgresCmsRepository } from "../db/repositories/cms-postgres"
import type { CmsContent } from "../cms/types"
import { AUDIT_ACTIONS } from "../audit/events"
import { auditAction } from "./admin-audit"

const service = new CmsService(new PostgresCmsRepository())

export async function publishCmsContent(context: AuthContext | null, content: CmsContent, requestId: string) {
  const user = requirePermission(context, "cms:publish")
  const published = await service.publish(content)
  await auditAction(user, AUDIT_ACTIONS.CMS_PUBLISHED, "cms_content", published.id, requestId)
  return published
}
