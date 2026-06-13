import Link from "next/link";
import Image from "next/image";
import ListingSlider from "@/components/ListingSlider";
import {
  listings,
  withPhotos,
  sections,
  sectionCount,
  sectionPeek,
} from "@/lib/listings";
import { site, villaRenders } from "@/lib/site";

const LOCATIONS = [
  "Gadong", "Kiulap", "Menglait", "Jerudong", "Mentiri", "Subok",
  "Beribi", "Tutong", "Bandar Seri Begawan", "Serasa", "Berakas", "Sungai Tilong",
];

export default function Home() {
  const rail = withPhotos().filter((l) => l.price).slice(0, 10);
  const ridgeCount = listings.filter(
    (l) => l.category === "ridge-wood" || l.category === "arie-5"
  ).length;

  return (
    <>
      {/* ───────── HERO — light, asymmetric, editorial ───────── */}
      <section className="u-container pt-10 pb-16 md:pt-16 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
        <div className="fade-up">
          <p className="flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.24em] text-clay mb-7">
            <span className="h-px w-8 bg-clay" />
            Brunei · Est. {site.established}
          </p>
          <h1 className="font-display text-[2.9rem] sm:text-6xl lg:text-[4.4rem] leading-[1.02] text-ink">
            Tailored to your{" "}
            <span className="font-display-italic text-clay">housing</span> needs
          </h1>
          <p className="mt-6 text-lg text-ink-soft leading-relaxed max-w-md">
            {site.licensedLine} Browse homes to buy and rent, commercial spaces,
            and our own Ridge Wood Villa development.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/listings?deal=sale"
              className="px-7 py-3.5 rounded-full bg-ink text-porcelain hover:bg-clay transition-colors"
            >
              Browse properties
            </Link>
            <Link
              href="/listings?deal=rent"
              className="px-7 py-3.5 rounded-full border border-ink/20 text-ink hover:border-clay hover:text-clay transition-colors"
            >
              View rentals
            </Link>
          </div>
        </div>

        {/* offset image cluster */}
        <div className="relative h-[26rem] sm:h-[32rem] fade-up">
          <div className="img-zoom absolute top-0 right-0 w-[68%] h-[74%] rounded-[1.5rem] overflow-hidden shadow-[0_30px_70px_-40px_rgba(60,40,20,0.5)]">
            <Image src={villaRenders[0]} alt="Ridge Wood Villa" fill className="object-cover" priority />
          </div>
          <div className="img-zoom absolute bottom-0 left-0 w-[52%] h-[56%] rounded-[1.25rem] overflow-hidden border-4 border-porcelain shadow-[0_24px_60px_-36px_rgba(60,40,20,0.5)]">
            <Image src={villaRenders[1]} alt="Brunei home" fill className="object-cover" />
          </div>
          <div className="absolute top-[42%] left-[6%] bg-clay text-cream rounded-2xl px-5 py-4 shadow-lg">
            <p className="font-display text-2xl leading-none">{listings.length}</p>
            <p className="text-[0.62rem] uppercase tracking-[0.18em] mt-1">
              properties listed
            </p>
          </div>
        </div>
      </section>

      {/* ───────── marquee of locations ───────── */}
      <section className="border-y border-line py-3.5 overflow-hidden bg-butter/60">
        <div className="marquee-track text-ink-soft">
          {[...LOCATIONS, ...LOCATIONS].map((loc, i) => (
            <span key={i} className="mx-6 font-display text-lg">
              {loc}
              <span className="ml-12 text-clay">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* ───────── RIDGE WOOD VILLA — featured development ───────── */}
      <section className="u-container py-20 md:py-24">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-clay mb-4">
              Our sole-agency development
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-ink leading-[1.05]">
              Ridge Wood Villa
            </h2>
            <p className="mt-2 font-display-italic text-xl text-olive">
              Kampung Panchor Dulit, Pekan Tutong
            </p>
            <p className="mt-6 text-ink-soft leading-relaxed max-w-md">
              A collection of double-storey detached homes — six layouts, each with
              four bedrooms and generous built-up space. Priced from BND 310K to
              BND 450K, with Phase 1 approaching completion.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
              {[
                ["6", "Layouts"],
                ["4", "Bedrooms"],
                ["BND310K+", "From"],
              ].map(([v, k]) => (
                <div key={k}>
                  <p className="font-display text-2xl text-ink">{v}</p>
                  <p className="text-[0.68rem] uppercase tracking-[0.14em] text-ink-soft">
                    {k}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/listings?cat=ridge-wood"
              className="inline-block mt-8 text-clay border-b-2 border-clay/40 pb-1 hover:border-clay transition-colors"
            >
              Explore all {ridgeCount} units →
            </Link>
          </div>

          {/* render mosaic */}
          <div className="grid grid-cols-2 gap-4">
            <div className="img-zoom relative col-span-2 aspect-[16/9] rounded-[1.25rem] overflow-hidden">
              <Image src={villaRenders[0]} alt="Ridge Wood Villa exterior" fill className="object-cover" sizes="60vw" />
            </div>
            <div className="img-zoom relative aspect-[4/3] rounded-[1.25rem] overflow-hidden">
              <Image src={villaRenders[2]} alt="Villa type" fill className="object-cover" sizes="30vw" />
            </div>
            <div className="img-zoom relative aspect-[4/3] rounded-[1.25rem] overflow-hidden">
              <Image src={villaRenders[5]} alt="Villa type" fill className="object-cover" sizes="30vw" />
            </div>
          </div>
        </div>
      </section>

      {/* ───────── BROWSE — image bento ───────── */}
      <section className="u-container py-20 md:py-24">
        <div className="flex items-end justify-between mb-9">
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-clay mb-3">
              Find your space
            </p>
            <h2 className="font-display text-4xl text-ink">Browse by category</h2>
          </div>
          <Link href="/listings" className="hidden sm:inline-block text-ink-soft hover:text-clay border-b border-ink/20 pb-1">
            All listings →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[14rem]">
          {sections.map((s, i) => {
            // First tile spans larger for a bento rhythm
            const big = i === 0;
            return (
              <Link
                key={s.label}
                href={s.href}
                className={`img-zoom group relative rounded-[1.25rem] overflow-hidden ${
                  big ? "col-span-2 row-span-2" : "col-span-2 md:col-span-1"
                }`}
              >
                <Image
                  src={sectionPeek(s)}
                  alt={s.label}
                  fill
                  sizes={big ? "(max-width:768px) 100vw, 50vw" : "(max-width:768px) 100vw, 25vw"}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-ink/5" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-display text-porcelain leading-none ${big ? "text-4xl" : "text-2xl"}`}>
                      {s.label}
                    </h3>
                    <span className="font-display text-porcelain/70 text-lg">
                      {sectionCount(s)}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-porcelain/70">{s.sub}</p>
                </div>
                <span className="absolute top-4 left-5 font-display text-sm text-porcelain/60">
                  0{i + 1}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ───────── RECENTLY LISTED — slider ───────── */}
      <section className="py-20 md:py-24">
        <ListingSlider listings={rail} total={listings.length} />
      </section>

      {/* ───────── COMMITMENT ───────── */}
      <section className="u-container pb-8">
        <div className="rounded-[2rem] overflow-hidden border border-line grid md:grid-cols-2">
          <div className="img-zoom relative min-h-[20rem]">
            <Image
              src={villaRenders[4]}
              alt="A Ridge Wood Villa home"
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
            />
          </div>
          <div className="bg-butter p-10 md:p-14">
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-clay mb-4">
              Our commitment
            </p>
            <p className="font-display text-3xl md:text-[2.3rem] leading-[1.12] text-ink">
              {site.dreamLine}.
            </p>
            <p className="mt-5 text-ink-soft leading-relaxed">
              {site.commitment} An independent agency since {site.established}, we
              make every sale, purchase and lease as seamless as possible.
            </p>
            <ul className="mt-7 space-y-3.5">
              {[
                ["Licensed", "BoVEA · EA004"],
                ["Member", "BIG · A008"],
                ["Based in", "Gadong, Bandar Seri Begawan"],
              ].map(([k, v]) => (
                <li key={k} className="flex justify-between border-b border-line pb-3.5 last:border-0">
                  <span className="text-[0.72rem] uppercase tracking-[0.16em] text-ink-soft pt-1">
                    {k}
                  </span>
                  <span className="font-display text-lg text-ink text-right">{v}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="inline-block mt-7 text-clay border-b-2 border-clay/40 pb-1 hover:border-clay"
            >
              About Excel View →
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── VISIT / CONTACT ───────── */}
      <section className="u-container py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-display text-4xl md:text-5xl text-ink leading-tight">
            Come say hello
          </h2>
          <p className="mt-5 text-ink-soft leading-relaxed max-w-sm">
            Visit our office in Gadong, or reach us any time on WhatsApp — we would
            love to hear what you are looking for.
          </p>
          <div className="mt-8 space-y-2">
            {site.phones.map((p) => (
              <a
                key={p}
                href={`https://wa.me/${p.replace(/\D/g, "")}`}
                className="block font-display text-2xl text-ink hover:text-clay"
              >
                {p}
              </a>
            ))}
            <a href={`mailto:${site.emails[0]}`} className="block text-ink-soft hover:text-clay pt-1">
              {site.emails[0]}
            </a>
          </div>
        </div>
        <div className="relative rounded-[1.5rem] overflow-hidden min-h-[22rem] flex">
          <Image
            src="/listings/2024/03/exterior-1.png"
            alt="Excel View Realty — Brunei"
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/10" />
          <div className="relative mt-auto p-9 text-cream">
            <p className="text-[0.72rem] uppercase tracking-[0.2em] text-cream/70 mb-3">
              Visit the office
            </p>
            <p className="font-display text-xl leading-relaxed max-w-sm">{site.address}</p>
            <div className="mt-6 flex gap-3">
              <a
                href={`https://wa.me/${site.whatsapp}`}
                className="px-6 py-3 rounded-full bg-cream text-ink hover:bg-clay hover:text-cream transition-colors"
              >
                WhatsApp us
              </a>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full border border-cream/40 hover:bg-cream/15 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
