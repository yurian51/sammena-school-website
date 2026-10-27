import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Academics",
  description: "Explore learning programmes and academic information from Sammena Pre & Primary School.",
  alternates: { canonical: "/academics" },
}

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
