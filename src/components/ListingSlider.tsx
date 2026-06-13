"use client";

import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import ListingCard from "./ListingCard";
import type { Listing } from "@/lib/listings";

export default function ListingSlider({
  listings,
  total,
}: {
  listings: Listing[];
  total: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByCards = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step * 2, behavior: "smooth" });
  };

  const arrow = (active: boolean) =>
    `w-11 h-11 rounded-full grid place-items-center border transition-colors ${
      active
        ? "border-ink/25 text-ink hover:bg-ink hover:text-porcelain hover:border-ink"
        : "border-line text-ink-soft/30 cursor-not-allowed"
    }`;

  return (
    <div>
      <div className="u-container flex items-end justify-between mb-9">
        <div>
          <p className="text-[0.72rem] uppercase tracking-[0.24em] text-clay mb-3">
            Currently available
          </p>
          <h2 className="font-display text-4xl text-ink">Recently listed</h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollByCards(-1)}
            disabled={!canPrev}
            className={arrow(canPrev)}
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={() => scrollByCards(1)}
            disabled={!canNext}
            className={arrow(canNext)}
            aria-label="Next"
          >
            ›
          </button>
          <Link
            href="/listings"
            className="hidden sm:inline-block ml-2 text-ink-soft hover:text-clay border-b border-ink/20 pb-1"
          >
            See everything →
          </Link>
        </div>
      </div>

      <div className="u-container">
        <div ref={trackRef} className="rail">
          {listings.map((l) => (
            <div key={l.slug} data-card className="w-[78vw] sm:w-[320px]">
              <ListingCard l={l} />
            </div>
          ))}
          <Link
            href="/listings"
            className="w-[78vw] sm:w-[320px] aspect-[5/6] rounded-[1.25rem] bg-olive text-cream grid place-items-center text-center p-6 card-lift"
          >
            <span>
              <span className="font-display text-3xl block">View all</span>
              <span className="text-cream/70 text-sm">{total} properties</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
