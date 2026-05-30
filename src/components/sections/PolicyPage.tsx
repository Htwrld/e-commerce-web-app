"use client";

import { useState } from "react";
import { T } from "@/lib/tokens";

type TabKey = "shipping" | "returns" | "privacy" | "terms";

const POLICIES: Record<TabKey, { title: string; content: { h: string; b: string }[] }> = {
  shipping: {
    title: "Shipping Policy",
    content: [
      { h:"Delivery Within Lagos",    b:"Free delivery on all orders within Lagos State. Standard delivery takes 1–3 business days. Express same-day delivery available for orders placed before 12PM (additional fee applies)." },
      { h:"Nationwide Delivery",      b:"We ship to all 36 states in Nigeria. Delivery typically takes 3–7 business days. Shipping fees vary by location and will be calculated at checkout." },
      { h:"International Shipping",   b:"We ship to the UK, USA, Canada, and other countries. International orders typically take 7–14 business days. Customs duties and import taxes are the responsibility of the customer." },
      { h:"Order Tracking",           b:"Once your order is dispatched, you'll receive a tracking number via WhatsApp and email. Our team is available on WhatsApp for any shipping inquiries." },
    ],
  },
  returns: {
    title: "Return Policy",
    content: [
      { h:"Return Window",      b:"We accept returns within 14 days of delivery. Items must be unused, unworn, and in their original packaging with all tags attached." },
      { h:"How to Return",      b:"Contact us via WhatsApp or email with your order number and reason for return. We'll provide you with return instructions within 24 hours." },
      { h:"Refunds",            b:"Once we receive and inspect the returned item, refunds are processed within 5–7 business days to your original payment method." },
      { h:"Exchanges",          b:"We're happy to exchange for a different size or colour, subject to availability. Exchange processing takes 3–5 business days." },
      { h:"Non-Returnable Items",b:"Sale items, customised pieces, and items returned after 14 days are not eligible for returns or refunds." },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    content: [
      { h:"Information We Collect", b:"We collect your name, email, phone number, and delivery address when you place an order or sign up for our newsletter. We use this to process and deliver your orders." },
      { h:"How We Use Your Data",   b:"Your information is used to process orders, communicate about your purchase, and (with your consent) send you marketing communications. We never sell your data to third parties." },
      { h:"Data Security",          b:"We implement industry-standard security measures to protect your personal information. Payment processing is handled by secure, PCI-compliant providers (Paystack/Flutterwave)." },
      { h:"Your Rights",            b:"You have the right to access, correct, or delete your personal data at any time. Contact us via email or WhatsApp to exercise these rights." },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    content: [
      { h:"Acceptance of Terms",    b:"By accessing and using the HTW website and placing orders, you agree to these terms and conditions. If you do not agree, please do not use our services." },
      { h:"Product Descriptions",   b:"We make every effort to accurately display product colours and descriptions. However, actual colours may vary slightly depending on your device screen." },
      { h:"Pricing",                b:"All prices are displayed in Nigerian Naira (₦) and approximate USD ($). Prices are subject to change without notice. The price at the time of order placement will apply." },
      { h:"Intellectual Property",  b:"All content on this website — including designs, logos, images, and copy — is the exclusive property of Hope's Trendy World and is protected by copyright law." },
    ],
  },
};

const TABS: { k: TabKey; l: string }[] = [
  { k:"shipping", l:"Shipping" },
  { k:"returns",  l:"Returns" },
  { k:"privacy",  l:"Privacy" },
  { k:"terms",    l:"Terms" },
];

export function PolicyPage() {
  const [tab, setTab] = useState<TabKey>("shipping");
  const pol = POLICIES[tab];

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 28px" }}>
      <p className="section-label">LEGAL</p>
      <h1 className="section-title" style={{ fontSize: "clamp(28px,5vw,46px)", marginBottom: 8 }}>Policies</h1>
      <div className="divider" style={{ marginBottom: 28 }} />

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
        {TABS.map(t => (
          <button key={t.k} onClick={() => setTab(t.k)}
            style={{ background: tab === t.k ? T.gold : "none", border: `2px solid ${tab === t.k ? T.gold : T.border}`, color: tab === t.k ? "#fff" : T.muted, padding: "9px 22px", borderRadius: 24, fontSize: 13, cursor: "pointer", fontFamily: "'Georgia',serif", fontWeight: 600, transition: "all .2s" }}>
            {t.l}
          </button>
        ))}
      </div>

      <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 14, padding: "32px 28px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 600, marginBottom: 24, color: T.ink }}>{pol.title}</h2>
        {pol.content.map((c, i) => (
          <div key={i} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: i < pol.content.length - 1 ? `1px solid ${T.sand}` : "none" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: T.rust, marginBottom: 8, letterSpacing: "0.02em" }}>{c.h}</h3>
            <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.9, margin: 0 }}>{c.b}</p>
          </div>
        ))}
        <p style={{ fontSize: 12, color: T.muted, marginTop: 8, fontStyle: "italic" }}>
          Last updated: April 2026 · Questions? Contact us on WhatsApp or at hello@hopestrendyworld.com
        </p>
      </div>
    </div>
  );
}
