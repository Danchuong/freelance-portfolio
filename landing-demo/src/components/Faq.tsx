import { faqs } from "@/content/site";
import { Section } from "./Section";

export function Faq() {
  return (
    <Section id="faq" eyebrow="FAQ" title="Questions, answered" className="bg-paper">
      <div className="mx-auto max-w-3xl divide-y divide-bean/10 rounded-3xl bg-cream px-6 ring-1 ring-bean/5">
        {faqs.map((f, i) => (
          <details key={f.q} className="group py-5" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold [&::-webkit-details-marker]:hidden">
              {f.q}
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper text-clay transition group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="mt-3 leading-relaxed text-roast">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
