"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Settings, Shield, Globe } from "lucide-react";

const EQUIPMENT_TYPES = [
  {
    title: "STORAGE TANKS",
    subtitle: "INDUSTRIAL STORAGE SOLUTIONS FOR A BETTER FUTURE",
    description: "One of the leading manufacturers of custom-engineered storage systems and solutions in the UAE.",
    image: "/images/tank.png",
    imageClassName: "scale-60", // Adjust size (e.g., scale-110, scale-90) or position (e.g., translate-y-4)
  },
  {
    title: "STORAGE TANKS",
    subtitle: "CERTIFIED CONTAINERS FOR GLOBAL LOGISTICS",
    description: "DNV-GL and ISO certified containers designed for safe chemical and offshore transport.",
    image: "/images/storage1.png",
    imageClassName: "scale-70",
  },
  {
    title: "TANK TRAILERS",
    subtitle: "HIGH-CAPACITY TRANSPORTATION SYSTEMS",
    description: "Reliable and safe transportation solutions built for demanding logistics.",
    image: "/images/equipment_original.png",
    imageClassName: "scale-80",
  },
  {
    title: "ENCLOSURES",
    subtitle: "TAILOR-MADE ENCLOSURES FOR GLOBAL LOGISTICS",
    description: "DNV-GL and ISO certified enclosures designed for safe chemical and offshore transport.",
    image: "/images/enclosure.png",
    imageClassName: "scale-60",
  },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const changeSlide = (newIndex: number) => {
    const outTargets = [titleRef.current, subtitleRef.current, descRef.current].filter(Boolean);
    if (outTargets.length === 0) return;

    // Animate text out
    gsap.to(outTargets, {
      y: -20,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in",
      onComplete: () => {
        setCurrentIndex(newIndex);

        setTimeout(() => {
          const inTargets = [titleRef.current, subtitleRef.current, descRef.current].filter(Boolean);
          if (inTargets.length > 0) {
            // Animate text in
            gsap.fromTo(
              inTargets,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" }
            );
          }
        }, 50); // Small delay to let React render the new text
      },
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide((currentIndex + 1) % EQUIPMENT_TYPES.length);
    }, 4000); // Changed to 4 seconds to allow reading

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => changeSlide((currentIndex + 1) % EQUIPMENT_TYPES.length);
  const prevSlide = () => changeSlide((currentIndex - 1 + EQUIPMENT_TYPES.length) % EQUIPMENT_TYPES.length);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-black text-white"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_bg1.png.png"
          alt="Industrial Background"
          fill
          priority
          className="object-cover opacity-80 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07162b] via-[#07162b]/80 to-transparent" />
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[60vh]">
          {/* Left Text Content */}
          <div ref={textRef} className="space-y-5 md:space-y-8 max-w-2xl relative z-40 w-full min-w-0">
            <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-bold tracking-widest sm:tracking-[0.2em] text-gray-300 flex-wrap">
              <div className="w-8 sm:w-12 h-[2px] bg-white/50" />
              <span className="truncate sm:whitespace-normal">POWERING A STRONGER TOMORROW</span>
            </div>

            <div className="space-y-4 sm:space-y-5">
              <h1
                ref={titleRef}
                className="font-primary text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-none drop-shadow-2xl break-words"
              >
                {EQUIPMENT_TYPES[currentIndex].title}
              </h1>
              <h2
                ref={subtitleRef}
                className="font-secondary text-lg sm:text-xl lg:text-[26px] font-medium text-gray-200 uppercase max-w-lg leading-snug pr-4"
              >
                {EQUIPMENT_TYPES[currentIndex].subtitle}
              </h2>
              <div className="pt-2">
                <p
                  ref={descRef}
                  className="font-tertiary text-sm sm:text-base lg:text-[15px] text-gray-300 max-w-sm leading-relaxed pr-4"
                >
                  {EQUIPMENT_TYPES[currentIndex].description}
                </p>
              </div>
              <div className="w-[2px] h-6 bg-blue-500/50 mt-4" />
            </div>

            {/* Features Row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-8">
              <div className="flex items-center gap-2 sm:gap-3">
                <Settings size={20} className="text-blue-400 shrink-0" />
                <span className="font-tertiary text-[10px] sm:text-xs font-semibold text-gray-300 leading-tight">Reliable<br />Performance</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Shield size={20} className="text-blue-400 shrink-0" />
                <span className="font-tertiary text-[10px] sm:text-xs font-semibold text-gray-300 leading-tight">Global<br />Support</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Globe size={20} className="text-blue-400 shrink-0" />
                <span className="font-tertiary text-[10px] sm:text-xs font-semibold text-gray-300 leading-tight">Built for<br />Real Work</span>
              </div>
            </div>
          </div>

          {/* Right Visual Image (3D Carousel) */}
          <div className="relative h-[350px] sm:h-[450px] lg:h-[650px] xl:h-[750px] w-full pointer-events-none mt-4 lg:mt-0 perspective-[1000px] min-w-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] sm:w-[95%] sm:h-[95%] lg:w-[125%] lg:h-[125%] mix-blend-screen lg:-ml-12 xl:-ml-20">
              {EQUIPMENT_TYPES.map((equipment, idx) => {
                const diff = (idx - currentIndex + EQUIPMENT_TYPES.length) % EQUIPMENT_TYPES.length;
                let transformClass = "";
                let zIndex = 0;
                let opacity = 0;

                if (diff === 0) {
                  // Center (Active)
                  transformClass = "translate-x-0 scale-100 blur-none";
                  opacity = 1;
                  zIndex = 30;
                } else if (diff === 1) {
                  // Right (Next) - Hidden but positioned for slide in
                  transformClass = "translate-x-[15%] scale-100 blur-none";
                  opacity = 0;
                  zIndex = 20;
                } else if (diff === EQUIPMENT_TYPES.length - 1) {
                  // Left (Prev) - Hidden but positioned for slide out
                  transformClass = "-translate-x-[15%] scale-100 blur-none";
                  opacity = 0;
                  zIndex = 20;
                } else {
                  // Back (Hidden)
                  transformClass = "translate-x-0 scale-95 blur-none";
                  opacity = 0;
                  zIndex = 10;
                }

                return (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${transformClass}`}
                    style={{ zIndex, opacity }}
                  >
                    <Image
                      src={equipment.image}
                      alt={equipment.title}
                      fill
                      priority={diff === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={`object-contain object-center lg:pr-8 transition-transform duration-500 ${equipment.imageClassName || ""}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="absolute bottom-10 left-6 right-6 flex items-center justify-between text-sm font-semibold tracking-widest text-gray-400 font-tertiary">

          {/* Carousel Controls */}
          <div className="flex items-center gap-6 md:absolute md:left-1/2 md:-translate-x-1/2">
            <button onClick={prevSlide} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors">
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-2">
              {EQUIPMENT_TYPES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => changeSlide(idx)}
                  className={`h-[2px] transition-all duration-300 ${idx === currentIndex ? "w-8 bg-blue-500" : "w-4 bg-white/20"}`}
                />
              ))}
            </div>
            <button onClick={nextSlide} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
