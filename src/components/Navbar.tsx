"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";

interface DivisionLink {
  label: string;
  href: string;
  description: string;
}

const DIVISION_LINKS: DivisionLink[] = [
  {
    label: "Storage & Process",
    href: "#divisions",
    description: "Custom tanks, fuel stations & skids",
  },
  {
    label: "Mobility",
    href: "#divisions",
    description: "Tank trailers, tippers & heavy transport",
  },
  {
    label: "Enclosure & Systems",
    href: "#divisions",
    description: "Acoustic modular generator enclosures",
  },
  {
    label: "Rental & Service",
    href: "#divisions",
    description: "ISO tanks, fleet rental & equipment",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close dropdown on outside click or escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 180);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled || isOpen
        ? "bg-[#030b17]/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl text-white"
        : "bg-transparent py-4 md:py-6"
        }`}
    >
      <div className="max-w-[880px] lg:max-w-[940px] mx-auto px-4 sm:px-6">
        <div className="relative flex items-center justify-between h-14 md:h-16">

          {/* ── LEFT NAVIGATION: HOME & DIVISIONS (BLUE) ── */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12 flex-1 justify-start">
            {/* HOME Link */}
            <Link
              href="/"
              className={`font-secondary text-xs lg:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 relative py-1 ${scrolled
                ? "text-white hover:text-blue-400"
                : "text-[#1d4ed8] hover:text-[#2563eb]"
                }`}
            >
              HOME
            </Link>

            {/* DIVISIONS Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                className={`font-secondary text-xs lg:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 relative py-1 flex items-center gap-1.5 cursor-pointer select-none ${scrolled
                  ? "text-white hover:text-blue-400"
                  : "text-[#1d4ed8] hover:text-[#2563eb]"
                  }`}
              >
                <span>DIVISIONS</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* Invisible Hover Bridge & Dropdown Menu Container (eliminates cursor gap) */}
              <div
                className={`absolute left-0 top-full pt-2 w-72 transition-all duration-300 origin-top-left z-50 ${dropdownOpen
                  ? "opacity-100 scale-100 visible translate-y-0"
                  : "opacity-0 scale-95 invisible -translate-y-2 pointer-events-none"
                  }`}
              >
                <div className="rounded-xl shadow-2xl bg-[#030b17]/95 backdrop-blur-2xl border border-white/10 ring-1 ring-black/40 p-2 overflow-hidden">
                  <div className="px-3 py-2 border-b border-white/5 mb-1">
                    <span className="font-secondary text-[10px] font-extrabold uppercase tracking-[0.25em] text-gray-400">
                      Four Lines Divisions
                    </span>
                  </div>

                  {DIVISION_LINKS.map((sublink) => (
                    <Link
                      key={sublink.label}
                      href={sublink.href}
                      onClick={() => setDropdownOpen(false)}
                      className="group flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-secondary font-bold tracking-wider uppercase text-gray-200 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                    >
                      <div className="flex flex-col text-left">
                        <span>{sublink.label}</span>
                        <span className="font-tertiary text-[9px] font-normal normal-case text-gray-400 group-hover:text-gray-300 tracking-normal">
                          {sublink.description}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-500 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-white" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── CENTER BRAND LOGO: [Icon] FOUR LINES (BLUE) ── */}
          <div className="flex-shrink-0 flex items-center justify-center px-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 sm:gap-3 group"
              onClick={() => setIsOpen(false)}
            >
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/bg_fourline_icon.png"
                  alt="Four Lines Icon"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div className="font-primary font-bold text-base sm:text-lg lg:text-xl tracking-tight uppercase flex flex-col leading-none pt-0.5">
                <span
                  className={`transition-colors duration-300 ${scrolled ? "text-white" : "text-[#1d4ed8]"
                    }`}
                >
                  FOUR LINES
                </span>
                <span
                  className={`font-secondary text-[0.48rem] sm:text-[0.58rem] font-bold tracking-[0.32em] mt-0.5 transition-colors duration-300 ${scrolled ? "text-gray-400" : "text-[#1d4ed8]/75"
                    }`}
                >
                  INDUSTRIES
                </span>
              </div>
            </Link>
          </div>

          {/* ── RIGHT NAVIGATION: ABOUT & CONTACT (WHITE) ── */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12 flex-1 justify-end">
            {/* ABOUT Link (White) */}
            <Link
              href="#about"
              className={`font-secondary text-xs lg:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 relative py-1 ${scrolled
                ? "text-white hover:text-blue-400"
                : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] hover:text-white/80"
                }`}
            >
              ABOUT
            </Link>

            {/* CONTACT Link (White) */}
            <Link
              href="#contact"
              className={`font-secondary text-xs lg:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 relative py-1 ${scrolled
                ? "text-white hover:text-blue-400"
                : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] hover:text-white/80"
                }`}
            >
              CONTACT
            </Link>
          </div>

          {/* ── MOBILE MENU BUTTON ── */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Navigation Menu"
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors ${scrolled ? "text-white hover:text-blue-400" : "text-[#1d4ed8] hover:text-[#2563eb]"
                }`}
            >
              {isOpen ? <X className="block h-7 w-7" /> : <Menu className="block h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── MOBILE MENU ACCORDION ── */}
      <div
        className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 ease-in-out origin-top ${isOpen ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-0 invisible"
          } bg-[#030b17]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl`}
      >
        <div className="px-5 py-6 space-y-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
          {/* Mobile Home */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 rounded-md text-sm font-secondary font-bold tracking-widest uppercase bg-[#1d4ed8]/20 text-white border border-[#1d4ed8]/30"
          >
            HOME
          </Link>

          {/* Mobile Divisions */}
          <div className="pt-1">
            <div className="px-4 py-2 text-xs font-secondary font-bold text-blue-400 uppercase tracking-widest">
              DIVISIONS
            </div>
            <div className="pl-4 space-y-1 mt-1 border-l border-white/10 ml-4">
              {DIVISION_LINKS.map((sublink) => (
                <Link
                  key={sublink.label}
                  href={sublink.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2.5 rounded-md text-xs font-secondary font-medium uppercase tracking-wider text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {sublink.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile About */}
          <Link
            href="#about"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 rounded-md text-sm font-secondary font-bold tracking-widest uppercase text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            ABOUT
          </Link>

          {/* Mobile Contact */}
          <Link
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 rounded-md text-sm font-secondary font-bold tracking-widest uppercase text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            CONTACT
          </Link>
        </div>
      </div>
    </nav>
  );
}
