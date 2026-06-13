import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import ListingCard from "@/components/ListingCard";
import { listings, bySlug, dealLabel, relatedTo, displayImages } from "@/lib/listings";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const l = bySlug(slug);
  return { title: l ? `${l.title} — Excel View Realty` : "Excel View Realty" };
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const l = bySlug(slug);
  if (!l) notFound();

  const specs = [
    l.beds != null && [`${l.beds}`, "Bedrooms"],
    l.baths != null && [`${l.baths}`, "Bathrooms"],
    l.land && [l.land, "Land size"],
    l.builtup && [l.builtup, "Built-up"],
  ].filter(Boolean) as [string, string][];

  const related = relatedTo(l, 3);
  const waText = encodeURIComponent(
    `Hi Excel View Realty, I'm interested in "${l.title}"${l.code ? ` (${l.code})` : ""}.`
  );

  return (
    <div className="pt-8">
      <div className="u-container">
        <Link href="/listings" className="text-sm text-clay hover:text-clay-deep">
          ← Back to listings
        </Link>
      </div>

      <div className="u-container py-8 grid lg:grid-cols-[1.6fr_1fr] gap-10">
        {/* LEFT */}
        <div>
          <Gallery images={displayImages(l)} title={l.title} />

          <div className="mt-10">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-clay text-cream text-xs">
                {dealLabel(l)}
              </span>
              <span className="px-3 py-1 rounded-full bg-sand text-clay-deep text-xs">
                {l.categoryLabel}
              </span>
              {l.status && (
                <span className="px-3 py-1 rounded-full bg-clay text-cream text-xs">
                  {l.status}
                </span>
              )}
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-ink leading-tight">
              {l.title}
            </h1>
            {l.location && (
              <p className="mt-2 text-ink-soft">
                {l.location}
                {l.locationTag && ` · ${l.locationTag}`}
              </p>
            )}

            {specs.length > 0 && (
              <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {specs.map(([v, k]) => (
                  <div
                    key={k}
                    className="rounded-xl bg-cream border border-line p-4 text-center"
                  >
                    <p className="font-display text-xl text-clay-deep">{v}</p>
                    <p className="text-xs uppercase tracking-[0.15em] text-ink-soft mt-1">
                      {k}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {l.description && (
              <div className="mt-9">
                <h2 className="font-display text-xl text-ink mb-3">
                  About this property
                </h2>
                <p className="text-ink-soft leading-relaxed whitespace-pre-line">
                  {l.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — sticky enquiry */}
        <aside className="lg:sticky lg:top-28 h-fit">
          <div className="rounded-2xl bg-cream border border-line p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-clay">
              {dealLabel(l)} price
            </p>
            <p className="font-display text-3xl text-clay-deep mt-1">
              {l.price || "Price on enquiry"}
            </p>
            {l.code && (
              <p className="mt-2 text-xs text-ink-soft">Item code · {l.code}</p>
            )}

            <div className="mt-6 space-y-2">
              <a
                href={`https://wa.me/${site.whatsapp}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center px-5 py-3 rounded-xl bg-clay text-cream hover:bg-clay-deep transition-colors font-medium"
              >
                Enquire on WhatsApp
              </a>
              <a
                href={`tel:${site.phones[0].replace(/\s/g, "")}`}
                className="block text-center px-5 py-3 rounded-xl border border-clay text-clay hover:bg-clay hover:text-cream transition-colors"
              >
                Call {site.phones[0]}
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-line text-sm text-ink-soft space-y-1">
              <p className="font-medium text-ink">Excel View Realty</p>
              <p>{site.phones.join(" · ")}</p>
              <p>{site.emails[0]}</p>
            </div>
          </div>
        </aside>
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="u-container py-16 border-t border-line mt-8">
          <h2 className="font-display text-3xl text-ink mb-8">
            You might also like
          </h2>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ListingCard key={r.slug} l={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
