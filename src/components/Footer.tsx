"use client";

import Image from "next/image";
import { ArrowRight, MapPin, Phone, Mail, Globe } from "lucide-react";

// Inline SVG brand icons — not available in this version of lucide-react
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const NAV_LINKS = [
  { label: "Mobility", href: "#divisions" },
  { label: "Storage & Process", href: "#divisions" },
  { label: "Enclosure & Systems", href: "#divisions" },
  { label: "Rental & Service", href: "#divisions" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Our Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

const CONTACT_INFO = [
  { icon: MapPin, text: "Mussafah Industrial Area, Abu Dhabi, UAE" },
  { icon: Phone, text: "+971 2 550 1234" },
  { icon: Mail, text: "info@fourlinesind.com" },
];

const SOCIALS = [
  { icon: LinkedInIcon, href: "#", label: "LinkedIn" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: XIcon, href: "#", label: "X (Twitter)" },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative w-full overflow-hidden bg-[#030b17]">

      {/* ── CTA HERO BLOCK with background image ── */}
      <div className="relative w-full min-h-[520px] md:min-h-[600px] flex items-end overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/footer_1.png"
            alt="Four Lines Industries industrial facility at night"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030b17] via-[#030b17]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030b17] via-[#030b17]/20 to-transparent" />
        </div>

        {/* CTA content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pb-20 pt-32">
          <div className="max-w-2xl space-y-6">
            {/* Eyebrow */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-[2px] bg-blue-400" />
              <span className="font-secondary text-[10px] font-bold tracking-[0.3em] uppercase text-blue-300">
                Get In Touch
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-primary text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black uppercase leading-none tracking-tighter text-white">
              Build With<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Four Lines.
              </span>
            </h2>

            {/* Sub */}
            <p className="font-tertiary text-sm sm:text-base text-gray-300 leading-relaxed max-w-md">
              Whether you need a custom storage tank, offshore container, or full turnkey solution — our team engineers it to last.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="mailto:info@fourlinesind.com"
                className="group flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 transition-colors duration-300"
              >
                <span className="font-tertiary text-sm font-bold tracking-widest uppercase">Start a Project</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:+97125501234"
                className="group flex items-center gap-3 border border-white/30 hover:border-white/60 text-white px-6 py-3 transition-colors duration-300"
              >
                <Phone size={14} />
                <span className="font-tertiary text-sm font-bold tracking-widest uppercase">Call Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER INFO GRID ── */}
      <div className="relative z-10 w-full border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* Brand column */}
            <div className="space-y-6 sm:col-span-2 lg:col-span-1">
              <div>
                <div className="font-primary font-bold text-2xl tracking-tight uppercase text-white leading-none">
                  FOUR<br />LINES
                </div>
                <span className="font-secondary text-[0.6rem] text-gray-400 font-semibold tracking-[0.3em] uppercase mt-1 block">
                  Industries LLC
                </span>
              </div>
              <p className="font-tertiary text-xs text-gray-400 leading-relaxed max-w-[220px]">
                Engineering industrial excellence across the UAE and beyond since our founding.
              </p>
              {/* Socials */}
              <div className="flex items-center gap-3">
                {SOCIALS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-8 h-8 flex items-center justify-center border border-white/20 text-gray-400 hover:text-white hover:border-blue-500 transition-colors duration-300"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Divisions */}
            <div className="space-y-5">
              <h3 className="font-secondary text-[10px] font-bold tracking-[0.3em] uppercase text-blue-400">
                Divisions
              </h3>
              <ul className="space-y-3">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="font-tertiary text-xs text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-3 h-[1px] bg-blue-400 transition-all duration-300 flex-shrink-0" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-5">
              <h3 className="font-secondary text-[10px] font-bold tracking-[0.3em] uppercase text-blue-400">
                Company
              </h3>
              <ul className="space-y-3">
                {COMPANY_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="font-tertiary text-xs text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-3 h-[1px] bg-blue-400 transition-all duration-300 flex-shrink-0" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-5">
              <h3 className="font-secondary text-[10px] font-bold tracking-[0.3em] uppercase text-blue-400">
                Contact
              </h3>
              <ul className="space-y-4">
                {CONTACT_INFO.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <Icon size={13} className="text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="font-tertiary text-xs text-gray-400 leading-relaxed">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-tertiary text-[10px] text-gray-600 tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Four Lines Industries LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-tertiary text-[10px] text-gray-600 hover:text-gray-400 tracking-widest uppercase transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-tertiary text-[10px] text-gray-600 hover:text-gray-400 tracking-widest uppercase transition-colors">
              Terms of Use
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}
