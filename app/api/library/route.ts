import { NextRequest, NextResponse } from "next/server"
import { getDbClient } from "@/lib/db/client"

const RESOURCE_KINDS = new Set(["TEXTBOOK", "SUPPLEMENTARY", "CURRICULUM_GUIDE", "TEACHER_RESOURCE"])

type LibraryResourceRow = { id: string; title: string; kind: string; education_level: string; subject: string; language: "English" | "Kiswahili" | "Bilingual"; source_name: string; source_url: string; reader_url: string; download_url: string | null; description: string }

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? ""
  const kind = request.nextUrl.searchParams.get("kind")?.trim() ?? ""
  const level = request.nextUrl.searchParams.get("level")?.trim() ?? ""

  if (kind && !RESOURCE_KINDS.has(kind)) {
    return NextResponse.json({ error: "INVALID_KIND" }, { status: 400 })
  }

  const result = await getDbClient().query<LibraryResourceRow>(`
    select
      r.id,
      r.slug,
      r.title,
      r.kind,
      r.education_level,
      r.subject,
      r.language,
      r.source_name,
      r.source_url,
      r.reader_url,
      r.download_url,
      r.description
    from digital_library_resources r
    join schools s on s.id = r.school_id
    where s.slug = 'sammena-pre-primary-school'
      and r.status = 'PUBLISHED'
      and (r.published_at is null or r.published_at <= now())
      and ($1::text = '' or r.kind = $1)
      and ($2::text = '' or r.education_level = $2)
      and (
        $3::text = ''
        or r.title ilike '%' || $3 || '%'
        or r.subject ilike '%' || $3 || '%'
        or r.education_level ilike '%' || $3 || '%'
        or r.source_name ilike '%' || $3 || '%'
      )
    order by
      case r.kind when 'TEXTBOOK' then 1 when 'SUPPLEMENTARY' then 2 when 'TEACHER_RESOURCE' then 3 else 4 end,
      r.title asc
  `, [kind, level, query])

  const resources = result.rows.map((row) => ({
    id: row.id,
    title: row.title,
    kind: row.kind === "TEXTBOOK" ? "Textbook" : row.kind === "SUPPLEMENTARY" ? "Supplementary" : row.kind === "TEACHER_RESOURCE" ? "Teacher resource" : "Curriculum & guide",
    level: row.education_level,
    subject: row.subject,
    language: row.language,
    source: row.source_name,
    sourceUrl: row.source_url,
    readerUrl: row.reader_url,
    downloadUrl: row.download_url ?? undefined,
    description: row.description,
  }))

  return NextResponse.json({
    resources,
    meta: {
      total: resources.length,
      textbooks: resources.filter((item) => item.kind === "Textbook").length,
      supplementary: resources.filter((item) => item.kind === "Supplementary").length,
      curriculumGuides: resources.filter((item) => item.kind === "Curriculum & guide").length,
    },
  }, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  })
}
