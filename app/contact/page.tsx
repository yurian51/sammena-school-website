"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Send, CheckCircle } from "lucide-react"

const contactInfo = [
  {
    icon: Phone,
    label: "Phone Numbers",
    lines: ["+255 750 227 073", "+255 692 227 073"],
    href: "tel:+255750227073",
  },
  {
    icon: Mail,
    label: "Email Address",
    lines: ["info@sammenaschools"],
    href: "mailto:info@sammenaschools",
  },
  {
    icon: MapPin,
    label: "Location",
    lines: ["Sammena School", "Tanzania, East Africa"],
    href: "#map",
  },
]

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "Twitter / X", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
]

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-school-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">Get in Touch</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-balance">Contact Us</h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto leading-relaxed">
            We&apos;d love to hear from you. Reach out to our team for admissions enquiries, general information, or to schedule a school visit.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 bg-school-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-5">
            {contactInfo.map(({ icon: Icon, label, lines, href }) => (
              <a
                key={label}
                href={href}
                className="group flex gap-4 bg-card rounded-2xl p-6 border border-border hover:border-school-orange/30 hover:shadow-lg transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-school-orange/10 flex items-center justify-center shrink-0 group-hover:bg-school-orange transition-colors">
                  <Icon className="w-5 h-5 text-school-orange group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{label}</div>
                  {lines.map((line) => (
                    <div key={line} className="text-foreground font-medium text-sm">{line}</div>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Form */}
            <div>
              <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">Send a Message</span>
              <h2 className="text-3xl font-bold text-foreground mt-2 mb-6 text-balance">
                We&apos;ll Get Back to You Shortly
              </h2>

              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-16 bg-card rounded-2xl border border-border">
                  <div className="w-16 h-16 rounded-full bg-school-orange/10 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-school-orange" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    Thank you for reaching out to Sammena School. A member of our team will respond within 1–2 business days.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormState({ name: "", email: "", subject: "", message: "" }) }}
                    className="mt-5 text-school-orange text-sm font-semibold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-7 space-y-5 shadow-sm">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                        Full Name <span className="text-school-orange">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-school-orange/30 focus:border-school-orange transition"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                        Email Address <span className="text-school-orange">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-school-orange/30 focus:border-school-orange transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1.5">
                      Subject <span className="text-school-orange">*</span>
                    </label>
                    <select
                      id="subject"
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-school-orange/30 focus:border-school-orange transition"
                    >
                      <option value="">Select a subject...</option>
                      <option>Admissions Enquiry</option>
                      <option>Fee Structure</option>
                      <option>Academic Programs</option>
                      <option>Boarding Facilities</option>
                      <option>General Information</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                      Message <span className="text-school-orange">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="How can we help you?"
                      className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-school-orange/30 focus:border-school-orange transition resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-school-dark text-white font-semibold rounded-xl hover:bg-school-orange transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send Message <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Map + Social */}
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-school-orange font-semibold text-sm uppercase tracking-wider">Location</span>
                <h2 className="text-3xl font-bold text-foreground mt-2 mb-4">Find Us in Tanzania</h2>
              </div>
              <div id="map" className="rounded-2xl overflow-hidden border border-border shadow-md flex-1 min-h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4063011.5537267485!2d33.0!3d-6.369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4bae169bd6f1%3A0x940f6b26a086a3ef!2sTanzania!5e0!3m2!1sen!2sus!4v1699000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "280px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sammena School location on Google Maps"
                />
              </div>

              {/* Social Media */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-school-neutral hover:bg-school-dark hover:text-white text-foreground/70 transition-all group text-sm font-medium"
                    >
                      <Icon className="w-4 h-4 text-muted-foreground group-hover:text-school-orange transition-colors" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
