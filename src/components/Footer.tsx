import Link from "next/link";
import { site, nav } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ink text-porcelain/85 mt-8">
      <div className="u-container pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1.2fr] border-b border-porcelain/12 pb-12">
          <div>
            <p className="font-display text-3xl text-porcelain">
              Excel View <span className="font-display-italic text-clay">Realty</span>
            </p>
            <p className="mt-4 max-w-sm text-porcelain/55 leading-relaxed">
              {site.licensedLine}
            </p>
            <p className="mt-6 font-display-italic text-clay text-lg">
              {site.dreamLine}
            </p>
          </div>

          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-porcelain/40 mb-4">
              Explore
            </p>
            <ul className="space-y-2.5">
              {nav.map((n) => (
                <li key={n.label}>
                  <Link href={n.href} className="text-porcelain/75 hover:text-clay transition-colors">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-porcelain/40 mb-4">
              Visit & contact
            </p>
            <p className="text-porcelain/70 leading-relaxed text-sm">{site.address}</p>
            <div className="mt-4 space-y-1 text-sm">
              {site.phones.map((p) => (
                <a key={p} href={`https://wa.me/${p.replace(/\D/g, "")}`} className="block text-porcelain/85 hover:text-clay">
                  {p}
                </a>
              ))}
              <p className="text-porcelain/50">Office {site.office}</p>
              <a href={`mailto:${site.emails[0]}`} className="block text-porcelain/85 hover:text-clay mt-2">
                {site.emails[0]}
              </a>
            </div>
            <div className="mt-5 flex gap-4 text-sm">
              <a href={site.facebook} className="hover:text-clay">Facebook</a>
              <a href={site.instagram} className="hover:text-clay">Instagram</a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-porcelain/45">
          <p>© {new Date().getFullYear()} excelviewbrunei.com · {site.license}</p>
          <p>Bandar Seri Begawan, Brunei Darussalam</p>
        </div>
      </div>
    </footer>
  );
}
