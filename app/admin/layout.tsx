import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { getAuthContext } from "@/lib/auth/session"
import { AdminShell } from "@/components/admin/admin-shell"

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const incoming = await headers()
  const request = new Request("https://sammena.internal/admin", {
    headers: { cookie: incoming.get("cookie") ?? "" },
  })
  const context = await getAuthContext(request)
  if (!context) redirect("/login?type=admin&returnTo=/admin")
  return <AdminShell role={context.role}>{children}</AdminShell>
}
