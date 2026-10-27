import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Sammena School",
  description: "Contact Sammena Pre & Primary School in Arusha for admissions enquiries and general school information.",
  alternates: { canonical: "/contact" },
}

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
