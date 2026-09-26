"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

interface Division {
  id: number;
  number: string;
  name: string;
  eyebrow: string;
  tagline: string;
  products: string[];
  stats: { value: string; label: string }[];
  accentColor: string;
  bgColor: string;
  image: string;
  imageScale: string;
}

const DIVISIONS: Division[] = [
  {
    id: 0,
    number: "01",
    name: "MOBILITY",
    eyebrow: "Navigate performance. Drive reliability.",
    tagline: "High-capacity tank trailers and logistics solutions built for demanding, long-haul industrial operations.",
    products: ["Tank Trailers", "Fuel Bowsers", "Chemical Tankers", "Skid-Mounted Units", "Custom Chassis"],
    stats: [
      { value: "20+", label: "TRAILER TYPES" },
      { value: "ADR", label: "CERTIFIED" },
      { value: "CUSTOM", label: "SOLUTIONS" },
    ],
    accentColor: "#3b82f6",
    bgColor: "#0d2247",
    image: "/images/mobility_1.png",
    imageScale: "scale-100",
  },
  {
    id: 1,
    number: "02",
    name: "STORAGE & PROCESS",
    eyebrow: "Store. Process. Perform.",
    tagline: "One of the leading manufacturers of custom-engineered storage and process systems in the UAE.",
    products: [
      "Storage Tanks", "Pressure Vessels", "Modular Skids", "ISO Tanks",
      "UL Tanks", "DNV Tanks", "Fuel Storage Systems", "Acid Storage & Mixing Tanks",
      "Remote Filling Stations", "and more",
    ],
    stats: [
      { value: "50+", label: "TANK TYPES" },
      { value: "GLOBAL", label: "STANDARDS" },
      { value: "CUSTOM", label: "SOLUTIONS" },
    ],
    accentColor: "#22c55e",
    bgColor: "#052e16",
    image: "/images/storage1.png",
    imageScale: "scale-90",
  },
  {
    id: 2,
    number: "03",
    name: "ENCLOSURE & SYSTEMS",
    eyebrow: "We shield what powers progress.",
    tagline: "DNV-GL and ISO certified containers and enclosures engineered for the harshest offshore environments.",
    products: [
      "Offshore Containers", "Equipment Shelters", "Control Room Units",
      "HVAC Enclosures", "Generator Housings", "Bunded Containments",
    ],
    stats: [
      { value: "DNV-GL", label: "CERTIFIED" },
      { value: "ISO", label: "STANDARDS" },
      { value: "GLOBAL", label: "DELIVERY" },
    ],
    accentColor: "#9ca3af",
    bgColor: "#111827",
    image: "/images/enclosure.png",
    imageScale: "scale-95",
  },
  {
    id: 3,
    number: "04",
    name: "RENTAL & SERVICE",
    eyebrow: "Serve on demand. Always, all ways.",
    tagline: "Flexible rental programs and comprehensive maintenance services keeping your operations at peak performance.",
    products: [
      "Equipment Rental", "On-Site Maintenance", "Tank Inspection",
      "Refurbishment", "24/7 Support", "Spare Parts Supply",
    ],
    stats: [
      { value: "24/7", label: "SUPPORT" },
      { value: "RAPID", label: "DEPLOYMENT" },
      { value: "FULL", label: "LIFECYCLE" },
    ],
    accentColor: "#eab308",
    bgColor: "#1c1002",
    image: "/images/equipment_3_new.png",
    imageScale: "scale-100",
  },
];

