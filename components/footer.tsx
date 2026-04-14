import Link from "next/link"
import { GraduationCap, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/academics", label: "Academics" },
  { href: "/projects", label: "Development Projects" },
]

const moreLinks = [
  { href: "/admissions", label: "Admissions" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
]

const socialLinks = [
  { href: "#", icon: Facebook, label: "Facebook" },
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "#", icon: Youtube, label: "YouTube" },
]

export function Footer() {
  return (
    <footer className="bg-school-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-school-orange flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="leading-tight">
                <span className="block text-white font-bold text-base tracking-wide">SAMMENA</span>
                <span className="block text-school-orange text-[10px] font-medium tracking-[0.15em] uppercase">Pre & Primary</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Providing quality English-medium education, care, and moral guidance to children since 2009 — with special focus on orphans and vulnerable families.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-school-orange flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-school-orange text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">More</h3>
            <ul className="space-y-2.5">
              {moreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-school-orange text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-school-orange mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">Tanzania, East Africa</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-school-orange shrink-0" />
                <a href="tel:+255750227073" className="text-white/60 hover:text-school-orange text-sm transition-colors">
                  +255 750 227 073
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-school-orange shrink-0" />
                <a href="tel:+255692227073" className="text-white/60 hover:text-school-orange text-sm transition-colors">
                  +255 692 227 073
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-school-orange shrink-0" />
                <a href="mailto:info@sammenaschools" className="text-white/60 hover:text-school-orange text-sm transition-colors break-all">
                  info@sammenaschools
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} Sammena School. All rights reserved.
          </p>
          <p className="text-white/40 text-xs">
            Tanzania &mdash; Changing Lives Through Education
          </p>
        </div>
      </div>
    </footer>
  )
}
