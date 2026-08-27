import type { AuthContext } from "../auth/authorization"
import { requirePermission } from "../auth/authorization"
import { CmsService } from "../cms/service"
import { PostgresCmsRepository } from "../db/repositories/cms-postgres"
import type { CmsContent } from "../cms/types"

const service = new CmsService(new PostgresCmsRepository())

export async function publishCmsContent(context: AuthContext | null, content: CmsContent) {
  requirePermission(context, "cms:publish")
  return service.publish(content)
}
