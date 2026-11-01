"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSlide {
  id: string;
  title: string;
  divisionName: string;
  description: string;
  themeColor: string; // The signature division color
  gradientLight: string;
  gradientDark: string;
  bgLightColor: string; // Dynamic background tint for each division
  mainProduct: {
    image: string;
    alt: string;
    name: string;
  };
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "mobility",
    title: "MOBILITY",
    divisionName: "MOBILITY",
    description: "Heavy-duty commercial trailers, tippers, and specialized transport systems engineered for GCC terrain.",
    themeColor: "#1b1464", // Deep Midnight Indigo from brand reference
    gradientLight: "#2d239c",
    gradientDark: "#100b40",
    bgLightColor: "#edf1fb", // Soft cool light indigo/blue tint
    mainProduct: {
      image: "/images/equipment_original.png",
      alt: "Four Lines heavy tipper and tank semi-trailer",
      name: "Tank & Tipper Semi-Trailers",
    },
  },
  {
    id: "storage",
    title: "STORAGE",
    divisionName: "STORAGE",
    description: "Safe and efficient transport solutions for liquid, gas and chemical products.",
    themeColor: "#17632F", // User exact dark-green
    gradientLight: "#228b43",
    gradientDark: "#0d401e",
    bgLightColor: "#eaf5ee", // Soft fresh light sage green tint
    mainProduct: {
      image: "/images/storage1.png",
      alt: "Four Lines custom storage tank and fuel dispensing unit",
      name: "Storage Tanks & Dispensing Skids",
    },
  },
  {
    id: "enclosure",
    title: "ENCLOSURE",
    divisionName: "ENCLOSURE",
    description: "High-performance acoustic enclosures and modular power plant packages built for extreme environments.",
    themeColor: "#0c6428", // Forest Green from branding
    gradientLight: "#158c3a",
    gradientDark: "#063d17",
    bgLightColor: "#e7f6ec", // Soft crisp light emerald/forest tint
    mainProduct: {
      image: "/images/enclosure.png",
      alt: "Four Lines acoustic modular power generator enclosure",
      name: "Modular Acoustic Enclosures",
    },
  },
  {
    id: "rental",
    title: "RENTAL",
    divisionName: "RENTAL",
    description: "Comprehensive fleet rental solutions, ISO tanks, and heavy equipment for immediate deployment.",
    themeColor: "#e8590c", // Industrial Orange from branding
    gradientLight: "#ff6f22",
    gradientDark: "#a83a00",
    bgLightColor: "#fff1e8", // Soft warm light apricot/peach tint
    mainProduct: {
      image: "/images/equipment_3_new.png",
      alt: "Four Lines heavy equipment fleet and rental units",
      name: "Rental Fleet & Heavy Equipment",
    },
  },
];

