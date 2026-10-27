import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "School Gallery",
  description: "View photographs from Sammena Pre & Primary School classrooms, activities, sports and school events.",
  alternates: { canonical: "/gallery" },
}

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
