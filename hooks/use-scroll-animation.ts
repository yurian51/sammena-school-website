"use client"

import { useEffect, useRef, useState } from "react"

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(threshold = 0.1) {
  const ref = useRef<T>(null)
  // Fail-open: content must remain visible even if IntersectionObserver is unavailable,
  // blocked, or delayed. Motion enhances the page; it never gates rendering.
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === "undefined") return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

export function useCountUp(end: number, duration = 2000, startOnVisible = true) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(!startOnVisible)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!startOnVisible) return
    const element = ref.current
    if (!element || typeof IntersectionObserver === "undefined") {
      setHasStarted(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true)
          observer.unobserve(element)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [startOnVisible])

  useEffect(() => {
    if (!hasStarted) return
    const startTime = performance.now()
    let frame = 0
    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [hasStarted, end, duration])

  return { count, ref }
}
