import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Academic Results",
  description: "Access verified academic results published by Sammena Pre & Primary School.",
  alternates: { canonical: "/results" },
}

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
