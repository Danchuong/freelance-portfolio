// Copy for the /shop-demo page: a FICTIONAL Vietnamese seller of handmade soap.
// To re-brand for a real shop, edit this file only (and swap the phone/Zalo/Messenger placeholders).

export const shop = {
  name: "Mộc Hương",
  tagline: "Xà phòng thủ công & tinh dầu thiên nhiên",
  description:
    "Mộc Hương (cửa hàng minh họa) làm xà phòng thủ công từ dầu dừa, nghệ, trà xanh và tinh dầu nguyên chất. Giao toàn quốc, thanh toán COD hoặc chuyển khoản.",
  // Placeholders: replace with the seller's real number and Messenger page username.
  phone: "0900000000",
  phoneDisplay: "0900 000 000",
  messengerUser: "mochuong.demo",
  shipFee: 25000,
  freeShipFrom: 300000,
};

export type ProductId = "nghe" | "tra-xanh" | "sa-chanh";

export type ShopProduct = {
  id: ProductId;
  name: string;
  size: string;
  price: number;
  note: string;
  badge?: string;
  kind: "soap" | "oil";
  colors: { base: string; accent: string };
};

export const shopProducts: ShopProduct[] = [
  {
    id: "nghe",
    name: "Xà phòng Nghệ Mật Ong",
    size: "Bánh 100g",
    price: 59000,
    note: "Dịu nhẹ, hợp da khô và da dễ kích ứng.",
    badge: "Bán chạy",
    kind: "soap",
    colors: { base: "#f2c46b", accent: "#d98e2b" },
  },
  {
    id: "tra-xanh",
    name: "Xà phòng Trà Xanh Than Tre",
    size: "Bánh 100g",
    price: 65000,
    note: "Làm sạch sâu, hợp da dầu và da hay nổi mụn.",
    kind: "soap",
    colors: { base: "#9cb98a", accent: "#4f6b45" },
  },
  {
    id: "sa-chanh",
    name: "Tinh dầu Sả Chanh",
    size: "Chai 10ml",
    price: 129000,
    note: "Xông phòng, đuổi muỗi, thư giãn sau giờ làm.",
    badge: "Mới",
    kind: "oil",
    colors: { base: "#c9a46a", accent: "#7a5a2e" },
  },
];

export const benefits = [
  { title: "Nguyên liệu thiên nhiên", body: "Dầu dừa, dầu ô liu, bột nghệ, trà xanh. Không chất tạo bọt SLS, không hương liệu tổng hợp." },
  { title: "Làm tay từng mẻ nhỏ", body: "Mỗi mẻ khoảng 40 bánh, ủ 4 tuần cho xà phòng lành và cứng bánh." },
  { title: "Giao toàn quốc 2–4 ngày", body: "Đóng gói giấy kraft, không nilon. Miễn phí ship cho đơn từ 300.000đ." },
  { title: "Kiểm tra trước khi nhận", body: "Được mở hộp xem hàng. Lỗi do shop thì đổi mới trong 7 ngày." },
];

// Illustrative only: these are NOT real customer reviews.
export const sampleReviews = [
  { name: "Chị Lan", place: "Hà Nội", text: "Bánh nghệ thơm nhẹ, tắm xong da không bị khô căng. Đóng gói xinh, hợp làm quà." },
  { name: "Anh Minh", place: "Đà Nẵng", text: "Dùng bánh trà xanh hai tuần, lưng đỡ nổi mụn hẳn. Shop trả lời Zalo nhanh." },
  { name: "Bạn Vy", place: "TP.HCM", text: "Tinh dầu sả chanh xông phòng buổi tối rất dễ chịu, muỗi cũng ít hơn." },
];

export const shopFaqs = [
  {
    q: "Ship bao lâu, phí bao nhiêu?",
    a: "Nội thành 1–2 ngày, tỉnh khác 2–4 ngày. Phí ship đồng giá 25.000đ, miễn phí cho đơn từ 300.000đ.",
  },
  {
    q: "Đổi trả thế nào?",
    a: "Bạn được kiểm tra hàng trước khi nhận. Nếu sản phẩm bị vỡ, lỗi hoặc giao nhầm, shop đổi mới miễn phí trong 7 ngày, chỉ cần quay video lúc mở hộp.",
  },
  {
    q: "Thanh toán bằng cách nào?",
    a: "Thanh toán khi nhận hàng (COD) hoặc chuyển khoản ngân hàng. Shop gửi số tài khoản qua Zalo sau khi xác nhận đơn.",
  },
  {
    q: "Da nhạy cảm, bà bầu dùng được không?",
    a: "Xà phòng nghệ mật ong khá dịu, nhưng mỗi làn da mỗi khác. Bạn nên thử ở cổ tay trước. Tinh dầu không dùng trực tiếp lên da và không dùng cho trẻ dưới 2 tuổi.",
  },
];

export const packageIncludes = [
  "Landing page 1 trang như mẫu này, chuẩn điện thoại",
  "Form đặt hàng gửi thẳng về Zalo / Messenger, không cần server",
  "Thanh “Gọi ngay / Nhắn Zalo” cố định trên mobile",
  "Tên miền riêng hoặc hosting miễn phí, bàn giao trong 2–3 ngày",
];

export const formatVnd = (n: number) => `${n.toLocaleString("vi-VN")}đ`;
