"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Truck, Database, Package, Settings, Map } from "lucide-react";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftPaneRef = useRef<HTMLDivElement>(null);
  const rightPaneRef = useRef<HTMLDivElement>(null);
  const bottomPaneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Top section animation
      gsap.fromTo(
        leftPaneRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        rightPaneRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Bottom section stagger
      gsap.fromTo(
        ".stagger-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bottomPaneRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden flex flex-col font-tertiary z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.7)] bg-gradient-to-br from-[#0c4078] via-[#062244] to-[#020b16]">

      {/* TOP BLOCK */}
      <div className="flex flex-col lg:flex-row w-full lg:min-h-[600px] xl:min-h-[700px] relative">

        {/* Light floor glow extending leftwards from the image */}
        <div 
          className="absolute bottom-0 left-0 w-[45%] h-[35%] pointer-events-none z-0"
          style={{
            background: 'linear-gradient(to left, rgba(170, 195, 225, 0.95) 0%, rgba(170, 195, 225, 0) 100%)',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
          }}
        />

        {/* Left Dark Pane */}
        <div
          ref={leftPaneRef}
          className="w-full lg:w-[32%] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative z-20 bg-transparent"
        >
          <div className="space-y-6 lg:space-y-10 max-w-md mx-auto lg:mx-0">
            <div>
              <p className="font-secondary text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-200 uppercase leading-relaxed mb-4">
                Engineering Industrial <br /> Solutions
              </p>
              <div className="w-16 h-[2px] bg-blue-400" />
            </div>

            <h2 className="font-primary text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter uppercase drop-shadow-lg">
              About
            </h2>

            <p className="font-tertiary text-gray-200 text-sm md:text-[15px] leading-relaxed font-light">
              At Four Lines Industries, we don't just build storage and transport solutions—we build trust, reliability, and innovation. Every tank, trailer, and modular skid we create is a testament to our skill, dedication, and teamwork.
            </p>

            <button className="flex items-center gap-4 font-tertiary text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase hover:text-blue-300 transition-colors group mt-6">
              <div className="w-[2px] h-8 bg-blue-400" />
              Our Divisions
              <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Light/Image Pane */}
        <div
          ref={rightPaneRef}
          className="w-full lg:w-[68%] bg-[#e3e9ef] relative min-h-[400px] sm:min-h-[500px] lg:min-h-full overflow-visible pt-24"
        >
          {/* Huge background text */}
          <div className="absolute top-10 lg:top-30 left-0 right-0 z-0 select-none flex justify-center w-full">
            <h1
              className="font-handel text-[#062142] leading-none tracking-tight whitespace-nowrap w-full text-center"
              style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
            >
              FOUR LINES
            </h1>
          </div>

          {/* The provided image — bleeds left into the dark pane */}
          <div className="absolute bottom-0 left-[-12%] w-[110%] h-[72%] z-10 drop-shadow-2xl">
            <Image
              src="/images/about_background.png"
              alt="Four Lines Products"
              fill
              className="object-contain object-bottom"
              sizes="(max-width: 1024px) 100vw, 100vw"
              priority
            />
          </div>
        </div>
      </div>

      {/* BOTTOM BLOCK */}
      <div
        ref={bottomPaneRef}
        className="w-full relative overflow-hidden bg-transparent text-white px-8 py-16 lg:px-16 lg:py-20"
      >
        {/* Background Image constrained to right side to reduce size */}
        <div className="absolute right-0 bottom-60 w-[85%] lg:w-[55%] h-[75%] lg:h-[85%] z-0">
          <Image
            src="/images/background_2.png"
            alt="Blueprint Background"
            fill
            className="object-contain object-right-bottom opacity-50 mix-blend-screen"
            sizes="(max-width: 1024px) 85vw, 55vw"
          />
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col justify-between min-h-[400px]">

          {/* Top Section of Bottom Block */}
          <div className="max-w-xl space-y-6 stagger-item mb-20 lg:mb-32">
            <h2 className="font-secondary text-2xl md:text-3xl lg:text-[32px] font-bold uppercase leading-[1.2] tracking-wide">
              Engineering <br />
              A Stronger Tomorrow
            </h2>
            <p className="font-tertiary text-gray-300 text-sm md:text-[15px] leading-relaxed font-light max-w-lg">
              We proudly serve industries like Oil & Gas, Petrochemical, Military, Food & Beverage, Dairy, Construction, Transport & Logistics, and more, delivering excellence across the UAE, Saudi Arabia, Oman, Africa, and Asia.
            </p>
          </div>

          {/* Bottom Section: 4 Divisions + Footer Text side by side */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between border-t border-white/20 pt-8 gap-12">

            {/* 4 Divisions (Left) */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6 w-full pr-0 lg:pr-12">

              <div className="flex flex-col items-start text-left space-y-4 stagger-item relative group px-2">
                <div className="text-white">
                  <Truck size={32} strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-secondary text-[10px] md:text-[11px] font-bold tracking-wider uppercase">Mobility</h4>
                  <p className="font-tertiary text-[10px] text-gray-400 font-light leading-relaxed">
                    Navigate performance.<br />Drive reliability.
                  </p>
                </div>
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-16 bg-white/20" />
              </div>

              <div className="flex flex-col items-start text-left space-y-4 stagger-item relative group px-2">
                <div className="text-white">
                  <Database size={32} strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-secondary text-[10px] md:text-[11px] font-bold tracking-wider uppercase">Storage & Process</h4>
                  <p className="font-tertiary text-[10px] text-gray-400 font-light leading-relaxed">
                    Ensure with<br />confidence.
                  </p>
                </div>
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-16 bg-white/20" />
              </div>

              <div className="flex flex-col items-start text-left space-y-4 stagger-item relative group px-2">
                <div className="text-white">
                  <Package size={32} strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-secondary text-[10px] md:text-[11px] font-bold tracking-wider uppercase">Enclosure & Systems</h4>
                  <p className="font-tertiary text-[10px] text-gray-400 font-light leading-relaxed">
                    We shed what<br />powers progress.
                  </p>
                </div>
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-16 bg-white/20" />
              </div>

              <div className="flex flex-col items-start text-left space-y-4 stagger-item relative group px-2">
                <div className="text-white">
                  <Settings size={32} strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-secondary text-[10px] md:text-[11px] font-bold tracking-wider uppercase">Rental & Service</h4>
                  <p className="font-tertiary text-[10px] text-gray-400 font-light leading-relaxed">
                    On demand.<br />Always, all ways.
                  </p>
                </div>
              </div>

            </div>

            {/* Footer Text (Right) */}
            <div className="lg:w-[350px] shrink-0 flex flex-col space-y-6 stagger-item pt-4 lg:pt-0">
              <p className="font-tertiary text-xs md:text-[13px] text-gray-300 font-light leading-relaxed">
                Our success is powered by our team—driving quality, performance, innovation and continuous growth.
              </p>
              <div className="flex items-center gap-4 text-[9px] md:text-[10px] font-secondary font-bold tracking-[0.2em] uppercase text-white">
                <div className="w-12 h-[2px] bg-white" />
                Trusted Across Borders
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
