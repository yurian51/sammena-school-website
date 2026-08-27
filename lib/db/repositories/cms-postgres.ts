import type { CmsRepository } from "../../cms/repository"
import type { CmsContent } from "../../cms/types"
import { getDbClient } from "../client"
import type { CmsContentRow } from "../types"
import { mapCmsRow } from "../mappers"

export class PostgresCmsRepository implements CmsRepository {
  async listPublished(type?: CmsContent["type"]) {
    const result = await getDbClient().query<CmsContentRow>(
      `select * from cms_content
       where status = 'PUBLISHED'
         and (published_at is null or published_at <= now())
         and (expires_at is null or expires_at > now())
         and ($1::text is null or type = $1)
       order by published_at desc nulls last, created_at desc`,
      [type ?? null],
    )
    return result.rows.map(mapCmsRow)
  }

  async publish(content: CmsContent) {
    const result = await getDbClient().query<CmsContentRow>(
      `update cms_content set status = 'PUBLISHED', published_at = coalesce(published_at, now()), updated_at = now()
       where id = $1 returning *`,
      [content.id],
    )
    const row = result.rows[0]
    if (!row) throw new Error("CMS_CONTENT_NOT_FOUND")
    return mapCmsRow(row)
  }
}