export default function DivisionsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  // GSAP staggered fade-in for desktop expanded content
  useEffect(() => {
    const activeContent = contentRefs.current[activeIndex];
    if (!activeContent) return;
    const targets = activeContent.querySelectorAll(".anim-item");
    if (!targets.length) return;
    gsap.fromTo(
      targets,
      { y: 22, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.065, ease: "power3.out", delay: 0.2 }
    );
  }, [activeIndex]);

  const handleSelect = (idx: number) => setActiveIndex(idx);

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelect(idx);
    }
  };

  return (
    <section id="divisions" aria-label="Our Divisions">

      {/* MOBILE / TABLET: vertical accordion (< lg) */}
      <div className="lg:hidden flex flex-col">
        {DIVISIONS.map((division, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={division.id}
              style={{ backgroundColor: division.bgColor }}
              className="overflow-hidden"
            >
              {/* Accordion header */}
              <div
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                aria-controls={`division-panel-${idx}`}
                id={`division-header-${idx}`}
                onClick={() => handleSelect(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="flex items-center justify-between px-6 py-5 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-[3px] h-10 rounded-full flex-shrink-0"
                    style={{ backgroundColor: division.accentColor }}
                    aria-hidden="true"
                  />
                  <div>
                    <span
                      className="font-secondary text-[9px] font-bold tracking-[0.3em] uppercase block"
                      style={{ color: division.accentColor }}
                    >
                      {division.number}
                    </span>
                    <h2 className="font-primary text-lg sm:text-xl font-black uppercase text-white tracking-tight leading-none mt-0.5">
                      {division.name}
                    </h2>
                  </div>
                </div>
                <div
                  className="text-white/40 transition-transform duration-300 flex-shrink-0"
                  style={{ transform: isActive ? "rotate(90deg)" : "rotate(0deg)" }}
                  aria-hidden="true"
                >
                  <ArrowRight size={18} />
                </div>
              </div>

              {/* Accordion body */}
              <div
                id={`division-panel-${idx}`}
                role="region"
                aria-labelledby={`division-header-${idx}`}
                className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]"
                style={{ maxHeight: isActive ? "800px" : "0px" }}
              >
                <div className="px-6 pb-8 space-y-6">
                  <div className="relative w-full h-48 sm:h-64">
                    <Image
                      src={division.image}
                      alt={`${division.name} equipment`}
                      fill
                      className={`object-contain object-center mix-blend-screen ${division.imageScale}`}
                      sizes="(max-width: 1024px) 100vw, 0px"
                    />
                  </div>
                  <p
                    className="font-secondary text-[10px] font-bold tracking-[0.2em] uppercase"
                    style={{ color: division.accentColor }}
                  >
                    {division.eyebrow}
                  </p>
                  <p className="font-secondary text-sm text-white/75 leading-snug">
                    {division.tagline}
                  </p>
                  <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                    {division.stats.map((stat) => (
                      <div key={stat.label} className="space-y-1">
                        <p className="font-primary text-lg font-black" style={{ color: division.accentColor }}>
                          {stat.value}
                        </p>
                        <p className="font-secondary text-[8px] font-bold tracking-[0.2em] uppercase text-white/40">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                    {division.products.map((product) => (
                      <p key={product} className="font-tertiary text-[11px] text-white/55 leading-relaxed">
                        {product}
                      </p>
                    ))}
                  </div>
                  <button
                    className="group flex items-center gap-3"
                    style={{ color: division.accentColor }}
                    aria-label={`Explore ${division.name} division`}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center border-2 group-hover:scale-110 transition-transform"
                      style={{ borderColor: division.accentColor }}
                      aria-hidden="true"
                    >
                      <ArrowRight size={14} />
                    </div>
                    <span className="font-tertiary text-[10px] font-bold tracking-[0.2em] uppercase text-white">
                      Explore Division
                    </span>
                  </button>
                </div>
              </div>
              <div className="h-[1px] bg-white/5" aria-hidden="true" />
            </div>
          );
        })}
      </div>

      {/* DESKTOP: horizontal accordion (lg+) */}
      <div
        className="hidden lg:flex overflow-hidden"
        style={{ height: "clamp(500px, 90vh, 880px)" }}
      >
        {DIVISIONS.map((division, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={division.id}
              role="button"
              tabIndex={0}
              aria-expanded={isActive}
              aria-controls={`division-desktop-panel-${idx}`}
              onClick={() => handleSelect(idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="relative flex-shrink-0 overflow-hidden cursor-pointer transition-all duration-[700ms] ease-[cubic-bezier(0.77,0,0.175,1)] focus:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-white/40"
              style={{
                flex: isActive ? "5 0 0%" : "1 0 0%",
                backgroundColor: division.bgColor,
              }}
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] z-20 transition-opacity duration-500"
                style={{ backgroundColor: division.accentColor, opacity: isActive ? 1 : 0.35 }}
                aria-hidden="true"
              />

              {/* Background image collapsed preview */}
              <div
                className={`absolute inset-0 z-0 transition-opacity duration-700 pointer-events-none ${isActive ? "opacity-0" : "opacity-20"}`}
                aria-hidden="true"
              >
                <Image
                  src={division.image}
                  alt=""
                  fill
                  className={`object-contain object-bottom mix-blend-screen ${division.imageScale}`}
                  sizes="20vw"
                />
              </div>

              {/* Collapsed: vertical rotated title */}
              <div
                className={`absolute inset-0 z-10 flex flex-col justify-end pb-10 pl-4 gap-4 transition-opacity duration-300 ${isActive ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                aria-hidden={isActive}
              >
                <span
                  className="font-secondary text-[9px] font-bold tracking-[0.3em] uppercase"
                  style={{ color: division.accentColor }}
                >
                  {division.number}
                </span>
                <div
                  className="font-primary font-black text-sm lg:text-base uppercase leading-none text-white tracking-wide whitespace-nowrap"
                  style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
                >
                  {division.name}
                </div>
              </div>

              {/* Expanded content */}
              <div
                id={`division-desktop-panel-${idx}`}
                ref={(el) => { contentRefs.current[idx] = el; }}
                className={`absolute inset-0 z-10 flex transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                aria-hidden={!isActive}
              >
                {/* Left: text */}
                <div className="flex flex-col justify-between h-full w-full lg:w-[52%] p-6 lg:p-8 xl:p-10 overflow-hidden min-w-0">
                  <div className="space-y-3">
                    <div className="anim-item flex items-center gap-3 min-w-0">
                      <span
                        className="font-secondary text-[10px] font-bold tracking-[0.3em] uppercase flex-shrink-0"
                        style={{ color: division.accentColor }}
                      >
                        {division.number}
                      </span>
                      <div className="h-[1px] w-6 bg-white/30 flex-shrink-0" aria-hidden="true" />
                      <span className="font-secondary text-[10px] font-bold tracking-[0.15em] uppercase text-white/50 truncate">
                        {division.eyebrow}
                      </span>
                    </div>
                    <h2
                      className="anim-item font-primary font-black uppercase leading-none tracking-tighter text-white break-words"
                      style={{ fontSize: "clamp(1.4rem, 3vw, 2.8rem)" }}
                    >
                      {division.name}
                    </h2>
                    <p className="anim-item font-secondary text-xs xl:text-sm font-light text-white/75 max-w-sm leading-snug">
                      {division.tagline}
                    </p>
                    <button
                      className="anim-item group flex items-center gap-2"
                      style={{ color: division.accentColor }}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Explore ${division.name} division`}
                    >
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center border-2 group-hover:scale-110 transition-transform flex-shrink-0"
                        style={{ borderColor: division.accentColor }}
                        aria-hidden="true"
                      >
                        <ArrowRight size={15} />
                      </div>
                      <span className="font-tertiary text-[10px] font-bold tracking-[0.2em] uppercase text-white">
                        Explore Division
                      </span>
                    </button>
                    <div className="anim-item flex items-center gap-5 xl:gap-7 pt-3 border-t border-white/10">
                      {division.stats.map((stat) => (
                        <div key={stat.label} className="space-y-1 min-w-0">
                          <p className="font-primary text-base font-black" style={{ color: division.accentColor }}>
                            {stat.value}
                          </p>
                          <p className="font-secondary text-[8px] font-bold tracking-[0.2em] uppercase text-white/40">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="anim-item mt-3">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 min-w-0">
                      {division.products.map((product) => (
                        <p key={product} className="font-tertiary text-[10px] text-white/55 leading-tight truncate">
                          {product}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: product image */}
                <div className="relative flex-1 h-full overflow-hidden min-w-0" aria-hidden="true">
                  <Image
                    src={division.image}
                    alt={division.name}
                    fill
                    className={`object-contain object-center mix-blend-screen transition-transform duration-700 hover:scale-105 ${division.imageScale}`}
                    sizes="48vw"
                  />
                  <div
                    className="absolute bottom-4 right-6 font-primary font-black leading-none opacity-[0.08] select-none pointer-events-none"
                    style={{ fontSize: "clamp(5rem, 12vw, 10rem)", color: division.accentColor }}
                    aria-hidden="true"
                  >
                    {division.number}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
