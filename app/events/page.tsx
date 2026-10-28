import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "School Events",
  description: "View published Sammena Pre & Primary School events in the official school calendar.",
  alternates: { canonical: "/events" },
}

export default function EventsPage() {
  redirect("/calendar")
}