const AUTOPLAY_DURATION = 6500;

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeProductImage, setActiveProductImage] = useState<string>(HERO_SLIDES[0].mainProduct.image);
  const [activeProductName, setActiveProductName] = useState<string>(HERO_SLIDES[0].mainProduct.name);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Animation refs
  const sectionRef = useRef<HTMLDivElement>(null);
  const shapePathRef = useRef<SVGPathElement>(null);
  const shapeContainerRef = useRef<HTMLDivElement>(null);
  const gradStopLightRef = useRef<SVGStopElement>(null);
  const gradStopMidRef = useRef<SVGStopElement>(null);
  const gradStopDarkRef = useRef<SVGStopElement>(null);
  const productContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const activeSlide = HERO_SLIDES[currentIndex];

  // ── CLOCKWISE ROTATING COLOR SECTION (Image remains clean & stable) ──
  const goToSlide = useCallback(
    (newIndex: number, direction: 1 | -1 = 1) => {
      if (isTransitioning || newIndex === currentIndex) return;

      setIsTransitioning(true);
      const nextSlideData = HERO_SLIDES[newIndex];

      const productEl = productContainerRef.current;
      const shapeContainerEl = shapeContainerRef.current;
      const textEls = [titleRef.current, descRef.current].filter(Boolean);
      const thumbsEl = thumbnailsRef.current;

      // ── OUTGOING TIMELINE ──────────────────────────────────────────
      const tlOut = gsap.timeline({
        onComplete: () => {
          setCurrentIndex(newIndex);
          setActiveProductImage(nextSlideData.mainProduct.image);
          setActiveProductName(nextSlideData.mainProduct.name);

          // ── INCOMING TIMELINE ──────────────────────────────────────
          requestAnimationFrame(() => {
            const tlIn = gsap.timeline({
              onComplete: () => setIsTransitioning(false),
            });

            // 1. CLOCKWISE SWEEP ON COLOR SECTION (Organic Curved Shape)
            // Entering from -28° and rotating clockwise to 0° with fluid deceleration
            if (shapeContainerEl) {
              tlIn.fromTo(
                shapeContainerEl,
                {
                  rotate: direction > 0 ? -28 : 28,
                  scale: 1.04,
                },
                {
                  rotate: 0,
                  scale: 1,
                  duration: 0.9,
                  ease: "power3.out",
                },
                0
              );
            }

            // Dynamic color stops morphing to new division palette
            if (gradStopLightRef.current) {
              tlIn.to(gradStopLightRef.current, { stopColor: nextSlideData.gradientLight, duration: 0.85, ease: "power2.out" }, 0);
            }
            if (gradStopMidRef.current) {
              tlIn.to(gradStopMidRef.current, { stopColor: nextSlideData.themeColor, duration: 0.85, ease: "power2.out" }, 0);
            }
            if (gradStopDarkRef.current) {
              tlIn.to(gradStopDarkRef.current, { stopColor: nextSlideData.gradientDark, duration: 0.85, ease: "power2.out" }, 0);
            }

            // Animate section background to the new division's light tint
            if (sectionRef.current) {
              tlIn.to(
                sectionRef.current,
                { backgroundColor: nextSlideData.bgLightColor, duration: 0.85, ease: "power2.out" },
                0
              );
            }

            // 2. PRODUCT IMAGE: NOT ROTATING — stable, clean fade & scale in
            if (productEl) {
              tlIn.fromTo(
                productEl,
                {
                  opacity: 0,
                  scale: 0.94,
                  y: direction > 0 ? 18 : -18,
                  rotateY: 0,
                  rotateX: 0,
                  rotateZ: 0,
                },
                {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  rotateY: 0,
                  rotateX: 0,
                  rotateZ: 0,
                  duration: 0.65,
                  ease: "power3.out",
                },
                0.08
              );
            }

            // 3. TEXT ENTRANCE ON WHITE SIDE
            if (textEls.length > 0) {
              tlIn.fromTo(
                textEls,
                {
                  y: direction > 0 ? 18 : -18,
                  opacity: 0,
                },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.55,
                  stagger: 0.05,
                  ease: "power3.out",
                },
                0.12
              );
            }

            // 4. THUMBNAILS ENTRANCE
            if (thumbsEl) {
              tlIn.fromTo(
                thumbsEl,
                { opacity: 0, y: 12 },
                { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
                0.18
              );
            }
          });
        },
      });

      // 1. CLOCKWISE ROTATION ON COLOR SECTION (Outgoing)
      // Rotates clockwise from 0° -> +22° as it exits
      if (shapeContainerEl) {
        tlOut.to(
          shapeContainerEl,
          {
            rotate: direction > 0 ? 22 : -22,
            scale: 0.96,
            duration: 0.38,
            ease: "power2.in",
          },
          0
        );
      }

      // 2. PRODUCT IMAGE: NOT ROTATING — clean fade & scale out
      if (productEl) {
        tlOut.to(
          productEl,
          {
            opacity: 0,
            scale: 0.95,
            y: direction > 0 ? -16 : 16,
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0,
            duration: 0.32,
            ease: "power2.in",
          },
          0
        );
      }

      // 3. TEXT EXIT
      if (textEls.length > 0) {
        tlOut.to(
          textEls,
          {
            y: direction > 0 ? -12 : 12,
            opacity: 0,
            duration: 0.28,
            stagger: 0.02,
            ease: "power2.in",
          },
          0
        );
      }
    },
    [currentIndex, isTransitioning]
  );

  const nextSlide = useCallback(() => {
    const nextIdx = (currentIndex + 1) % HERO_SLIDES.length;
    goToSlide(nextIdx, 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    const prevIdx = (currentIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
    goToSlide(prevIdx, -1);
  }, [currentIndex, goToSlide]);

  // Autoplay loop
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_DURATION);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Mobile Touch Swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  // Interactive subtle cursor tilt on the product stage
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPercent = (e.clientX - rect.left) / rect.width - 0.5;
    const yPercent = (e.clientY - rect.top) / rect.height - 0.5;

    if (!isTransitioning && productContainerRef.current) {
      gsap.to(productContainerRef.current, {
        rotateY: xPercent * 10,
        rotateX: -yPercent * 8,
        scale: 1.015,
        duration: 0.45,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    if (productContainerRef.current) {
      gsap.to(productContainerRef.current, {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.7,
        ease: "power2.out",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Four Lines Four Divisions Showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-screen max-h-[100dvh] min-h-[640px] overflow-hidden select-none transition-colors duration-700"
      style={{ backgroundColor: activeSlide.bgLightColor }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. EXACT FULL ORGANIC ROUNDED PEBBLE SHAPE (User Reference Spec)
             - Fully traced from the design specification mockup
             - Top-left rounded apex starting at x~49.5%, y~21%
             - Smooth diagonal curve sweeping down-right across center to x~56.8% at bottom
             - Full organic bleed across top-right (x~102%, y~-4.5%), rightmost apex (x~128%, y~80%), and bottom apex (x~78%, y~131.5%)
             - Clipped cleanly by the hero overflow-hidden container
             - Drop shadow and dynamic division gradient interpolation
          ───────────────────────────────────────────────────────────── */}
      <div
        ref={shapeContainerRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none z-1  transform-gpu will-change-transform"
        style={{
          transformOrigin: "75% 52%",
        }}
      >
        <svg
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          className="w-full h-full drop-shadow-[-22px_0_45px_rgba(0,0,0,0.18)] overflow-visible"
        >
          <defs>
            {/* Dynamic theme gradient with depth stops */}
            <linearGradient id="themeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                ref={gradStopLightRef}
                offset="0%"
                stopColor={activeSlide.gradientLight}
              />
              <stop
                ref={gradStopMidRef}
                offset="50%"
                stopColor={activeSlide.themeColor}
              />
              <stop
                ref={gradStopDarkRef}
                offset="100%"
                stopColor={activeSlide.gradientDark}
              />
            </linearGradient>

            {/* Subtle glossy satin surface sheen overlay */}
            <linearGradient id="surfaceSheen" x1="10%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.01" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
            </linearGradient>
          </defs>

          {/* Enlarged Organic Shape Group (Scale increased by ~22%) */}
          <g transform="translate(750, 500) scale(1.22) translate(-750, -500)">
            {/* Main Curved Organic Pebble with dynamic gradient */}
            <path
              ref={shapePathRef}
              d="M 630 130 C 760 60, 920 -35, 1100 -45 C 1240 -45, 1355 400, 1362 796 C 1362 1100, 1080 1315, 866 1315 C 750 1315, 675 1160, 648 1000 C 615 760, 555 480, 553 285 C 545 220, 575 150, 630 130 Z"
              fill="url(#themeGradient)"
            />

            {/* Surface Sheen Overlay */}
            <path
              d="M 630 130 C 760 60, 920 -35, 1100 -45 C 1240 -45, 1355 400, 1362 796 C 1362 1100, 1080 1315, 866 1315 C 750 1315, 675 1160, 648 1000 C 615 760, 555 480, 553 285 C 545 220, 575 150, 630 130 Z"
              fill="url(#surfaceSheen)"
            />
          </g>
        </svg>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. "FOUR LINES" WATERMARK — 70% width, centered, static
          ───────────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[95%] text-center pointer-events-none select-none overflow-hidden"
        style={{ zIndex: 2 }}
      >
        <span
          className="font-handel block leading-[0.88] uppercase select-none w-full"
          style={{
            fontSize: "clamp(5rem, 10vw, 200px)",
            letterSpacing: "0.05em",
            color: "rgba(175,178,185,0.52)",
            WebkitTextStroke: "1px rgba(110,115,130,0.16)",
            textShadow: "0 2px 40px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.15)",
            mixBlendMode: "multiply",
          }}
        >
          FOUR LINES
        </span>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. VERTICAL LEFT DIVISION NAVIGATION LIST (Reference Image)
             - Clean vertical stack without horizontal dashes
             - Active division has an underline directly under the text
             - Positioned at lg:left-24 xl:left-28 to perfectly align with bottom title & clear slide arrows
          ───────────────────────────────────────────────────────────── */}
      <nav
        aria-label="Divisions navigation"
        className="hidden lg:flex absolute lg:left-24 xl:left-28 top-[44%] -translate-y-1/2 z-20 flex-col gap-7 font-secondary text-xs xl:text-[13px] tracking-[0.2em] uppercase font-bold"
      >
        {HERO_SLIDES.map((slide, sIdx) => {
          const isCurrent = sIdx === currentIndex;
          return (
            <button
              key={slide.id}
              onClick={() => goToSlide(sIdx, sIdx > currentIndex ? 1 : -1)}
              disabled={isTransitioning}
              aria-current={isCurrent ? "true" : undefined}
              className={`relative text-left transition-all duration-300 pb-1.5 w-fit cursor-pointer select-none group ${isCurrent
                  ? "text-[#0f172a] font-black"
                  : "text-[#64748b] hover:text-[#0f172a] font-bold"
                }`}
            >
              <span className="block transition-transform duration-200 group-hover:translate-x-0.5">
                {slide.divisionName}
              </span>
              {isCurrent && (
                <span
                  className="absolute bottom-0 left-0 w-full h-[3px] bg-[#1d4ed8] rounded-full shadow-sm"
                />
              )}
            </button>
          );
        })}

        {/* Contact Link */}
        <Link
          href="#contact"
          className="relative text-left text-[#64748b] hover:text-[#0f172a] transition-all font-bold tracking-[0.2em] pb-1.5 w-fit select-none group"
        >
          <span className="block transition-transform duration-200 group-hover:translate-x-0.5">
            CONTACT US
          </span>
        </Link>
      </nav>

      {/* ─────────────────────────────────────────────────────────────
          4. MAIN CENTRAL 3D PRODUCT ROTATING STAGE (Spanning Center)
             - Centered naturally across both white and colored zones
             - Dynamic scale per product to balance visual weight across divisions
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none pt-4 pb-8" style={{ zIndex: 10 }}>
        <div
          ref={productContainerRef}
          className="relative w-[86vw] max-w-[940px] h-[44vh] sm:h-[50vh] lg:h-[54vh] max-h-[540px] transform-gpu will-change-transform"
          style={{ perspective: 1200, transformStyle: "preserve-3d" }}
        >
          <div
            className={`relative w-full h-full transition-transform duration-500 ease-out ${activeSlide.id === "storage"
                ? "scale-[1.26] sm:scale-[1.36]"
                : activeSlide.id === "enclosure"
                  ? "scale-[1.25] sm:scale-[1.35]"
                  : activeSlide.id === "rental"
                    ? "scale-[1.28] sm:scale-[1.38]"
                    : "scale-100"
              }`}
          >
            <Image
              src={activeProductImage}
              alt={activeProductName}
              fill
              priority
              sizes="(max-width: 768px) 95vw, (max-width: 1200px) 85vw, 1100px"
              className="object-contain object-center drop-shadow-[0_24px_38px_rgba(0,0,0,0.28)]"
            />
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. BOTTOM-LEFT TITLE & DESCRIPTION
             - Positioned completely on the pure white side
             - Guaranteed generous white margin with no clipping
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute bottom-10 sm:bottom-14 lg:bottom-16 left-8 sm:left-14 lg:left-24 z-20 max-w-[360px] sm:max-w-md pointer-events-auto">
        <h1
          ref={titleRef}
          className="font-secondary text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#0a0a0a] leading-none select-none drop-shadow-sm"
        >
          {activeSlide.title}
        </h1>

        <p
          ref={descRef}
          className="font-secondary text-xs sm:text-sm text-gray-500 font-medium max-w-xs sm:max-w-sm mt-3 leading-relaxed select-none"
        >
          {activeSlide.description}
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          6. BOTTOM-RIGHT 3 OTHER DIVISIONS (Dynamic Floating Items)
             - Displays the other 3 divisions with clean floating product & label
             - Clicking any item triggers dynamic transition to that division
          ───────────────────────────────────────────────────────────── */}
      <div
        ref={thumbnailsRef}
        className="absolute bottom-10 sm:bottom-14 lg:bottom-16 right-8 sm:right-14 lg:right-24 z-20 flex items-end gap-5 sm:gap-8 pointer-events-auto"
      >
        {HERO_SLIDES.map((otherSlide, sIdx) => {
          if (sIdx === currentIndex) return null; // Show only the other 3 sections
          return (
            <button
              key={otherSlide.id}
              onClick={() => goToSlide(sIdx, sIdx > currentIndex ? 1 : -1)}
              disabled={isTransitioning}
              aria-label={`Switch to ${otherSlide.divisionName} division`}
              className="flex flex-col items-center p-1.5 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group"
            >
              <div className="relative w-20 h-14 sm:w-28 sm:h-18">
                <Image
                  src={otherSlide.mainProduct.image}
                  alt={otherSlide.mainProduct.name}
                  fill
                  sizes="140px"
                  className="object-contain object-center drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="font-secondary text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] mt-2 text-center truncate max-w-[120px] opacity-90 group-hover:opacity-100">
                {otherSlide.divisionName}
              </span>
            </button>
          );
        })}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          7. CHEVRON NAVIGATION ARROWS (Left & Right Edges)
             - Positioned at outer borders to completely avoid colliding with sidebar
          ───────────────────────────────────────────────────────────── */}
      {/* Left Arrow Button */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        aria-label="Previous division slide"
        className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-gray-500 hover:text-black hover:scale-110 active:scale-95 transition-all cursor-pointer rounded-full hover:bg-black/5"
      >
        <ChevronLeft size={32} strokeWidth={2.5} />
      </button>

      {/* Right Arrow Button */}
      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        aria-label="Next division slide"
        className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-white/80 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer rounded-full hover:bg-white/10"
      >
        <ChevronRight size={32} strokeWidth={2.5} />
      </button>

      {/* Mobile Horizontal Division Bar */}
      <div className="lg:hidden absolute bottom-2 inset-x-0 z-20 flex items-center justify-center gap-2 px-4 pointer-events-auto">
        {HERO_SLIDES.map((slide, sIdx) => {
          const isCurrent = sIdx === currentIndex;
          return (
            <button
              key={slide.id}
              onClick={() => goToSlide(sIdx, sIdx > currentIndex ? 1 : -1)}
              disabled={isTransitioning}
              aria-label={`Go to ${slide.divisionName}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${isCurrent ? "w-8" : "w-2.5 opacity-40"
                }`}
              style={{ backgroundColor: isCurrent ? slide.themeColor : "#94a3b8" }}
            />
          );
        })}
      </div>
    </section>
  );
}
