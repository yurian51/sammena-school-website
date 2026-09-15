import { backendHealth } from "@/lib/api/health"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  const data = await backendHealth()

  return Response.json(
    { data },
    {
      status: data.status === "ok" ? 200 : 503,
      headers: { "Cache-Control": "no-store" },
    },
  )
}
