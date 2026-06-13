"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { categories } from "@/lib/listings";

export default function FilterBar() {
  const router = useRouter();
  const sp = useSearchParams();

  const set = (key: string, value: string) => {
    const p = new URLSearchParams(sp.toString());
    if (value) p.set(key, value);
    else p.delete(key);
    router.push(`/listings?${p.toString()}`);
  };

  const deal = sp.get("deal") ?? "";
  const cat = sp.get("cat") ?? "";
  const beds = sp.get("beds") ?? "";
  const q = sp.get("q") ?? "";

  const pill = (active: boolean) =>
    `px-4 py-2 rounded-full text-sm transition-colors border ${
      active
        ? "bg-clay text-cream border-clay"
        : "bg-cream text-ink-soft border-line hover:border-clay/50"
    }`;

  return (
    <div className="space-y-4">
      <input
        defaultValue={q}
        onKeyDown={(e) => {
          if (e.key === "Enter") set("q", (e.target as HTMLInputElement).value);
        }}
        placeholder="Search location, type or item code… (press Enter)"
        className="w-full px-5 py-3.5 rounded-xl bg-cream border border-line outline-none focus:border-clay text-ink placeholder:text-ink-soft/60"
      />

      <div className="flex flex-wrap gap-2">
        <button className={pill(!deal)} onClick={() => set("deal", "")}>
          All
        </button>
        <button className={pill(deal === "sale")} onClick={() => set("deal", "sale")}>
          For Sale
        </button>
        <button className={pill(deal === "rent")} onClick={() => set("deal", "rent")}>
          For Rent
        </button>

        <span className="w-px bg-line mx-1" />

        <select
          value={cat}
          onChange={(e) => set("cat", e.target.value)}
          className="px-4 py-2 rounded-full text-sm bg-cream border border-line text-ink-soft outline-none"
        >
          <option value="">All types</option>
          {categories.map((c) => (
            <option key={c.key} value={c.key}>
              {c.label}
            </option>
          ))}
        </select>

        <select
          value={beds}
          onChange={(e) => set("beds", e.target.value)}
          className="px-4 py-2 rounded-full text-sm bg-cream border border-line text-ink-soft outline-none"
        >
          <option value="">Any beds</option>
          {[1, 2, 3, 4, 5].map((b) => (
            <option key={b} value={b}>
              {b}+ beds
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
