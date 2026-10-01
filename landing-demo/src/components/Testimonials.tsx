import { testimonials } from "@/content/site";
import { Section } from "./Section";

export function Testimonials() {
  return (
    <Section id="testimonials" eyebrow="Kind words" title="What coffee lovers say" className="bg-bean text-cream [&_h2]:text-cream [&_p.text-clay]:text-amber-400">
      <p className="mx-auto -mt-6 mb-10 w-fit rounded-full border border-amber-400/40 px-4 py-1.5 text-center text-xs font-semibold uppercase tracking-wider text-amber-300">
        Sample placeholder testimonials, not real customers
      </p>
      <ul className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <li key={t.name}>
            <figure className="flex h-full flex-col rounded-3xl bg-white/5 p-7 ring-1 ring-white/10">
              <svg viewBox="0 0 24 24" className="h-8 w-8 text-amber-400" fill="currentColor" aria-hidden="true">
                <path d="M9.5 6C6 7.5 4 10.4 4 14v4h6v-6H7c0-2.3 1.2-4 3.3-5L9.5 6Zm10 0C16 7.5 14 10.4 14 14v4h6v-6h-3c0-2.3 1.2-4 3.3-5l-.8-1Z" />
              </svg>
              <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-cream/90">{t.quote}</blockquote>
              <figcaption className="mt-6 border-t border-white/10 pt-4">
                <span className="block font-semibold">{t.name}</span>
                <span className="text-sm text-cream/60">{t.role}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
