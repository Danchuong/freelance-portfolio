type Props = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, eyebrow, title, intro, className = "", children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-20 py-20 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">{eyebrow}</p>
          <h2 id={`${id}-title`} className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {intro && <p className="mt-4 text-lg text-roast">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
