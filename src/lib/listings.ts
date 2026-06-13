import { listings, type Listing } from "./data";

export { listings };
export type { Listing };

// A real photo (not a floor-plan / brochure scan / logo).
const PLAN_RE = /(binder|_page_|floor|plan|brochure|watermark|available-units|logo|cropped)/i;
const isPhoto = (i: string) => !PLAN_RE.test(i);

// Build category photo pools from every real photo across the catalogue, so a
// listing that has no photo of its own still shows a relevant property image.
function buildPool(pred: (l: Listing) => boolean): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const l of listings) {
    if (!pred(l)) continue;
    const p = l.images.find(isPhoto);
    if (p && !seen.has(p)) {
      seen.add(p);
      out.push(p);
    }
  }
  return out;
}

const RES_POOL = buildPool((l) => l.category !== "commercial" && l.category !== "land-for-sale");
const COM_POOL = buildPool((l) => l.category === "commercial");
const LAND_POOL = buildPool((l) => l.category === "land-for-sale");

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function poolFor(l: Listing): string[] {
  if (l.category === "commercial" && COM_POOL.length) return COM_POOL;
  if (l.category === "land-for-sale" && LAND_POOL.length) return LAND_POOL;
  return RES_POOL;
}

// A guaranteed, category-appropriate cover for listings with no photo of their own.
export function fallbackCover(l: Listing): string {
  const pool = poolFor(l);
  return pool[hash(l.slug) % pool.length];
}

// Card cover — always a real photo (own if available, else a category fallback).
export function coverImage(l: Listing): string {
  return l.images.find(isPhoto) ?? fallbackCover(l);
}

// Images for the detail gallery — the listing's own (incl. floor plans), else fallback.
export function displayImages(l: Listing): string[] {
  return l.images.length ? l.images : [fallbackCover(l)];
}

export function hasGallery(l: Listing): boolean {
  return l.images.length > 0;
}

export function bySlug(slug: string): Listing | undefined {
  return listings.find((l) => l.slug === slug);
}

export function dealLabel(l: Listing): string {
  return l.deal === "rent" ? "For Rent" : "For Sale";
}

// Listings worth featuring: have a real photo of their own + a price.
export function featured(limit = 6): Listing[] {
  return listings
    .filter((l) => l.images.some(isPhoto) && l.price)
    .slice(0, limit);
}

export function relatedTo(l: Listing, limit = 3): Listing[] {
  return listings
    .filter((x) => x.slug !== l.slug && x.category === l.category)
    .slice(0, limit);
}

export type Filters = {
  deal?: string;
  cat?: string;
  q?: string;
  beds?: string;
};

export function filterListings(f: Filters): Listing[] {
  return listings.filter((l) => {
    if (f.deal && l.deal !== f.deal) return false;
    if (f.cat && l.category !== f.cat) return false;
    if (f.beds && (l.beds ?? 0) < Number(f.beds)) return false;
    if (f.q) {
      const hay = `${l.title} ${l.location} ${l.locationTag} ${l.categoryLabel} ${l.code}`.toLowerCase();
      if (!hay.includes(f.q.toLowerCase())) return false;
    }
    return true;
  });
}

// Browse index that mirrors the real site's sections
export type Section = {
  label: string;
  sub: string;
  href: string;
  match: (l: Listing) => boolean;
};

export const sections: Section[] = [
  { label: "For Sale", sub: "Homes & apartments to own", href: "/listings?deal=sale", match: (l) => l.deal === "sale" && l.category !== "commercial" },
  { label: "For Rent", sub: "Move-in ready rentals", href: "/listings?deal=rent", match: (l) => l.deal === "rent" },
  { label: "Commercial", sub: "Shops, shophouses & offices", href: "/listings?cat=commercial", match: (l) => l.category === "commercial" },
  { label: "Sole Agency", sub: "Ridge Wood Villa & Arie 5", href: "/listings?cat=ridge-wood", match: (l) => l.category === "ridge-wood" || l.category === "arie-5" },
  { label: "Land", sub: "Plots & development land", href: "/listings?cat=land-for-sale", match: (l) => l.category === "land-for-sale" },
  { label: "Foreign", sub: "Properties beyond Brunei", href: "/listings?cat=foreign-properties", match: (l) => l.category === "foreign-properties" },
];

export function sectionCount(s: Section): number {
  return listings.filter(s.match).length;
}

// A representative photo for a section — prefers a listing with its own photo.
export function sectionPeek(s: Section): string {
  const own = listings.find((x) => s.match(x) && x.images.some(isPhoto));
  const any = own ?? listings.find(s.match);
  return any ? coverImage(any) : RES_POOL[0];
}

// Listings that have a real photo of their own (not just floor plans).
export function withPhotos(limit?: number): Listing[] {
  const out = listings.filter((l) => l.images.some(isPhoto));
  return limit ? out.slice(0, limit) : out;
}

export const categories = [
  { key: "for-sale", label: "For Sale" },
  { key: "to-rent", label: "For Rent" },
  { key: "commercial", label: "Commercial" },
  { key: "land-for-sale", label: "Land" },
  { key: "ridge-wood", label: "Ridge Wood Villa" },
  { key: "arie-5", label: "Arie 5" },
  { key: "joyful-villa", label: "Joyful Villa" },
  { key: "foreign-properties", label: "Foreign" },
];
