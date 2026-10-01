// All page copy lives here. Edit this file to re-brand the page for a new client.

export const site = {
  name: "Đồi Mây Roasters",
  shortName: "Đồi Mây",
  tagline: "Specialty coffee from the Vietnamese highlands",
  description:
    "Small-batch specialty coffee roasted in Đà Lạt. Single-origin Arabica and fine Robusta from Vietnamese farms, roasted to order and shipped nationwide within 48 hours.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  locale: "en_US",
  email: "hello@example.com",
  phone: "+84 000 000 000",
  address: "Đà Lạt, Lâm Đồng, Vietnam",
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || "",
};

export const nav = [
  { label: "Why us", href: "#features" },
  { label: "Coffee", href: "#products" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export const hero = {
  eyebrow: "Roasted to order in Đà Lạt",
  title: "Coffee that tastes like the hills it grew on.",
  body: "We buy directly from smallholder farms in Cầu Đất, Sơn La and Đắk Lắk, roast in small batches every Tuesday and Friday, and ship to your door within 48 hours.",
  primaryCta: { label: "Shop the beans", href: "#products" },
  secondaryCta: { label: "Ask a question", href: "#contact" },
  stats: [
    { value: "12", label: "partner farms" },
    { value: "48h", label: "roast to door" },
    { value: "86+", label: "cupping scores" },
  ],
};

export const features = [
  {
    icon: "leaf",
    title: "Direct from the farm",
    body: "We pay farmers above market price and know every lot by name, altitude and harvest date.",
  },
  {
    icon: "flame",
    title: "Roasted twice a week",
    body: "Small 5 kg batches mean your bag is never older than a few days when it arrives.",
  },
  {
    icon: "truck",
    title: "Free nationwide shipping",
    body: "Free delivery on orders over 500.000₫. Hà Nội and Hồ Chí Minh City usually next day.",
  },
  {
    icon: "cup",
    title: "Ground for your brewer",
    body: "Phin, espresso, pour-over or French press: tell us how you brew and we grind for it.",
  },
] as const;

export type FeatureIcon = (typeof features)[number]["icon"];

export const products = [
  {
    name: "Cầu Đất Arabica",
    origin: "Lâm Đồng · 1,650 m",
    notes: ["Jasmine", "Peach", "Honey"],
    roast: "Light",
    price: "245.000₫",
    weight: "250 g",
    tone: "from-amber-200 to-orange-300",
    badge: "Best seller",
  },
  {
    name: "Sơn La Natural",
    origin: "Sơn La · 1,200 m",
    notes: ["Blueberry", "Cacao", "Red wine"],
    roast: "Medium",
    price: "265.000₫",
    weight: "250 g",
    tone: "from-rose-200 to-red-300",
    badge: "Limited lot",
  },
  {
    name: "Đắk Lắk Fine Robusta",
    origin: "Đắk Lắk · 600 m",
    notes: ["Dark chocolate", "Toasted nut", "Molasses"],
    roast: "Medium-dark",
    price: "195.000₫",
    weight: "250 g",
    tone: "from-stone-300 to-amber-700/60",
    badge: "Perfect for phin",
  },
] as const;

// SAMPLE PLACEHOLDERS: replace with real, permission-granted customer quotes before launch.
export const testimonials = [
  {
    quote:
      "The Cầu Đất lot is the first Vietnamese Arabica that made me stop adding condensed milk.",
    name: "Sample Customer A",
    role: "Home brewer, Hà Nội",
  },
  {
    quote:
      "Ordered Monday, roasted Tuesday, on my counter Wednesday. Freshness you can smell through the bag.",
    name: "Sample Customer B",
    role: "Café owner, Đà Nẵng",
  },
  {
    quote:
      "Their Robusta in a phin is rich without being bitter. Our whole office switched.",
    name: "Sample Customer C",
    role: "Office manager, HCMC",
  },
];

export const faqs = [
  {
    q: "How fresh is the coffee when it arrives?",
    a: "We roast every Tuesday and Friday and ship the same or next day, so most bags arrive 2 to 5 days after roasting, right in the ideal resting window.",
  },
  {
    q: "Whole bean or ground?",
    a: "Whole bean by default. At checkout you can choose a grind for phin, espresso, pour-over, AeroPress or French press.",
  },
  {
    q: "Do you ship outside Vietnam?",
    a: "Not yet. We currently deliver to all 63 provinces. International shipping is planned for next year.",
  },
  {
    q: "Do you offer subscriptions or wholesale?",
    a: "Yes. Subscriptions save 10% and can be paused any time. Cafés and offices can request wholesale pricing through the contact form below.",
  },
  {
    q: "What if I don't like a coffee?",
    a: "Tell us within 14 days and we will send a different lot or refund you, no return needed.",
  },
];
