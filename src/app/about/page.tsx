import Link from "next/link";
import Image from "next/image";
import { site, villaRenders } from "@/lib/site";

export const metadata = { title: "About — Excel View Realty" };

export default function AboutPage() {
  return (
    <div className="pt-4">
      {/* intro */}
      <section className="u-container py-14 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-clay mb-3">
            About us
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight">
            An independent agency, established in 2014
          </h1>
          <p className="mt-6 text-ink-soft leading-relaxed">
            Excel View Realty is an independent real estate agency based in Brunei
            Darussalam, specialising in residential and commercial property. We are
            committed to excellence and constantly aim to deliver the highest level
            of customer satisfaction.
          </p>
          <p className="mt-4 text-ink-soft leading-relaxed">
            Whether you are buying, selling or leasing, our role is to help you find
            a property aligned with your needs and budget — and to make the whole
            process as seamless as possible. We also welcome land development
            proposals from developers.
          </p>
        </div>
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
          <Image
            src={villaRenders[1] ?? villaRenders[0]}
            alt="Brunei property"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* credentials */}
      <section className="bg-cream border-y border-line">
        <div className="u-container py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            ["Established", site.established, "Serving Brunei for over a decade."],
            ["Licensed", "BoVEA / EA004", site.license],
            ["Member", "BIG · A008", site.membership],
          ].map(([k, v, d]) => (
            <div key={k} className="rounded-2xl border border-line p-7">
              <p className="text-xs uppercase tracking-[0.2em] text-clay">{k}</p>
              <p className="font-display text-2xl text-ink mt-2">{v}</p>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* services */}
      <section className="u-container py-16">
        <h2 className="font-display text-3xl text-ink mb-10">What we do</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            ["Property Sales", "Helping clients buy and sell homes across Brunei, from terraces to detached villas."],
            ["Rentals", "Tenant placement and property leasing for apartments, houses and commercial units."],
            ["Developer Relations", "Accepting land development proposals and marketing new-build developments."],
          ].map(([t, d]) => (
            <div key={t}>
              <div className="h-px w-12 bg-clay mb-5" />
              <h3 className="font-display text-xl text-ink">{t}</h3>
              <p className="mt-2 text-ink-soft leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* cta */}
      <section className="u-container pb-8">
        <div className="rounded-3xl bg-clay-deep text-cream p-12 text-center">
          <h2 className="font-display text-3xl md:text-4xl">
            Let us help you find your dream home
          </h2>
          <p className="mt-3 text-cream/75 max-w-xl mx-auto">
            Browse our current listings or get in touch — we would love to hear what
            you are looking for.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <Link
              href="/listings"
              className="px-7 py-3 rounded-full bg-cream text-clay-deep hover:bg-clay hover:text-cream transition-colors font-medium"
            >
              Browse properties
            </Link>
            <Link
              href="/contact"
              className="px-7 py-3 rounded-full border border-cream/40 text-cream hover:bg-cream hover:text-clay-deep transition-colors"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
