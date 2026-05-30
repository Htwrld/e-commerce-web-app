"use client";

import { T } from "@/src/lib/tokens";
import { useNav, PageId } from "@/src/lib/nav-context";
import { WABtn } from "@/src/components/cards/WABtn";

export function Footer() {
  const { navTo } = useNav();

  return (
    <footer style={{ background: T.charcoal, color: "#B0A898", padding: "60px 28px 28px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 40, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <div style={{ fontSize: 9, letterSpacing: "0.3em", color: T.gold, fontFamily: "monospace", fontWeight: 700, marginBottom: 6 }}>HOPE&rsquo;S TRENDY WORLD</div>
            <div style={{ fontSize: 34, fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, color: "#fff", marginBottom: 12 }}>HTW</div>
            <p style={{ fontSize: 13, lineHeight: 1.8, marginBottom: 16, color: "#888" }}>Faith-inspired fashion for bold living. Scripture in every stitch.</p>
            <div style={{ fontStyle: "italic", fontFamily: "'EB Garamond',serif", fontSize: 14, color: T.gold, marginBottom: 16 }}>&ldquo;You were made to stand out.&rdquo;</div>
            <div style={{ display: "flex", gap: 14 }}>
              {["📘","📸","▶️","🎵"].map(s => <span key={s} style={{ fontSize: 20, cursor: "pointer", opacity: 0.65 }}>{s}</span>)}
            </div>
          </div>

          {/* Shop */}
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.14em", color: T.gold, marginBottom: 16, fontWeight: 700 }}>SHOP</div>
            {["New Arrivals","Best Sellers","Sweatshirts","Hoodies","Joggers","Polos & Tees","2-Piece Sets","Size Guide"].map(l => (
              <div key={l} onClick={() => navTo("shop")} style={{ fontSize: 13, color: "#888", marginBottom: 9, cursor: "pointer", transition: "color .2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = "#888"}
              >{l}</div>
            ))}
          </div>

          {/* Info */}
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.14em", color: T.gold, marginBottom: 16, fontWeight: 700 }}>INFO</div>
            {([["about","Our Story"],["ambassadors","Ambassadors"],["contact","Contact Us"],["policy","Shipping Policy"],["policy","Return Policy"],["policy","Privacy Policy"]] as [PageId, string][]).map(([p, l]) => (
              <div key={l} onClick={() => navTo(p)} style={{ fontSize: 13, color: "#888", marginBottom: 9, cursor: "pointer", transition: "color .2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = "#888"}
              >{l}</div>
            ))}
          </div>

          {/* Support */}
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.14em", color: T.gold, marginBottom: 16, fontWeight: 700 }}>ORDER SUPPORT</div>
            <WABtn text="Chat on WhatsApp" />
            <div style={{ marginTop: 18 }}>
              <div style={{ fontSize: 12, color: "#888", marginBottom: 10, fontWeight: 600 }}>💳 Accepted Payments</div>
              {["Paystack","Flutterwave","Bank Transfer","Visa / Mastercard"].map(p => (
                <div key={p} style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>· {p}</div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #3A3530", paddingTop: 22, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 12, color: "#555" }}>© 2026 Hope&rsquo;s Trendy World. All rights reserved.</div>
          <div style={{ fontSize: 12, color: "#555", fontStyle: "italic" }}>&ldquo;Dressed for the kingdom.&rdquo; &nbsp;·&nbsp; Made in Nigeria 🇳🇬</div>
        </div>
      </div>
    </footer>
  );
}
