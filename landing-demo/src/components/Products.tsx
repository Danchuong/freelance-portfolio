import { products } from "@/content/site";
import { CoffeeBag } from "./CoffeeBag";
import { Section } from "./Section";

const accents = ["#f59e0b", "#e11d48", "#a16207"];

export function Products() {
  return (
    <Section
      id="products"
      eyebrow="This week's roast"
      title="Three lots we can't stop brewing"
      intro="Every bag lists the farm, altitude and roast date. Whole bean or ground to order."
    >
      <ul className="grid gap-8 md:grid-cols-3">
        {products.map((p, i) => (
          <li key={p.name}>
            <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-bean/5 transition hover:shadow-xl">
              <div className={`relative flex h-64 items-end justify-center bg-gradient-to-br ${p.tone} pt-6`}>
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-bean">{p.badge}</span>
                <CoffeeBag label={p.name} sub={`${p.roast} roast`} accent={accents[i % accents.length]} className="w-40 transition duration-300 group-hover:-translate-y-2" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl font-semibold">{p.name}</h3>
                    <p className="mt-1 text-sm text-roast/80">{p.origin}</p>
                  </div>
                  <p className="text-right">
                    <span className="block text-lg font-semibold">{p.price}</span>
                    <span className="text-xs text-roast/80">{p.weight}</span>
                  </p>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tasting notes">
                  {p.notes.map((n) => (
                    <li key={n} className="rounded-full bg-paper px-3 py-1 text-xs font-medium text-roast">{n}</li>
                  ))}
                </ul>
                <a href="#contact" className="mt-6 rounded-full bg-bean py-3 text-center text-sm font-semibold text-cream transition hover:bg-roast">
                  Order {p.name}
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
