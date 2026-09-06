import type { CmsRepository } from "../../cms/repository"
import type { CmsContent } from "../../cms/types"
import { getDbClient } from "../client"
import type { CmsContentRow } from "../types"
import { mapCmsRow } from "../mappers"

export class PostgresCmsRepository implements CmsRepository {
  async listPublished(type?: CmsContent["type"]) {
    const result = await getDbClient().query<CmsContentRow>(`select * from cms_content where status='PUBLISHED' and (published_at is null or published_at <= now()) and (expires_at is null or expires_at > now()) and ($1::text is null or type=$1) order by published_at desc nulls last, created_at desc`, [type ?? null])
    return result.rows.map(mapCmsRow)
  }

  async findById(id: string) {
    const result = await getDbClient().query<CmsContentRow>(`select * from cms_content where id=$1 limit 1`, [id])
    return result.rows[0] ? mapCmsRow(result.rows[0]) : null
  }

  async save(content: CmsContent) {
    const category = content.type === "NEWS" ? content.category : null
    const summary = content.type === "ANNOUNCEMENT" ? content.summary : null
    const priority = content.type === "ANNOUNCEMENT" ? content.priority : null
    const excerpt = content.type === "NEWS" ? content.excerpt : null
    const body = content.type === "NEWS" ? content.body : null
    const expiresAt = content.type === "ANNOUNCEMENT" ? content.expiresAt ?? null : null
    const result = await getDbClient().query<CmsContentRow>(`insert into cms_content (id,type,title,slug,excerpt,body,category,summary,priority,status,published_at,expires_at) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) returning *`, [content.id, content.type, content.title, content.slug, excerpt, body, category, summary, priority, content.status, content.publishedAt ?? null, expiresAt])
    const row = result.rows[0]
    if (!row) throw new Error("DATABASE_INSERT_FAILED")
    return mapCmsRow(row)
  }

  async updateStatus(id: string, status: CmsContent["status"]) {
    const result = await getDbClient().query<CmsContentRow>(`update cms_content set status=$1, published_at=case when $1='PUBLISHED' then coalesce(published_at, now()) else published_at end, updated_at=now() where id=$2 returning *`, [status, id])
    const row = result.rows[0]
    if (!row) throw new Error("CMS_CONTENT_NOT_FOUND")
    return mapCmsRow(row)
  }
}
