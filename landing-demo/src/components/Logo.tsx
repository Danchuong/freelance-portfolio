export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#2b1d14" />
      <path d="M6 21c3-5 6-7 10-7s7 2 10 7" fill="none" stroke="#faf6f0" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 12c1.5-2 3.5-3 6-3s4.5 1 6 3" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
