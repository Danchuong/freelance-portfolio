import { features, type FeatureIcon } from "@/content/site";
import { Section } from "./Section";

const paths: Record<FeatureIcon, string> = {
  leaf: "M5 19c0-8 6-14 15-14 0 9-6 15-14 15M5 19l7-7",
  flame: "M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-6 1-9Z",
  truck: "M3 6h11v10H3zM14 10h4l3 3v3h-7M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  cup: "M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9ZM17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 3v3M12 3v3",
};

export function Features() {
  return (
    <Section
      id="features"
      eyebrow="Why Đồi Mây"
      title="Freshness and fairness, from farm to cup"
      intro="Everything we do is about getting better coffee to you, and a better price to the people who grow it."
      className="bg-paper"
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <li key={f.title} className="rounded-3xl bg-cream p-7 shadow-sm ring-1 ring-bean/5 transition hover:-translate-y-1 hover:shadow-md">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-bean text-amber-400">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={paths[f.icon]} />
              </svg>
            </span>
            <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 leading-relaxed text-roast">{f.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
