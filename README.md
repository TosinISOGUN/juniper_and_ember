# Juniper & Ember

A design concept for a fictional wood-fired American restaurant in Austin, Texas: a neighborhood place for seasonal comfort food, live-oak fire and long dinners. Nine pages: Home, Menu, Order (pickup), Demo checkout, Reservations, Our Story, Gallery, Visit Us and Privacy.

Juniper & Ember is not a real restaurant. The address, phone number, hours, menu and prices are sample content, nothing here books a table or places an order, the forms send nothing, and every page is set to `noindex`.

## Stack

- TanStack Start (React 19, file-based routing, server-rendered), TypeScript strict
- Tailwind CSS v4, CSS-only and scroll-driven motion (transform and opacity only), Phosphor icons
- Zodiak (display, with italic; Fontshare free licence) and Karla (SIL OFL), both self-hosted variable fonts
- Nitro for the production build (it picks the Vercel output on Vercel and a Node server elsewhere)

## Run it

```bash
bun install
bun run dev        # http://localhost:5173
bun run build      # production build
bun run lint
bun run test
```

## Deploying to Vercel

Framework Preset: Nitro (or Other). Leave Output Directory blank and use Node 22.x. No environment variables are needed. Open Graph and canonical URLs use the deployment domain automatically (the Vercel production domain, or `SITE_URL` if you set it).

## Design

Forest ink and cream from the brief, with burnt terracotta kept for the one thing to do next (reserve, order). The colour in the page comes from the photographs. Dark (forest) is the default, with a cream theme behind the header toggle (stored in `localStorage` as `juniper-ember-theme`).

Shape rule: photographs are square-cornered like a magazine page, controls (buttons, chips, steppers) are pills, fields and panels take one small radius.

Every top-level page opens on a full-bleed photograph with a short block of type. Motion is CSS only and kept light: a word-by-word headline, a slow photo settle, scroll-driven reveals, a pinned statement on wide screens ("Everything tastes a little better over fire"), image panels that open on hover, and quick page crossfades through the View Transitions API. With reduced motion everything shows in its finished state.

## What works

- **Menu**: seven categories as a real tablist (arrow keys, Home and End), real text with sample prices, dietary marks only where the written ingredients support them, and a link per category (`/menu?c=wood-fire`).
- **Order**: add, change quantity, remove, running subtotal and an 8.25 percent estimated tax, a desktop panel and a mobile bottom sheet, then a demo checkout. The order lives in memory only; nothing is saved, nothing is sent.
- **Reservations**: party stepper (1 to 8), the next 14 days plus a date picker, and only the times served that day (Sunday splits into brunch and dinner). It validates every field, shows loading and a confirmation, and says plainly that no real reservation was made. `submit` in `reservation-form.tsx` is where a booking provider would plug in.
- **Gallery**: a mosaic of mixed shapes and a lightbox built on a native dialog (Escape, arrow keys, focus returns to the photo you opened).
- Mobile action bar (Menu, Reserve, Order) that appears after the first screen, skip link, visible focus, 44px touch targets.

## Images

Originals live in `assets-source/photos/` (gitignored) and are never served. `bun run images` builds the responsive AVIF and WebP copies in `public/images/` (with one shared warm grade), the typed manifest `src/data/images.generated.ts`, and one Open Graph image per page in `public/og/`. Keep the original file names: the manifest ids (for example `heroTable`) come from them. Sources and licences are in [ASSETS.md](ASSETS.md); to rebuild the originals, download those Pexels ids.

## Content rules

No reviews, ratings, awards, press logos, allergen-safe claims or live availability, and no em or en dashes in any source file (a test enforces it). Concept notes are kept wherever the fiction could be mistaken for a real business. To make the site indexable, set `INDEXABLE` to `true` in `src/data/site.ts`. `public/robots.txt` deliberately allows crawling so link-preview bots (Facebook, LinkedIn, X, WhatsApp) can fetch the share image; the `noindex` meta tag is what keeps search engines out.
