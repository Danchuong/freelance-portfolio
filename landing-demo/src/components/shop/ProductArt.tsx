import type { ShopProduct } from "@/content/shop";

type Props = { product: Pick<ShopProduct, "id" | "kind" | "colors">; className?: string };

// Lightweight SVG "product photos" so the page ships no image files.
export function ProductArt({ product, className = "" }: Props) {
  const { base, accent } = product.colors;
  const id = `g-${product.id}`;

  if (product.kind === "oil") {
    return (
      <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Minh họa chai tinh dầu">
        <defs>
          <linearGradient id={id} x1="0" x2="1">
            <stop offset="0" stopColor={accent} />
            <stop offset="0.55" stopColor={base} />
            <stop offset="1" stopColor={accent} />
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="182" rx="52" ry="7" fill="#000" opacity="0.08" />
        <rect x="86" y="30" width="28" height="30" rx="4" fill="#2f2a24" />
        <rect x="90" y="56" width="20" height="10" fill="#4a4036" />
        <path d="M70 80c0-10 8-16 18-16h24c10 0 18 6 18 16v92c0 6-4 10-10 10H80c-6 0-10-4-10-10z" fill={`url(#${id})`} />
        <rect x="78" y="104" width="44" height="50" rx="4" fill="#fbf7ef" />
        <path d="M100 114c-8 6-10 14-6 22 6-2 10-8 6-22z" fill="#6f8a4f" />
        <path d="M100 136v8" stroke="#6f8a4f" strokeWidth="2" strokeLinecap="round" />
        <rect x="76" y="84" width="6" height="70" rx="3" fill="#fff" opacity="0.25" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Minh họa bánh xà phòng thủ công">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={base} />
          <stop offset="1" stopColor={accent} />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="170" rx="70" ry="9" fill="#000" opacity="0.08" />
      <path d="M36 92c0-14 10-22 24-22h80c14 0 24 8 24 22v52c0 14-10 22-24 22H60c-14 0-24-8-24-22z" fill={accent} />
      <path d="M36 88c0-14 10-22 24-22h80c14 0 24 8 24 22v44c0 14-10 20-24 20H60c-14 0-24-6-24-20z" fill={`url(#${id})`} />
      <rect x="62" y="92" width="76" height="34" rx="17" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="3" />
      <text x="100" y="115" textAnchor="middle" fontSize="15" fontFamily="Georgia, serif" fill="#fff" fillOpacity="0.85">
        Mộc Hương
      </text>
      <path d="M150 52c-14 4-20 14-18 26 12-2 20-12 18-26z" fill="#6f8a4f" />
      <path d="M134 76c4-8 9-14 14-18" stroke="#4f6b45" strokeWidth="2" fill="none" />
    </svg>
  );
}
