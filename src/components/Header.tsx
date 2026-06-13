"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { nav, site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50 bg-porcelain">
      <div className="u-container flex items-center justify-between py-5">
        <Link href="/" className="flex items-center" aria-label="Excel View Realty — home">
          <Image
            src="/brand/logo.png"
            alt="Excel View Realty"
            width={623}
            height={236}
            priority
            className="h-11 w-auto sm:h-12"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {nav.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              className="text-[0.82rem] uppercase tracking-[0.12em] text-ink-soft hover:text-clay transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block text-sm px-5 py-2.5 rounded-full bg-ink text-porcelain hover:bg-clay transition-colors"
          >
            Enquire
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden p-2 -mr-2"
            aria-label="Menu"
          >
            <div className="space-y-1.5">
              <span className="block w-6 h-px bg-ink" />
              <span className="block w-6 h-px bg-ink" />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-line bg-porcelain">
          <nav className="u-container py-4 grid grid-cols-2 gap-x-6">
            {nav.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-ink-soft hover:text-clay border-b border-line/60 text-sm uppercase tracking-[0.1em]"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
