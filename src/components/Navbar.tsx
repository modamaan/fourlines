"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/", active: true },
  { label: "About", href: "/about" },
  {
    label: "Divisions",
    href: "#",
    sublinks: [
      { label: "Mobility", href: "/divisions/mobility" },
      { label: "Storage & Process", href: "/divisions/storage" },
      { label: "Enclosure & Systems", href: "/divisions/enclosure" },
      { label: "Rental & Service", href: "/divisions/rental" },
    ],
  },
  { label: "Product", href: "/product" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 text-white ${
        scrolled || isOpen 
          ? "bg-[#030b17]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <div className="flex-shrink-0 z-50">
            <Link href="/" className="flex items-center gap-2 sm:gap-3" onClick={() => setIsOpen(false)}>
              <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                <Image 
                  src="/bg_fourline_icon.png" 
                  alt="Four Lines Icon" 
                  fill 
                  sizes="(max-width: 768px) 48px, 64px"
                  className="object-contain object-left"
                />
              </div>
              <div className="font-primary font-bold text-lg sm:text-2xl tracking-tight uppercase flex flex-col leading-none pt-1">
                <span className="text-white">FOUR LINES</span>
                <span className="font-secondary text-[0.55rem] sm:text-[0.65rem] text-gray-400 font-semibold tracking-[0.3em] mt-1">INDUSTRIES</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="flex items-baseline space-x-10">
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="relative group">
                  {link.sublinks ? (
                    <button
                      className={`font-tertiary text-sm font-semibold tracking-wide transition-colors relative pb-1 flex items-center gap-1 ${
                        link.active ? "text-white" : "text-gray-300 hover:text-white"
                      }`}
                      onMouseEnter={() => setActiveDropdown(link.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={`font-tertiary text-sm font-semibold tracking-wide transition-colors relative pb-1 ${
                        link.active ? "text-white" : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {link.label}
                      {link.active && (
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 rounded-full" />
                      )}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {link.sublinks && (
                    <div
                      className={`absolute left-0 mt-4 w-56 rounded-md shadow-lg bg-black/90 backdrop-blur-lg border border-white/10 ring-1 ring-black ring-opacity-5 transition-all duration-300 transform origin-top-left ${
                        activeDropdown === link.label
                          ? "opacity-100 scale-100 visible"
                          : "opacity-0 scale-95 invisible"
                      }`}
                      onMouseEnter={() => setActiveDropdown(link.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="py-2">
                        {link.sublinks.map((sublink) => (
                          <Link
                            key={sublink.label}
                            href={sublink.href}
                            className="block px-4 py-3 text-sm font-tertiary text-gray-300 hover:bg-blue-600/20 hover:text-white transition-colors"
                          >
                            {sublink.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile menu button & Hamburger */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-400 focus:outline-none transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-8 w-8" /> : <Menu className="block h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 ease-in-out origin-top ${
          isOpen ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-0 invisible"
        } bg-[#030b17]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl`}
      >
        <div className="px-4 py-6 space-y-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
          {NAV_LINKS.map((link) => (
            <div key={link.label}>
              {link.sublinks ? (
                <>
                  <div className="px-3 py-2 text-sm font-semibold text-blue-400 uppercase tracking-wider font-primary">
                    {link.label}
                  </div>
                  <div className="pl-4 space-y-1 mt-1 border-l border-white/10 ml-4">
                    {link.sublinks.map((sublink) => (
                      <Link
                        key={sublink.label}
                        href={sublink.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2.5 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-tertiary"
                      >
                        {sublink.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3.5 rounded-md text-base font-medium transition-colors font-tertiary ${
                    link.active ? "bg-blue-600/20 text-white border border-blue-500/30" : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
