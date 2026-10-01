import { hero } from "@/content/site";
import { CoffeeBag } from "./CoffeeBag";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-amber-200/50 blur-3xl" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-12 sm:px-6 md:grid-cols-2 md:pt-20 lg:pb-28">
        <div className="relative">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-clay/30 bg-white/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-clay">
            <span className="h-1.5 w-1.5 rounded-full bg-clay" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1 id="hero-title" className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-roast">{hero.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={hero.primaryCta.href} className="rounded-full bg-clay px-7 py-3.5 font-semibold text-white shadow-lg shadow-clay/25 transition hover:-translate-y-0.5 hover:bg-orange-800">
              {hero.primaryCta.label}
            </a>
            <a href={hero.secondaryCta.href} className="rounded-full border border-bean/20 bg-white/60 px-7 py-3.5 font-semibold transition hover:border-bean/40">
              {hero.secondaryCta.label}
            </a>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-bean/10 pt-6">
            {hero.stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="text-xs uppercase tracking-wider text-roast/80">{s.label}</dt>
                <dd className="font-serif text-3xl font-semibold">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative mx-auto flex w-full max-w-md items-end justify-center" aria-hidden="true">
          <div className="absolute inset-x-6 bottom-6 top-10 rounded-[2.5rem] bg-gradient-to-br from-amber-100 via-orange-100 to-paper" />
          <CoffeeBag label="Sơn La Natural" sub="Medium roast" accent="#e11d48" className="relative -mr-10 mb-2 w-40 -rotate-6 sm:w-48" />
          <CoffeeBag label="Cầu Đất Arabica" sub="Light roast" className="relative z-10 w-52 sm:w-60" />
        </div>
      </div>
    </section>
  );
}
