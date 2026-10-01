import type { Metadata } from "next";
import { benefits, formatVnd, packageIncludes, sampleReviews, shop, shopFaqs, shopProducts } from "@/content/shop";
import { ProductArt } from "@/components/shop/ProductArt";
import { OrderForm } from "@/components/shop/OrderForm";

const title = `${shop.name} | ${shop.tagline} (trang demo)`;

export const metadata: Metadata = {
  title,
  description: shop.description,
  alternates: { canonical: "/shop-demo/" },
  openGraph: { type: "website", url: "/shop-demo/", title, description: shop.description, locale: "vi_VN", images: [] },
  twitter: { card: "summary", title, description: shop.description, images: [] },
  robots: { index: false },
};

const zaloHref = `https://zalo.me/${shop.phone}`;

function SectionTitle({ id, eyebrow, children }: { id: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-honey">{eyebrow}</p>
      <h2 id={id} className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
        {children}
      </h2>
    </div>
  );
}

export default function ShopDemo() {
  const [hero, ...rest] = shopProducts;
  return (
    <div lang="vi" className="min-h-screen bg-linen pb-20 text-ink md:pb-0">
      <p className="bg-ink px-4 py-2 text-center text-xs text-linen/80">
        Trang mẫu cho shop online. “{shop.name}” là cửa hàng hư cấu, đánh giá chỉ để minh họa.
      </p>

      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="#" className="font-serif text-2xl font-semibold text-moss">
          {shop.name}
        </a>
        <nav className="hidden gap-6 text-sm font-medium md:flex" aria-label="Điều hướng">
          <a href="#san-pham" className="hover:text-moss">Sản phẩm</a>
          <a href="#hoi-dap" className="hover:text-moss">Hỏi đáp</a>
          <a href="#dat-hang" className="rounded-full bg-moss px-4 py-2 text-white hover:bg-ink">Đặt hàng</a>
        </nav>
      </header>

      <main>
        <section aria-labelledby="hero-title" className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-honey/20 blur-3xl" aria-hidden="true" />
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-14 pt-4 sm:px-6 md:grid-cols-2 md:pt-12">
            <div className="relative">
              <p className="inline-flex rounded-full bg-moss/10 px-3 py-1 text-xs font-semibold text-moss">Làm tay tại Đà Lạt · mẻ nhỏ mỗi tuần</p>
              <h1 id="hero-title" className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Tắm sạch, thơm dịu, <span className="text-moss">lành cho da</span>
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-ink/75">
                Xà phòng thủ công từ nghệ, mật ong, trà xanh và tinh dầu nguyên chất. Không SLS, không hương liệu tổng hợp.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#dat-hang" className="rounded-full bg-moss px-7 py-3.5 font-semibold text-white shadow-lg shadow-moss/25 transition hover:bg-ink">
                  Đặt hàng ngay
                </a>
                <span className="text-sm text-ink/60">Từ {formatVnd(hero.price)} · Freeship đơn từ {formatVnd(shop.freeShipFrom)}</span>
              </div>
            </div>
            <div className="relative mx-auto flex w-full max-w-sm items-end justify-center" aria-hidden="true">
              <div className="absolute inset-x-4 bottom-4 top-12 rounded-[2.5rem] bg-gradient-to-br from-honey/25 via-white to-moss/15" />
              <ProductArt product={rest[1]} className="relative -mr-10 w-32 -rotate-6 sm:w-40" />
              <ProductArt product={hero} className="relative z-10 w-56 sm:w-64" />
            </div>
          </div>
        </section>

        <section id="san-pham" aria-labelledby="sp-title" className="scroll-mt-4 bg-white/60 py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionTitle id="sp-title" eyebrow="Sản phẩm">Chọn món hợp với bạn</SectionTitle>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {shopProducts.map((p) => (
                <li key={p.id} className="relative flex flex-col rounded-3xl bg-linen p-5 ring-1 ring-ink/5">
                  {p.badge && <span className="absolute left-4 top-4 rounded-full bg-honey px-3 py-1 text-xs font-semibold text-white">{p.badge}</span>}
                  <ProductArt product={p} className="mx-auto h-40 w-40" />
                  <h3 className="mt-2 font-serif text-xl font-semibold">{p.name}</h3>
                  <p className="text-sm text-ink/60">{p.size}</p>
                  <p className="mt-2 flex-1 text-ink/75">{p.note}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-serif text-2xl font-semibold text-moss">{formatVnd(p.price)}</span>
                    <a href="#dat-hang" className="rounded-full border border-moss px-4 py-2 text-sm font-semibold text-moss hover:bg-moss hover:text-white">
                      Đặt mua
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="loi-ich-title" className="py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionTitle id="loi-ich-title" eyebrow="Vì sao chọn Mộc Hương">Nhỏ mà có tâm</SectionTitle>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((b, i) => (
                <li key={b.title} className="rounded-3xl bg-white p-5 ring-1 ring-ink/5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-moss/10 font-serif font-semibold text-moss" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 font-semibold">{b.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">{b.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="review-title" className="bg-moss py-14 text-linen">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-8 text-center">
              <h2 id="review-title" className="font-serif text-3xl font-semibold sm:text-4xl">Khách nói gì</h2>
              <p className="mt-2 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">Đánh giá minh họa, không phải khách thật</p>
            </div>
            <ul className="grid gap-4 md:grid-cols-3">
              {sampleReviews.map((r) => (
                <li key={r.name}>
                  <figure className="h-full rounded-3xl bg-white/10 p-5">
                    <p className="text-honey" aria-label="5 sao">★★★★★</p>
                    <blockquote className="mt-2 leading-relaxed">“{r.text}”</blockquote>
                    <figcaption className="mt-3 text-sm text-linen/70">
                      {r.name} · {r.place}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="hoi-dap" aria-labelledby="faq-title" className="scroll-mt-4 py-14">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <SectionTitle id="faq-title" eyebrow="Hỏi đáp">Ship, đổi trả, thanh toán</SectionTitle>
            <div className="divide-y divide-ink/10 rounded-3xl bg-white px-5 ring-1 ring-ink/5">
              {shopFaqs.map((f, i) => (
                <details key={f.q} className="group py-4" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linen text-moss transition group-open:rotate-45" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="mt-2 leading-relaxed text-ink/75">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="dat-hang" aria-labelledby="order-title" className="scroll-mt-4 bg-white/60 py-14">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <SectionTitle id="order-title" eyebrow="Đặt hàng">Đặt nhanh trong 1 phút</SectionTitle>
            <OrderForm />
          </div>
        </section>

        <section aria-labelledby="goi-title" className="py-14">
          <div className="mx-auto max-w-3xl rounded-3xl border border-honey/40 bg-white px-5 py-8 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-honey">Dành cho chủ shop</p>
            <h2 id="goi-title" className="mt-2 font-serif text-2xl font-semibold">Muốn một trang như thế này cho shop của bạn?</h2>
            <p className="mt-2 text-ink/70">Trọn gói 1–1,5 triệu đồng, gồm:</p>
            <ul className="mt-4 space-y-2">
              {packageIncludes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 text-moss" aria-hidden="true">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink/10 px-4 py-8 text-center text-sm text-ink/60">
        <p className="font-serif text-lg font-semibold text-moss">{shop.name}</p>
        <p className="mt-1">Cửa hàng hư cấu dùng làm mẫu. Mọi trùng hợp với cửa hàng thật là ngẫu nhiên.</p>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-ink/10 bg-white/95 p-2 backdrop-blur md:hidden">
        <a href={`tel:${shop.phone}`} className="rounded-full bg-moss py-3 text-center font-semibold text-white">
          Gọi ngay
        </a>
        <a href={zaloHref} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#0068ff] py-3 text-center font-semibold text-white">
          Nhắn Zalo
        </a>
      </div>
    </div>
  );
}
