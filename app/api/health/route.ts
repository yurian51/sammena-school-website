import { backendHealth } from "@/lib/api/health"

export const dynamic = "force-dynamic"
export const revalidate = 0

export function GET() {
  return Response.json({ data: backendHealth() }, { status: 200 })
}
