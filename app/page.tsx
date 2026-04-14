"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { useScrollAnimation, useCountUp } from "@/hooks/use-scroll-animation"
import {
  GraduationCap, BookOpen, Users, Trophy, ArrowRight, Star,
  ChevronRight, Shield, Lightbulb, Heart, Play, ChevronDown
} from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  { value: 259, label: "Pupils Enrolled", suffix: "" },
  { value: 13, label: "Dedicated Staff", suffix: "" },
  { value: 34, label: "Orphans Supported", suffix: "" },
  { value: 15, label: "Years of Impact", suffix: "+" },
]

const features = [
  {
    icon: BookOpen,
    title: "English-Medium Education",
    description: "Unlike most government schools, we teach in English from an early age, preparing pupils for secondary education and beyond.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Users,
    title: "Supporting Vulnerable Children",
    description: "Special focus on orphans and children from disadvantaged backgrounds, providing scholarships, uniforms, and basic needs support.",
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: Trophy,
    title: "Holistic Development",
    description: "Beyond academics, we nurture character, discipline, and life skills to help every child grow into a confident, responsible citizen.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Shield,
    title: "Safe & Caring Environment",
    description: "A green, child-friendly campus with separate dormitories for boys and girls, clean water, and dedicated pastoral care.",
    color: "from-blue-500 to-indigo-600",
  },
]

const testimonials = [
  {
    name: "Parent of Standard 5 Pupil",
    role: "Parent",
    quote: "My child was struggling before Sammena. The teachers here truly care — they not only teach but also provide moral guidance and support for our family.",
    rating: 5,
    image: "/images/gallery-1.jpg",
  },
  {
    name: "Community Volunteer",
    role: "Supporter",
    quote: "What Mr. Menavi has built here is remarkable. These children, many of them orphans, now have hope and a real chance at a bright future through education.",
    rating: 5,
    image: "/images/gallery-2.jpg",
  },
  {
    name: "Former Pupil",
    role: "Secondary School Student",
    quote: "Sammena taught me English well, which helped me transition smoothly to secondary school. I am grateful for the foundation I received there.",
    rating: 5,
    image: "/images/gallery-3.jpg",
  },
]

const values = [
  { icon: Lightbulb, label: "Innovation" },
  { icon: Shield, label: "Integrity" },
  { icon: Heart, label: "Compassion" },
  { icon: Trophy, label: "Excellence" },
]

