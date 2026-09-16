import type { CreateSchoolEventInput, EventAudience, EventCategory, EventStatus, SchoolEvent } from "../../calendar/types"
import { getDbClient } from "../client"

type EventRow = {
  id: string
  school_id: string
  title: string
  slug: string
  description: string
  category: EventCategory
  audience: EventAudience
  starts_at: string
  ends_at: string | null
  all_day: boolean
  location: string | null
  status: EventStatus
  published_at: string | null
  created_at: string
  updated_at: string
}

function mapEvent(row: EventRow): SchoolEvent {
  return {
    id: row.id,
    schoolId: row.school_id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    category: row.category,
    audience: row.audience,
    startsAt: row.starts_at,
    ...(row.ends_at ? { endsAt: row.ends_at } : {}),
    allDay: row.all_day,
    ...(row.location ? { location: row.location } : {}),
    status: row.status,
    ...(row.published_at ? { publishedAt: row.published_at } : {}),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export class PostgresCalendarRepository {
  constructor(private readonly schoolId: string) {}

  async listPublished(from?: string, to?: string, category?: EventCategory) {
    const result = await getDbClient().query<EventRow>(
      `select id::text, school_id::text, title, slug, description, category, audience,
        starts_at::text, ends_at::text, all_day, location, status,
        published_at::text, created_at::text, updated_at::text
       from school_events
       where school_id = $1
         and status = 'PUBLISHED'
         and audience = 'PUBLIC'
         and ($2::timestamptz is null or coalesce(ends_at, starts_at) >= $2::timestamptz)
         and ($3::timestamptz is null or starts_at <= $3::timestamptz)
         and ($4::text is null or category = $4)
       order by starts_at asc, title asc`,
      [this.schoolId, from ?? null, to ?? null, category ?? null],
    )
    return result.rows.map(mapEvent)
  }

  async findById(id: string) {
    const result = await getDbClient().query<EventRow>(
      `select id::text, school_id::text, title, slug, description, category, audience,
        starts_at::text, ends_at::text, all_day, location, status,
        published_at::text, created_at::text, updated_at::text
       from school_events where id = $1 and school_id = $2 limit 1`,
      [id, this.schoolId],
    )
    return result.rows[0] ? mapEvent(result.rows[0]) : null
  }

  async create(input: CreateSchoolEventInput, actorId: string) {
    const result = await getDbClient().query<EventRow>(
      `insert into school_events
        (school_id, title, slug, description, category, audience, starts_at, ends_at, all_day, location, status, created_by)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'DRAFT',$11)
       returning id::text, school_id::text, title, slug, description, category, audience,
        starts_at::text, ends_at::text, all_day, location, status,
        published_at::text, created_at::text, updated_at::text`,
      [this.schoolId, input.title, input.slug, input.description ?? "", input.category, input.audience ?? "PUBLIC", input.startsAt, input.endsAt ?? null, input.allDay ?? false, input.location ?? null, actorId],
    )
    const row = result.rows[0]
    if (!row) throw new Error("DATABASE_INSERT_FAILED")
    return mapEvent(row)
  }

  async updateStatus(id: string, status: EventStatus) {
    const result = await getDbClient().query<EventRow>(
      `update school_events
       set status = $1,
           published_at = case when $1 = 'PUBLISHED' then coalesce(published_at, now()) else published_at end,
           updated_at = now()
       where id = $2 and school_id = $3
       returning id::text, school_id::text, title, slug, description, category, audience,
        starts_at::text, ends_at::text, all_day, location, status,
        published_at::text, created_at::text, updated_at::text`,
      [status, id, this.schoolId],
    )
    const row = result.rows[0]
    if (!row) throw new Error("CALENDAR_EVENT_NOT_FOUND")
    return mapEvent(row)
  }
}
