import Link from "next/link";
import Image from "next/image";
import { coverImage, dealLabel, type Listing } from "@/lib/listings";

export default function ListingCard({
  l,
  width,
}: {
  l: Listing;
  width?: string;
}) {
  const cover = coverImage(l);
  return (
    <Link
      href={`/listings/${l.slug}`}
      className={`group block card-lift ${width ?? ""}`}
    >
      <div className="img-zoom relative aspect-[5/6] rounded-[1.25rem] overflow-hidden bg-sand">
        <Image
          src={cover}
          alt={l.title}
          fill
          sizes="(max-width: 768px) 80vw, 340px"
          className="object-cover"
        />
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-porcelain/90 backdrop-blur text-ink text-[0.7rem] uppercase tracking-[0.12em]">
          {dealLabel(l)}
        </span>
        {l.status && (
          <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-clay text-cream text-[0.7rem]">
            {l.status}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-ink/75 to-transparent">
          <p className="font-display text-xl text-porcelain">
            {l.price || "Enquire"}
          </p>
        </div>
      </div>

      <div className="pt-3.5 px-1">
        <p className="text-[0.68rem] uppercase tracking-[0.16em] text-clay mb-1">
          {l.categoryLabel}
          {l.locationTag && ` · ${l.locationTag}`}
        </p>
        <h3 className="font-display text-[1.05rem] leading-snug text-ink group-hover:text-clay transition-colors line-clamp-2">
          {l.title}
        </h3>
        <div className="mt-2 flex items-center gap-3 text-xs text-ink-soft">
          {l.beds != null && <span>{l.beds} bed</span>}
          {l.baths != null && <span>· {l.baths} bath</span>}
          {l.builtup && <span>· {l.builtup}</span>}
        </div>
      </div>
    </Link>
  );
}
