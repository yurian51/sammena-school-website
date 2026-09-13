import { NextResponse } from "next/server"
import { getRuntimeDbClient } from "@/lib/db/runtime"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  try {
    await getRuntimeDbClient().query("select 1 as ok")
    return NextResponse.json(
      { data: { status: "ready", database: "reachable" } },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    )
  } catch {
    return NextResponse.json(
      { data: { status: "not_ready", database: "unavailable" } },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    )
  }
}
