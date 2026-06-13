"use client";

import Image from "next/image";
import { useState } from "react";

export default function Gallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  if (images.length === 0) {
    return (
      <div className="aspect-[16/10] rounded-2xl bg-sand grid place-items-center font-display text-2xl text-ink-soft/40">
        Excel View Realty
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-sand">
        <Image
          src={images[active]}
          alt={`${title} — image ${active + 1}`}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActive((a) => (a - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cream/85 text-clay-deep grid place-items-center hover:bg-cream"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              onClick={() => setActive((a) => (a + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cream/85 text-clay-deep grid place-items-center hover:bg-cream"
              aria-label="Next"
            >
              ›
            </button>
            <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-clay-deep/80 text-cream text-xs">
              {active + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 sm:grid-cols-6 gap-2">
          {images.slice(0, 12).map((img, i) => (
            <button
              key={img}
              onClick={() => setActive(i)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                i === active ? "border-clay" : "border-transparent opacity-75 hover:opacity-100"
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="15vw" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
