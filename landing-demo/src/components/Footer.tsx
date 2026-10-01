import { site } from "@/content/site";
import { LogoMark } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-bean/10 bg-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-roast sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex items-center gap-2 font-serif font-semibold text-bean">
          <LogoMark className="h-6 w-6" /> {site.name}
        </p>
        <p>{site.address}</p>
        <p>© {new Date().getFullYear()} {site.name}. Fictional brand for demo purposes.</p>
      </div>
    </footer>
  );
}
