"use client";

import { useState, type FormEvent } from "react";
import { shop, shopProducts, formatVnd, type ProductId } from "@/content/shop";

type Order = { name: string; phone: string; address: string; productId: ProductId; qty: number };

const PHONE_RE = /^0\d{9}$/;
const MAX_QTY = 20;

const inputClass =
  "mt-1.5 block w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-base text-ink placeholder:text-ink/40 focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/25";

function totals(order: Pick<Order, "productId" | "qty">) {
  const product = shopProducts.find((p) => p.id === order.productId) ?? shopProducts[0];
  const subtotal = product.price * order.qty;
  const ship = subtotal >= shop.freeShipFrom ? 0 : shop.shipFee;
  return { product, subtotal, ship, total: subtotal + ship };
}

function summaryText(order: Order) {
  const { product, subtotal, ship, total } = totals(order);
  return [
    `ĐƠN HÀNG ${shop.name.toUpperCase()}`,
    `Sản phẩm: ${product.name} (${product.size}) x ${order.qty}`,
    `Tạm tính: ${formatVnd(subtotal)}`,
    `Phí ship: ${ship === 0 ? "Miễn phí" : formatVnd(ship)}`,
    `Tổng: ${formatVnd(total)}`,
    `Người nhận: ${order.name}`,
    `SĐT: ${order.phone}`,
    `Địa chỉ: ${order.address}`,
  ].join("\n");
}

function parseOrder(form: HTMLFormElement): Order | string {
  const data = new FormData(form);
  const name = String(data.get("name") ?? "").trim();
  const phone = String(data.get("phone") ?? "").replace(/[\s.]/g, "");
  const address = String(data.get("address") ?? "").trim();
  const productId = String(data.get("product")) as ProductId;
  const qty = Number(data.get("qty"));
  if (name.length < 2) return "Vui lòng nhập họ tên.";
  if (!PHONE_RE.test(phone)) return "Số điện thoại cần 10 số, bắt đầu bằng 0.";
  if (address.length < 8) return "Vui lòng nhập địa chỉ đầy đủ (số nhà, phường/xã, tỉnh).";
  if (!shopProducts.some((p) => p.id === productId)) return "Vui lòng chọn sản phẩm.";
  if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) return `Số lượng từ 1 đến ${MAX_QTY}.`;
  return { name, phone, address, productId, qty };
}

export function OrderForm() {
  const [draft, setDraft] = useState<{ productId: ProductId; qty: number }>({ productId: shopProducts[0].id, qty: 1 });
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const live = totals(draft);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = parseOrder(e.currentTarget);
    if (typeof result === "string") {
      setError(result);
      return;
    }
    setError("");
    setCopied(false);
    setOrder(result);
  }

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (err) {
      console.error("Clipboard write failed", err);
      setCopied(false);
    }
  }

  const text = order ? summaryText(order) : "";

  return (
    <div className="grid gap-6 md:grid-cols-5">
      <form onSubmit={onSubmit} noValidate className="space-y-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-ink/5 sm:p-7 md:col-span-3">
        <label className="block text-sm font-medium">
          Họ tên
          <input name="name" required autoComplete="name" className={inputClass} placeholder="Nguyễn Thị A" />
        </label>
        <label className="block text-sm font-medium">
          Số điện thoại
          <input name="phone" required type="tel" inputMode="tel" autoComplete="tel" className={inputClass} placeholder="09xx xxx xxx" />
        </label>
        <label className="block text-sm font-medium">
          Địa chỉ nhận hàng
          <textarea name="address" required rows={2} autoComplete="street-address" className={inputClass} placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh" />
        </label>
        <div className="grid grid-cols-3 gap-3">
          <label className="col-span-2 block text-sm font-medium">
            Sản phẩm
            <select
              name="product"
              className={inputClass}
              value={draft.productId}
              onChange={(e) => setDraft({ ...draft, productId: e.target.value as ProductId })}
            >
              {shopProducts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} – {formatVnd(p.price)}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium">
            Số lượng
            <input
              name="qty"
              type="number"
              min={1}
              max={MAX_QTY}
              inputMode="numeric"
              className={inputClass}
              value={draft.qty}
              onChange={(e) => setDraft({ ...draft, qty: Number(e.target.value) || 1 })}
            />
          </label>
        </div>
        <p className="flex items-baseline justify-between border-t border-ink/10 pt-4 text-sm text-ink/70">
          <span>{live.ship === 0 ? "Miễn phí ship" : `+ ship ${formatVnd(live.ship)}`}</span>
          <span>
            Tổng <strong className="font-serif text-2xl text-ink">{formatVnd(live.total)}</strong>
          </span>
        </p>
        {error && (
          <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <button type="submit" className="w-full rounded-full bg-moss px-6 py-4 text-base font-semibold text-white shadow-lg shadow-moss/20 transition hover:bg-ink">
          Xác nhận đơn hàng
        </button>
        <p className="text-center text-xs text-ink/50">Trang demo: không lưu và không gửi dữ liệu của bạn đi đâu.</p>
      </form>

      <div aria-live="polite" className="md:col-span-2">
        {order ? (
          <div className="rounded-3xl bg-ink p-5 text-linen sm:p-7">
            <h3 className="font-serif text-xl font-semibold">Gần xong rồi!</h3>
            <p className="mt-1 text-sm text-linen/70">Gửi đơn này cho shop qua Zalo hoặc Messenger để chốt.</p>
            <pre className="mt-4 whitespace-pre-wrap rounded-2xl bg-white/10 p-4 font-sans text-sm leading-relaxed">{text}</pre>
            <div className="mt-4 grid gap-2">
              <button type="button" onClick={() => copy(text)} className="rounded-full bg-linen px-5 py-3 font-semibold text-ink">
                {copied ? "Đã sao chép ✓" : "Sao chép đơn"}
              </button>
              <a
                href={`https://zalo.me/${shop.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => copy(text)}
                className="rounded-full bg-[#0068ff] px-5 py-3 text-center font-semibold text-white"
              >
                Chép đơn &amp; mở Zalo
              </a>
              <a
                href={`https://m.me/${shop.messengerUser}?text=${encodeURIComponent(text)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-linen/30 px-5 py-3 text-center font-semibold"
              >
                Gửi qua Messenger
              </a>
            </div>
            <p className="mt-3 text-xs text-linen/50">Zalo chưa hỗ trợ điền sẵn tin nhắn: đơn đã được chép, bạn chỉ cần dán và gửi.</p>
          </div>
        ) : (
          <div className="flex h-full flex-col justify-center rounded-3xl border-2 border-dashed border-ink/15 p-6 text-sm text-ink/60">
            <p className="font-semibold text-ink">Cách đặt hàng</p>
            <ol className="mt-3 list-decimal space-y-2 pl-5">
              <li>Điền thông tin và bấm “Xác nhận đơn hàng”.</li>
              <li>Trang tạo sẵn nội dung đơn cho bạn.</li>
              <li>Bấm gửi qua Zalo hoặc Messenger, shop gọi lại xác nhận trong 30 phút (giờ hành chính).</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
