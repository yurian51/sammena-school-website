import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admissions Fees",
  description: "Review school fee information published by Sammena Pre & Primary School. Confirm current amounts directly with the school.",
  alternates: { canonical: "/admissions/fees" },
}

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
