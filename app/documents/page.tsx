import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "School Documents",
  description: "Access published Sammena Pre & Primary School documents and resources.",
  alternates: { canonical: "/documents" },
}

export default function DocumentsPage() {
  redirect("/resources")
}
