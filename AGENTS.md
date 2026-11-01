<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Four Lines Industries - Project Rules & Guidelines

## 1. Project Overview & Brand Identity
- **Company**: Four Lines Industries LLC (UAE)
- **Industry**: Heavy industrial engineering, manufacturing, custom storage tanks, offshore containers, and trailers.
- **Design Aesthetic**: "Cinematic Industrial". The website must feel extremely premium, high-tech, and robust (Apple-like product quality with industrial weight).
- **Core Colors**: Deep space darks (`bg-black`, `bg-[#030b17]`, `bg-[#07162b]`), stark whites, electric industrial blues (`#1d4ed8`, `#3b82f6`), and glowing accent greens (`#22c55e`).
- **Typography Tokens**:
  - `font-primary` (Syncopate): Massive uppercase tech-inspired display headings.
  - `font-secondary` (Montserrat): Readable, geometric subheadings and section labels.
  - `font-tertiary` (Inter): Body copy, descriptions, and small UI metadata.
  - `font-handel` (Handel Gothic): Local font for the signature "FOUR LINES" watermark.

## 2. Tech Stack & Dependencies
- **Framework**: Next.js 16.3 (App Router with Turbopack).
- **React**: React 19.
- **Language**: TypeScript 5 (Strict mode).
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss` + `@theme` in `src/app/globals.css`).
- **Animation**: `gsap` (Core & ScrollTrigger for scrubbing/pinning).
- **Smooth Scrolling**: `lenis` (v1.3+, imported as `import Lenis from "lenis"`).
- **Icons**: `lucide-react`.

## 3. Commands
- **Dev Server**: `npm run dev` (starts Next.js Turbopack dev server)
- **Production Build**: `npm run build`
- **Lint**: `npm run lint` (ESLint 9 + Next.js core web vitals + TypeScript)
- **Type Check**: `npx tsc --noEmit`

## 4. Project Architecture & Map
```
src/
├── app/
│   ├── globals.css      # Tailwind v4 @import, @theme tokens, @font-face HandelGothic, Lenis base rules
│   ├── layout.tsx       # Root layout: Syncopate/Montserrat/Inter fonts, metadata, LenisProvider & Navbar
│   └── page.tsx         # Home page assembling HeroSection, AboutSection, DivisionsSection, Footer
├── components/
│   ├── Navbar.tsx       # Sticky glassmorphic navbar with desktop/mobile navigation
│   ├── HeroSection.tsx  # Dynamic slideshow with GSAP transitions and industrial hero background
│   ├── AboutSection.tsx # Blueprint/heritage section with ScrollTrigger animations
│   ├── DivisionsSection.tsx # Interactive industrial divisions (Mobility, Storage & Process, etc.)
│   ├── Footer.tsx       # Industrial footer with contact info, division links, and certifications
│   └── LenisProvider.tsx# Client wrapper initializing smooth scroll via Lenis raf loop
public/
├── fonts/               # HandelGo.ttf, HandelGothic Regular.ttf (watermark font)
└── images/              # Industrial product photography, blueprints, and backgrounds
```

## 5. Engineering Conventions & Code Rules
- **Client vs Server Components**: Mark any component using hooks (`useState`, `useEffect`, `useRef`) or GSAP with `"use client";`. Keep page containers lightweight.
- **Tailwind CSS v4 Configuration**:
  - Configuration is in `src/app/globals.css` using the `@theme` directive.
  - Do NOT create a `tailwind.config.js`.
- **GSAP Animation Best Practices**:
  - Filter out `null` references before animating: `[refA.current, refB.current].filter(Boolean)`.
  - Always register ScrollTrigger before use: `gsap.registerPlugin(ScrollTrigger)`.
  - Use `gsap.context()` inside `useEffect` and invoke `ctx.revert()` in the cleanup return, or cleanly clear intervals/timeouts to avoid Next.js Fast Refresh leaks.
- **Images & Media**:
  - Store all imagery in `public/images/`.
  - When using `<Image fill ... />`, always supply the `sizes` prop (e.g., `sizes="(max-width: 768px) 100vw, 50vw"`).
  - Use `priority` on above-the-fold images (e.g. Hero backgrounds).
- **Mobile Responsiveness**:
  - Add `min-w-0` to flex and grid children to guard against layout blowout.
  - Display headings must use `break-words` and scale smoothly (`text-3xl sm:text-5xl lg:text-7xl`).
- **JSX Entities**: Always escape apostrophes and quotes (`&apos;`, `&ldquo;`, etc.).

## 6. Boundaries & Prohibitions
- Never import `@studio-freight/lenis` (use `lenis`).
- Never introduce generic UI component libraries (shadcn, MUI) that clash with the bespoke "Cinematic Industrial" aesthetic.
- Never remove the Next.js agent rules comment block at the top of this file.
- Always verify changes with `npx tsc --noEmit` and `npm run lint`.

## 7. Canonical Component Pattern
```tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function IndustrialCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const targets = [titleRef.current].filter(Boolean);
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative p-6 bg-[#030b17]/90 border border-white/10 backdrop-blur-md rounded-none min-w-0">
      <h3 ref={titleRef} className="font-primary text-xl lg:text-2xl font-bold uppercase tracking-wider text-white break-words">
        Precision Engineering
      </h3>
    </div>
  );
}
```
