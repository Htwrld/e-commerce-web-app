"use client";

import Image from "next/image";
import { Product } from "@/src/lib/data";
import { T } from "@/src/lib/tokens";
import { Badge } from "@/src/components/cards/Badge";
import { VerseChip } from "@/src/components/cards/VerseChip";
import { WABtn } from "@/src/components/cards/WABtn";

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAdd: (product: Product) => void;
}

export function ProductDetailModal({ product: p, onClose, onAdd }: ProductDetailModalProps) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 997, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} />
      <div
        style={{
          background: T.white,
          borderRadius: 16,
          padding: 28,
          maxWidth: 580,
          width: "100%",
          zIndex: 1,
          animation: "slideUp .3s ease",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 16,
            background: T.sand, border: "none", borderRadius: "50%",
            width: 32, height: 32, fontSize: 16, cursor: "pointer",
            color: T.muted, zIndex: 2,
          }}
        >✕</button>

        <div style={{ height: 260, background: p.bg, borderRadius: 10, overflow: "hidden", marginBottom: 20, position: "relative" }}>
          {p.img ? (
            <Image src={p.img} alt={p.name} fill style={{ objectFit: "cover", objectPosition: "center top" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80 }}>👕</div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <Badge text={p.badge} />
          <span style={{ fontSize: 11, color: T.muted, fontFamily: "monospace" }}>{p.gender.toUpperCase()}</span>
        </div>

        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 600, margin: "0 0 2px", color: T.ink }}>{p.name}</h2>
        <div style={{ fontSize: 14, color: T.muted, fontStyle: "italic", marginBottom: 12 }}>{p.subname}</div>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
          <span style={{ fontSize: 22, color: T.rust, fontWeight: 700 }}>{p.price}</span>
          <span style={{ fontSize: 14, color: T.muted }}>{p.usd}</span>
        </div>

        <p style={{ fontSize: 14, color: T.charcoal, lineHeight: 1.8, marginBottom: 14, fontStyle: "italic" }}>&ldquo;{p.story}&rdquo;</p>

        <div style={{ marginBottom: 16 }}>
          <VerseChip verse={p.verse} verseText={p.verseText} />
        </div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: T.muted, marginBottom: 8, letterSpacing: "0.05em" }}>AVAILABLE COLOURS</div>
          <div style={{ display: "flex", gap: 8 }}>
            {p.colors.map((c, i) => (
              <div key={i} style={{ width: 24, height: 24, borderRadius: "50%", background: c, border: `2px solid ${T.border}`, cursor: "pointer" }} />
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 12, color: T.muted, marginBottom: 8, letterSpacing: "0.05em" }}>SELECT SIZE</div>
          <div style={{ display: "flex", gap: 8 }}>
            {["XS","S","M","L","XL","XXL"].map(s => (
              <button key={s} style={{ background: T.sand, border: `1px solid ${T.border}`, color: T.ink, padding: "6px 12px", borderRadius: 6, fontSize: 12, cursor: "pointer", fontFamily: "'Georgia',serif" }}>{s}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={() => { onAdd(p); onClose(); }}>Add to Cart</button>
          <WABtn text="Order Now" product={p.name} />
        </div>

        <div style={{ marginTop: 16, padding: 14, background: T.warm, borderRadius: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: T.charcoal, marginBottom: 10, letterSpacing: "0.06em" }}>PRODUCT DETAILS</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              ["🧵 Fabric", p.cat === "2-Piece Sets" ? "Premium woven blend" : "380gsm cotton-polyester blend"],
              ["📐 Fit",    p.gender === "Female" ? "Relaxed feminine cut" : "Modern oversized fit"],
              ["✂️ Care",   "Machine wash cold · Inside out · No tumble dry"],
              ["🚚 Delivery","Lagos 1–3 days · Nationwide 3–7 days"],
            ].map(([label, val]) => (
              <div key={label} style={{ background: T.white, borderRadius: 6, padding: "8px 10px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.gold, marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 12, color: T.muted }}>{val}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: T.sage, fontWeight: 600 }}>
            ✓ Embroidered scripture tag &nbsp;·&nbsp; ✓ Pre-shrunk &nbsp;·&nbsp; ✓ True to size &nbsp;·&nbsp; ✓ Secure packaging
          </div>
          <div style={{ marginTop: 6, fontSize: 12, color: T.muted }}>
            📏 Size guide: XS (6–8) · S (8–10) · M (10–12) · L (12–14) · XL (14–16) · XXL (16–18)
          </div>
        </div>
      </div>
    </div>
  );
}
