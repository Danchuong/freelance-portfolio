type Props = { label: string; sub: string; accent?: string; className?: string };

/** Illustrated coffee bag: keeps the demo image-free and fast. Swap for real product photos via next/image. */
export function CoffeeBag({ label, sub, accent = "#f59e0b", className = "" }: Props) {
  return (
    <svg viewBox="0 0 200 260" className={className} role="img" aria-label={`${label} coffee bag`}>
      <defs>
        <linearGradient id={`bag-${label.length}-${sub.length}`} x1="0" x2="1">
          <stop offset="0" stopColor="#3b2619" />
          <stop offset="0.55" stopColor="#2b1d14" />
          <stop offset="1" stopColor="#1d130d" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="248" rx="78" ry="8" fill="#000" opacity="0.15" />
      <path d="M38 40 L162 40 L172 240 L28 240 Z" fill={`url(#bag-${label.length}-${sub.length})`} />
      <path d="M38 40 L162 40 L160 58 L40 58 Z" fill="#000" opacity="0.25" />
      <path d="M50 22 h100 l12 18 H38 Z" fill="#4a3022" />
      <rect x="54" y="92" width="92" height="104" rx="6" fill="#faf6f0" />
      <rect x="54" y="92" width="92" height="10" rx="3" fill={accent} />
      <circle cx="100" cy="128" r="14" fill="none" stroke="#2b1d14" strokeWidth="2.5" />
      <path d="M88 132c4-6 8-8 12-8s8 2 12 8" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
      <text x="100" y="166" textAnchor="middle" fontFamily="Georgia, serif" fontSize={Math.min(11, 150 / label.length)} fontWeight="700" fill="#2b1d14">
        {label}
      </text>
      <text x="100" y="182" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="8" fill="#5a3825" letterSpacing="1.5">
        {sub.toUpperCase()}
      </text>
    </svg>
  );
}
