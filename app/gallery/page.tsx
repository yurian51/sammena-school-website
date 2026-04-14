"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { X, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = ["All", "Events", "Classes", "Activities", "Sports"]

const galleryItems = [
  {
    src: "/images/gallery-1.jpg",
    alt: "Students competing during sports day athletics event",
    title: "Sports Day 2023",
    category: "Sports",
    span: "col-span-1 row-span-2",
  },
  {
    src: "/images/gallery-2.jpg",
    alt: "Students doing chemistry experiments in the school lab",
    title: "Science Lab Session",
    category: "Classes",
    span: "col-span-1",
  },
  {
    src: "/images/gallery-3.jpg",
    alt: "Students celebrating graduation ceremony",
    title: "Graduation Ceremony 2023",
    category: "Events",
    span: "col-span-1",
  },
  {
    src: "/images/gallery-4.jpg",
    alt: "Students learning in the ICT computer lab",
    title: "ICT Computer Lab",
    category: "Classes",
    span: "col-span-1",
  },
  {
    src: "/images/gallery-5.jpg",
    alt: "Students performing in cultural day event",
    title: "Cultural Day Performance",
    category: "Events",
    span: "col-span-1",
  },
  {
    src: "/images/gallery-6.jpg",
    alt: "Students studying in the school library",
    title: "School Library",
    category: "Activities",
    span: "col-span-1",
  },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [lightbox, setLightbox] = useState<null | typeof galleryItems[0]>(null)

  const filtered = galleryItems.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  )

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-school-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">Our Life in Pictures</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-balance">School Gallery</h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto leading-relaxed">
            A glimpse into the vibrant life at Sammena School — from the classroom to the sports field, every moment tells a story of growth and excellence.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all",
                  activeCategory === cat
                    ? "bg-school-dark text-white shadow-lg"
                    : "bg-school-neutral text-foreground/70 hover:bg-school-dark/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item) => (
              <div
                key={item.src}
                className="group relative rounded-2xl overflow-hidden aspect-video cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                onClick={() => setLightbox(item)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-school-dark/0 group-hover:bg-school-dark/50 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100 transform" />
                </div>
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-school-orange text-xs font-semibold uppercase tracking-wider">{item.category}</span>
                  <p className="text-white font-semibold text-sm">{item.title}</p>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No photos in this category yet. Check back soon!
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>
          <div
            className="relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video">
              <Image
                src={lightbox.src}
                alt={lightbox.alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="bg-school-dark px-6 py-4">
              <span className="text-school-orange text-xs font-semibold uppercase tracking-wider">{lightbox.category}</span>
              <p className="text-white font-semibold">{lightbox.title}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
