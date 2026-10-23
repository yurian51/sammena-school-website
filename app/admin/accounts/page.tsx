import { redirect } from "next/navigation"
import { AdminAccountManager } from "@/components/admin-account-manager"
import { getAuthContext } from "@/lib/auth/session"

export const dynamic = "force-dynamic"

export default async function AdminAccountsPage() {
  const context = await getAuthContext(new Request("https://sammena.local/admin/accounts"))
  if (!context) redirect("/login?type=admin")
  if (context.role !== "SUPER_ADMIN") redirect("/portal")
  return <main className="min-h-screen bg-[#f6f7f8] px-4 py-10 sm:px-8"><AdminAccountManager /></main>
}
