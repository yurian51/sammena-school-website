import { redirect } from "next/navigation"
import { getAuthContext } from "@/lib/auth/session"
import { AdminShell } from "@/components/admin/admin-shell"

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const context = await getAuthContext(new Request("http://sammena.internal/admin"))
  if (!context) redirect("/login?type=admin&returnTo=/admin")
  return <AdminShell role={context.role}>{children}</AdminShell>
}
