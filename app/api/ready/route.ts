import { getDbClient } from "@/lib/db/client"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  try {
    await getDbClient().query("select 1 as ok")
    return Response.json({ data: { status: "ready", database: "reachable" } }, { status: 200, headers: { "Cache-Control": "no-store" } })
  } catch {
    return Response.json({ data: { status: "not_ready", database: "unavailable" } }, { status: 503, headers: { "Cache-Control": "no-store" } })
  }
}
