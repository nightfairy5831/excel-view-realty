import { Suspense } from "react";
import FilterBar from "@/components/FilterBar";
import ListingCard from "@/components/ListingCard";
import { filterListings, type Filters } from "@/lib/listings";

export const metadata = { title: "Properties — Excel View Realty" };

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const f: Filters = {
    deal: typeof sp.deal === "string" ? sp.deal : undefined,
    cat: typeof sp.cat === "string" ? sp.cat : undefined,
    beds: typeof sp.beds === "string" ? sp.beds : undefined,
    q: typeof sp.q === "string" ? sp.q : undefined,
  };
  const results = filterListings(f);

  return (
    <div className="u-container pt-10 pb-12">
      <p className="text-xs uppercase tracking-[0.25em] text-clay mb-2">
        Browse the portfolio
      </p>
      <h1 className="font-display text-4xl md:text-5xl text-ink mb-8">
        Properties
      </h1>

      <Suspense fallback={<div className="h-24" />}>
        <FilterBar />
      </Suspense>

      <p className="mt-8 mb-6 text-sm text-ink-soft">
        {results.length} propert{results.length === 1 ? "y" : "ies"} found
      </p>

      {results.length === 0 ? (
        <div className="py-24 text-center text-ink-soft">
          No properties match these filters.
        </div>
      ) : (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((l) => (
            <ListingCard key={l.slug} l={l} />
          ))}
        </div>
      )}
    </div>
  );
}