function StatCard({ value, label, suffix, index }: { value: number; label: string; suffix: string; index: number }) {
  const { count, ref } = useCountUp(value, 2000)
  
  return (
    <div 
      ref={ref} 
      className={cn(
        "text-center py-4 px-6 group cursor-default",
        "transition-all duration-300 hover:bg-white/5 rounded-xl"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="text-4xl md:text-5xl font-bold text-school-orange mb-2 tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-white/60 text-sm font-medium tracking-wide">{label}</div>
    </div>
  )
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation()
  const Icon = feature.icon
  
  return (
    <div
      ref={ref}
      className={cn(
        "relative bg-card rounded-2xl p-6 border border-border overflow-hidden group",
        "hover-lift cursor-default",
        isVisible ? "animate-in" : "animate-out"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Gradient background on hover */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500",
        feature.color
      )} />
      
      <div className="relative z-10">
        <div className={cn(
          "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
          "shadow-lg group-hover:scale-110 transition-transform duration-300",
          feature.color
        )}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="font-semibold text-foreground text-lg mb-2 group-hover:text-school-orange transition-colors">
          {feature.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
      </div>
    </div>
  )
}

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation()
  
  return (
    <div
      ref={ref}
      className={cn(
        "relative bg-card border border-border rounded-2xl p-6 overflow-hidden",
        "hover:border-school-orange/30 hover:shadow-xl hover:shadow-school-orange/5 transition-all duration-300",
        isVisible ? "animate-in" : "animate-out"
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-school-orange text-school-orange" />
        ))}
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-school-orange/20 flex items-center justify-center">
          <Users className="w-5 h-5 text-school-orange" />
        </div>
        <div>
          <div className="font-semibold text-foreground text-sm">{testimonial.name}</div>
          <div className="text-muted-foreground text-xs">{testimonial.role}</div>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const aboutSection = useScrollAnimation()
  const featuresHeader = useScrollAnimation()
  const testimonialsHeader = useScrollAnimation()
  const ctaSection = useScrollAnimation()

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-bg.jpg"
          alt="Sammena School campus"
          fill
          className="object-cover scale-105"
          priority
        />
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-school-dark/80 via-school-dark/60 to-school-dark/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-school-dark/40 via-transparent to-school-dark/40" />
        
        {/* Animated particles/dots (decorative) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-school-orange/30 rounded-full animate-float" style={{ animationDelay: "0s" }} />
          <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-school-orange/20 rounded-full animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-white/20 rounded-full animate-float" style={{ animationDelay: "2s" }} />
        </div>

        {/* Orange accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-school-orange to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8 animate-in animate-delay-100">
            <GraduationCap className="w-4 h-4 text-school-orange" />
            <span className="text-white/90 text-sm font-medium">English-Medium Pre & Primary School</span>
          </div>
          
          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-in animate-delay-200">
            <span className="block">Changing Lives Through</span>
            <span className="text-gradient">Education</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed animate-in animate-delay-300">
            Since 2009, Sammena Pre & Primary School has provided quality education, care, and moral guidance to children — with a special focus on orphans and vulnerable families in Tanzania.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in animate-delay-400">
            <Link
              href="/admissions"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-school-orange text-white font-semibold rounded-xl hover:bg-school-orange-light transition-all shadow-xl shadow-school-orange/30 hover:shadow-2xl hover:shadow-school-orange/40 hover:-translate-y-0.5"
            >
              Apply Now 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all hover:-translate-y-0.5"
            >
              <Play className="w-4 h-4" />
              Discover More
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-in animate-delay-500">
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative bg-school-dark py-12 overflow-hidden">
        {/* Subtle gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-r from-school-orange/5 via-transparent to-school-orange/5" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} {...stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* About Snapshot */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-school-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              ref={aboutSection.ref}
              className={cn(
                aboutSection.isVisible ? "animate-in" : "animate-out"
              )}
            >
              <span className="inline-block text-school-orange font-semibold text-sm uppercase tracking-wider mb-3">
                About Sammena
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Education That <span className="text-gradient">Changes Lives</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5 text-lg">
                Founded in 2009 by Samwel Langdare Menavi, Sammena Pre & Primary School was established with a powerful mission: to provide quality education to children who need it most — especially orphans and those from vulnerable backgrounds.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Operating on 7 acres of leased land, our English-medium school offers 8 classrooms, separate boarding facilities for boys and girls, clean piped water, and a caring environment where 259 pupils — including 34 orphans — can learn and grow.
              </p>
              
              {/* Values pills */}
              <div className="flex flex-wrap gap-3 mb-8">
                {values.map(({ icon: Icon, label }, index) => (
                  <div 
                    key={label} 
                    className="flex items-center gap-2 px-4 py-2.5 bg-school-neutral rounded-full border border-border hover:border-school-orange/30 hover:bg-school-orange/5 transition-all cursor-default group"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <Icon className="w-4 h-4 text-school-orange group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-foreground">{label}</span>
                  </div>
                ))}
              </div>
              
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-school-orange font-semibold text-lg hover:gap-3 transition-all"
              >
                Learn More About Us 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            {/* Image section */}
            <div className={cn(
              "relative",
              aboutSection.isVisible ? "animate-in animate-delay-200" : "animate-out"
            )}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group">
                <Image
                  src="/images/about-school.jpg"
                  alt="Students at Sammena School"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-school-dark/40 via-transparent to-transparent" />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-school-dark rounded-2xl px-6 py-5 shadow-2xl animate-float">
                <div className="text-4xl font-bold text-school-orange">2009</div>
                <div className="text-white/70 text-sm mt-1">Year Founded</div>
              </div>
              
              {/* Decorative element */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-school-orange/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features / Why Choose Us */}
      <section className="py-24 bg-school-neutral relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-school-orange/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={featuresHeader.ref}
            className={cn(
              "text-center mb-16",
              featuresHeader.isVisible ? "animate-in" : "animate-out"
            )}
          >
            <span className="inline-block text-school-orange font-semibold text-sm uppercase tracking-wider mb-3">
              Why Sammena
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Education Built for the <span className="text-gradient">Future</span>
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-school-orange/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={testimonialsHeader.ref}
            className={cn(
              "text-center mb-16",
              testimonialsHeader.isVisible ? "animate-in" : "animate-out"
            )}
          >
            <span className="inline-block text-school-orange font-semibold text-sm uppercase tracking-wider mb-3">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              What Our <span className="text-gradient">Community</span> Says
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-school-dark relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-br from-school-orange/10 via-transparent to-school-orange/5" />
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-school-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-school-orange/10 rounded-full blur-3xl" />
        
        <div 
          ref={ctaSection.ref}
          className={cn(
            "relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
            ctaSection.isVisible ? "animate-in" : "animate-out"
          )}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Help Us Change <span className="text-gradient">More Lives</span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Enroll your child or support our mission to provide quality education to orphans and vulnerable children in Tanzania.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/admissions"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-school-orange text-white font-semibold rounded-xl hover:bg-school-orange-light transition-all shadow-xl shadow-school-orange/30 hover:shadow-2xl hover:shadow-school-orange/40 hover:-translate-y-0.5"
            >
              Start Application 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all hover:-translate-y-0.5"
            >
              Contact Admissions
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
