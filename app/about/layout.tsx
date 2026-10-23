import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Sammena Pre & Primary School",
  description: "Learn about Sammena Pre & Primary School in Arusha, Tanzania, through verified school information.",
  alternates: { canonical: "/about" },
}

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
