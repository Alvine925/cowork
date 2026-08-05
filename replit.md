# PresenceHQ – Virtual Office & Business Presence Platform

A premium corporate marketing website for a Business Presence Platform that helps businesses establish a professional presence in any city without renting a traditional office. Targets Kenyan market with locations in Nairobi, Mombasa, Kisumu, Nakuru, and Eldoret.

## Run & Operate

- `pnpm --filter @workspace/presencehq run dev` — run the Next.js dev server (port 20404)
- `pnpm --filter @workspace/presencehq run build` — build static export to `artifacts/presencehq/out/`
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)

## Stack

- **Framework**: Next.js 15 App Router, TypeScript, static export (`output: 'export'`)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`), custom brand tokens in `app/globals.css`
- **Fonts**: Inter (body) + Manrope (headings) via `next/font/google` — configured in `app/layout.tsx`
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: react-hook-form + zod
- **UI primitives**: Radix UI components
- pnpm workspaces, Node.js 24, TypeScript 5.9

## Where things live

- `artifacts/presencehq/app/` — all Next.js App Router pages
- `artifacts/presencehq/components/` — shared layout (Navbar, Footer, FloatingWhatsApp, BackToTop) + home sections + UI components
- `artifacts/presencehq/lib/utils.ts` — `cn()` helper + formatPrice utility
- `artifacts/presencehq/app/globals.css` — brand color tokens (navy, gold, light-gray, dark-gray, success)
- `artifacts/presencehq/next.config.ts` — static export config
- `artifacts/presencehq/out/` — static build output (after `next build`)

## Brand

- **Navy** `#0F2D52` — primary color, nav, headings, buttons
- **Gold** `#C9A227` — accent, CTAs, highlights
- **Light Gray** `#F6F8FA` — section backgrounds
- **Dark Gray** `#2D2D2D` — body text
- **Success** `#0E9F6E` — success states

## Pages (32 total)

- Home, About, Services overview, 10 individual service pages
- Pricing, Locations overview, 5 individual location pages (SEO-optimized)
- Industries, Resources, Contact, Careers, Partners, Testimonials
- Privacy Policy, Terms of Service, Cookie Policy, Refund Policy
- `sitemap.ts`, `robots.ts`, `not-found.tsx`

## Architecture decisions

- **Static export**: `output: 'export'` in next.config.ts — generates a fully static site ideal for marketing/SEO. No server-side features (API routes, server actions) needed.
- **Tailwind v4**: Uses `@tailwindcss/postcss` (not `@tailwindcss/vite`). No `tailwind.config.ts` file — theme defined via `@theme` in globals.css.
- **`'use client'` pattern**: All interactive components (Navbar, FAQ accordion, pricing toggle, animations) use `'use client'`; page shells are server components.
- **`next/image` unoptimized**: Required for static export (`images.unoptimized: true` in next.config.ts).
- **No database**: This is a pure marketing site — no backend or database needed.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Any component using framer-motion MUST have `'use client'` as the first line
- Static export means no server-side API routes or dynamic features at runtime
- After modifying `app/globals.css`, restart the dev workflow for changes to apply
- `pnpm --filter @workspace/presencehq run typecheck` to verify TypeScript — not `build` (needs PORT env)
