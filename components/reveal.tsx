"use client"

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react"

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("is-visible")
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add("is-visible")
        observer.disconnect()
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={"sammena-reveal " + className} style={{ "--reveal-delay": delay + "ms" } as CSSProperties}>{children}</div>
}
