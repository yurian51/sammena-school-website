import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admissions",
  description: "Official admissions guidance for Sammena Pre & Primary School, including entry information and application steps.",
  alternates: { canonical: "/admissions" },
}

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
