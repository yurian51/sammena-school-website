import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Apply for Admission",
  description: "Read the official application steps for admission to Sammena Pre & Primary School.",
  alternates: { canonical: "/admissions/apply" },
}

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
