import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "School Location",
  description: "Find location and official contact information for Sammena Pre & Primary School in Nduruma, Arusha, Tanzania.",
  alternates: { canonical: "/location" },
}

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
