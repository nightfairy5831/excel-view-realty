import { site } from "@/lib/site";

export const metadata = { title: "Contact — Excel View Realty" };

export default function ContactPage() {
  return (
    <div className="pt-8">
      <section className="u-container py-14 grid lg:grid-cols-2 gap-14">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-clay mb-3">
            Get in touch
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight">
            We help you find your dream home
          </h1>
          <p className="mt-5 text-ink-soft leading-relaxed">
            Have a property in mind, or want to list yours with us? Reach out by
            WhatsApp, phone or email — or drop by the office in Gadong.
          </p>

          <div className="mt-9 space-y-7">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-clay mb-2">
                WhatsApp & mobile
              </p>
              {site.phones.map((p) => (
                <a
                  key={p}
                  href={`https://wa.me/${p.replace(/\D/g, "")}`}
                  className="block font-display text-2xl text-ink hover:text-clay"
                >
                  {p}
                </a>
              ))}
              <p className="text-ink-soft mt-1">Office · {site.office}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-clay mb-2">
                Email
              </p>
              {site.emails.map((e) => (
                <a
                  key={e}
                  href={`mailto:${e}`}
                  className="block text-ink hover:text-clay"
                >
                  {e}
                </a>
              ))}
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-clay mb-2">
                Office
              </p>
              <p className="text-ink-soft leading-relaxed max-w-sm">
                {site.address}
              </p>
            </div>

            <div className="flex gap-4">
              <a
                href={site.facebook}
                className="px-5 py-2 rounded-full border border-line text-ink-soft hover:border-clay hover:text-clay"
              >
                Facebook
              </a>
              <a
                href={site.instagram}
                className="px-5 py-2 rounded-full border border-line text-ink-soft hover:border-clay hover:text-clay"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* enquiry form (front-end demo) */}
        <div className="rounded-2xl bg-cream border border-line p-8 h-fit">
          <h2 className="font-display text-2xl text-ink mb-6">Send an enquiry</h2>
          <form
            className="space-y-4"
            action={`https://wa.me/${site.whatsapp}`}
            method="get"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                placeholder="Name"
                className="px-4 py-3 rounded-xl bg-cream border border-line outline-none focus:border-clay"
              />
              <input
                placeholder="Phone"
                className="px-4 py-3 rounded-xl bg-cream border border-line outline-none focus:border-clay"
              />
            </div>
            <input
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl bg-cream border border-line outline-none focus:border-clay"
            />
            <input
              placeholder="Property of interest"
              className="w-full px-4 py-3 rounded-xl bg-cream border border-line outline-none focus:border-clay"
            />
            <textarea
              name="text"
              rows={5}
              placeholder="How can we help?"
              className="w-full px-4 py-3 rounded-xl bg-cream border border-line outline-none focus:border-clay resize-none"
            />
            <button
              type="submit"
              className="w-full px-6 py-3.5 rounded-xl bg-clay text-cream hover:bg-clay-deep transition-colors font-medium"
            >
              Send via WhatsApp
            </button>
            <p className="text-xs text-ink-soft text-center">
              This opens WhatsApp with your message to {site.phones[0]}.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
