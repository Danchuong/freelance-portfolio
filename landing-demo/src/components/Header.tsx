import { nav, site } from "@/content/site";
import { LogoMark } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-bean/10 bg-cream/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#main" className="flex items-center gap-2 font-serif text-lg font-semibold">
          <LogoMark />
          <span>{site.name}</span>
        </a>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm font-medium text-roast">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition hover:text-clay">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href="#contact"
          className="hidden rounded-full bg-bean px-5 py-2 text-sm font-semibold text-cream transition hover:bg-roast md:inline-block"
        >
          Contact us
        </a>
        <details className="group relative md:hidden">
          <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-bean/20 [&::-webkit-details-marker]:hidden">
            <span className="sr-only">Open menu</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </summary>
          <nav aria-label="Mobile" className="absolute right-0 mt-2 w-52 rounded-2xl border border-bean/10 bg-cream p-2 shadow-xl">
            <ul>
              {[...nav, { label: "Contact us", href: "#contact" }].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-paper">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
