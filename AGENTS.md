<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Four Lines Industries - Project Rules & Guidelines

## 1. Brand Identity & Design Philosophy
- **Industry**: Heavy industrial engineering, manufacturing, custom storage tanks, offshore containers, and trailers.
- **Design Aesthetic**: "Cinematic Industrial". The website must feel extremely premium, high-tech, and robust (Apple-like product quality).
- **Core Colors**: Deep dark space blues/blacks (e.g. `bg-[#030b17]`), stark whites, electric cyan/blues for accents and glowing effects.
- **Micro-interactions**: High reliance on smooth GSAP animations, 3D CSS transforms, and scroll-driven cinematic transitions.
- **Typography**:
  - `font-primary` (Syncopate): Used for massive, uppercase, tech-inspired display headings.
  - `font-secondary` (Montserrat): Used for readable, geometric subheadings.
  - `font-tertiary` (Inter): Used for all body copy and small UI elements.

## 2. Tech Stack & Key Libraries
- **Framework**: Next.js (App Router) with TypeScript.
- **Styling**: Tailwind CSS.
- **Animation**: `gsap` (Core & ScrollTrigger for pinning/scrubbing), native CSS transitions.
- **Smooth Scrolling**: `@studio-freight/lenis` (globally configured in `LenisProvider.tsx`).
- **Icons**: `lucide-react`.

## 3. UI/UX Rules
- **Custom UI First**: Do not rely on generic UI libraries (like shadcn or material-ui) for major structural elements. Hand-craft layouts using Tailwind to maintain the unique aesthetic.
- **Mobile Responsiveness**: 
  - Always guard against grid blowouts on mobile by adding `min-w-0` to grid children.
  - Ensure massive display headings use `break-words` and scale down significantly on `< sm` breakpoints.
- **Glassmorphism**: Use `backdrop-blur-md` with highly transparent backgrounds (e.g., `bg-[#030b17]/95`) for sticky navbars, mobile menus, and overlapping UI panels.
- **Scroll Mechanics**: Use GSAP `ScrollTrigger` with `pin: true` and `scrub: true` to create cinematic "reveal" moments (e.g., the Blueprint-to-Reality transition). Rely on Lenis to ensure the scroll momentum feels heavy and smooth.

## 4. Engineering Conventions
- **Images/Media**: Place all assets in `public/images/`. Next.js `<Image>` components using `fill` MUST include the `sizes` prop to prevent unoptimized image loading warnings.
- **GSAP & React Refs**: When using GSAP to animate React `useRef` elements, always filter out `null` references before animating (e.g., `targets.filter(Boolean)`), especially inside timeouts or callbacks. This prevents unmount race condition crashes during Next.js Fast Refresh or rapid user navigation.
