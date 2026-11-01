# Four Lines Industries - Claude Guidelines

All project guidelines, tech stack specifications, commands, and rules are maintained in [AGENTS.md](file:///c:/Users/amaan/OneDrive/Desktop/fourline/AGENTS.md).

## Quick Reference
- **Stack**: Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS v4 (`@theme`), GSAP, `lenis`.
- **Commands**:
  - Dev: `npm run dev`
  - Build: `npm run build`
  - Lint: `npm run lint`
  - Type Check: `npx tsc --noEmit`
- **Key Rules**:
  - Always add `"use client";` to interactive/animated components.
  - Filter `null` refs before animating with GSAP: `targets.filter(Boolean)`.
  - Always include `sizes` prop on Next.js `<Image fill ... />`.
  - Guard flex/grid children against blowout with `min-w-0`.
  - Never import `@studio-freight/lenis`; import `Lenis` from `"lenis"`.
