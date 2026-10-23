import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Track an Application",
  description: "Use the official Sammena School application tracking service to check an existing application.",
  alternates: { canonical: "/admissions/track" },
}

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
