import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Academic Calendar",
  description: "Review published school dates and confirmed activities from Sammena Pre & Primary School.",
  alternates: { canonical: "/calendar" },
}

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
