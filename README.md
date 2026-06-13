# Excel View Realty — Website Rebuild

A boutique real estate website for **Excel View Realty** (Bandar Seri Begawan, Brunei),
rebuilt from the original [excelviewbrunei.com](https://excelviewbrunei.com) data.

**Warm editorial** design — built to mirror the real site's information architecture
rather than a generic template. A light, asymmetric hero (offset render cluster, no
dark-photo-overlay search box), a location marquee, a **Ridge Wood Villa development
spotlight** (the agency's real flagship), a big-type **browse index** that mirrors the
site's sections with live counts, a horizontal **listing rail**, and the agency's own
copy ("We help you find your dream home", "committed to excellence…").

Palette: porcelain `#faf6ee` + **terracotta** `#c0572f` lead + **olive** `#4c5b41`
support, Fraunces serif display / Inter body.

## Stack
- **Next.js 16** (App Router, React 19) — listing detail pages pre-rendered via SSG
- **Tailwind CSS v4** (`@tailwindcss/postcss`, theme tokens in `globals.css`)
- TypeScript

## Data
All content comes from the real site, scraped earlier into `../listings.json`:
- **619 property listings** with parsed price, deal type, beds/baths, location,
  land/built-up size, item code, status, description and gallery images.
- **2,403 gallery images** copied into `public/listings/` (year/month folders).
- Business facts (address, phones, licence, socials) in `src/lib/site.ts`.

Regenerate the data + assets from the project root:
```bash
python3 build_data.py        # listings.json  (re-scrapes the live site)
python3 prepare_assets.py    # copies images + writes src/lib/data.ts
```

## Pages
| Route | Description |
|-------|-------------|
| `/` | Editorial hero, marquee, Ridge Wood Villa spotlight, browse index, listing rail, commitment, visit |
| `/listings` | Filterable grid (deal / type / beds / text search via URL params) |
| `/listings/[slug]` | Gallery, specs, description, sticky WhatsApp enquiry, related |
| `/about` | Story, credentials, services |
| `/contact` | Phones, email, address, WhatsApp enquiry form |

## Develop
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

## Notes
- `next.config.ts` sets `images.unoptimized` (static-export friendly; the gallery
  scans are already web-sized).
- Many source photos carry Excel View Realty's own watermark — retained as it is the
  brand's own imagery. Hero/feature images use the cleaner Ridge Wood Villa renders
  (`src/lib/site.ts → curatedHeroes`).
- The contact/enquiry forms deep-link to WhatsApp (`wa.me/6737142764`); wire to a real
  backend or form service before production.
