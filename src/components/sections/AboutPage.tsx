"use client";

import { T } from "@/src/lib/tokens";
import { useNav } from "@/src/lib/nav-context";

export function AboutPage() {
  const { navTo } = useNav();

  const sections = [
    { title:"Why We Exist",        color:T.rust,   text:"We exist at the intersection of faith and fashion. HTW was founded on the belief that clothing is not neutral — it communicates identity. We design pieces that reflect your values and carry a message that transcends trends." },
    { title:"Our Product Range",   color:T.cobalt, text:"From premium sweatshirts and hoodies to comfort-first joggers, sharp polos, everyday graphic tees, and our signature 2-piece sets — every HTW piece is designed with intention. Quality you can feel. Faith you can wear." },
    { title:"Faith at the Centre", color:T.sage,   text:"HTW is proudly faith-based. We don't just add scripture to tags — we build entire collections around them. Each seasonal drop is inspired by a biblical theme. Every product description carries the verse that gave it life." },
    { title:"Our Community",       color:T.gold,   text:"From Lagos to London, Port Harcourt to Toronto — the HTW community refuses to blend in. Our ambassadors aren't just brand partners; they are kingdom representatives spreading the message through every outfit they wear." },
    { title:"Our Vision",          color:T.rust,   text:"To become Africa's most intentional faith-fashion brand — not just a clothing store, but a global movement for bold living. A brand people choose not because it's trendy, but because it means something." },
  ];

  return (
    <div>
      <section style={{ background: "linear-gradient(135deg,#DCF0E6,#A8D8BC)", padding: "88px 28px", textAlign: "center" }}>
        <p className="section-label" style={{ color: T.sage }}>OUR STORY</p>
        <h1 className="section-title" style={{ fontSize: "clamp(36px,7vw,66px)", marginBottom: 16 }}>Dressed for the Kingdom</h1>
        <p style={{ fontFamily: "'EB Garamond',serif", fontSize: "clamp(16px,2.5vw,22px)", fontStyle: "italic", color: "#444", maxWidth: 560, margin: "0 auto" }}>
          &ldquo;She is clothed with strength and dignity.&rdquo; — Proverbs 31:25
        </p>
      </section>

      <section style={{ maxWidth: 860, margin: "0 auto", padding: "80px 28px" }}>
        <div style={{ marginBottom: 56, textAlign: "center" }}>
          <p className="section-label" style={{ textAlign: "center" }}>IN OUR OWN WORDS</p>
          <div className="divider" style={{ margin: "12px auto 24px" }} />
          <p style={{ fontFamily: "'EB Garamond',serif", fontSize: "clamp(18px,3vw,26px)", fontStyle: "italic", color: T.charcoal, lineHeight: 1.8, margin: 0 }}>
            &ldquo;Hope&rsquo;s Trendy World was born to inspire confidence, faith, and bold living through fashion — because we believe your identity should never be just what you wear, but why you wear it.&rdquo;
          </p>
        </div>

        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom: 48, display: "grid", gridTemplateColumns: "4px 1fr", gap: 20, alignItems: "start" }}>
            <div style={{ background: s.color, width: 4, height: "100%", borderRadius: 2, marginTop: 6 }} />
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(20px,3vw,28px)", fontWeight: 600, margin: "0 0 12px", color: s.color }}>{s.title}</h2>
              <p style={{ fontSize: "clamp(14px,1.8vw,16px)", color: T.muted, lineHeight: 2, margin: 0, fontFamily: "'EB Garamond',serif" }}>{s.text}</p>
            </div>
          </div>
        ))}

        <div style={{ background: `linear-gradient(135deg,${T.goldPale},#FFE8B8)`, border: `2px solid ${T.gold}44`, borderRadius: 16, padding: 40, textAlign: "center", marginTop: 56 }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>✝</div>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 30, fontWeight: 600, color: T.ink, margin: "0 0 12px" }}>
            This is more than fashion.<br />This is a movement.
          </h3>
          <p style={{ fontFamily: "'EB Garamond',serif", fontSize: 20, fontStyle: "italic", color: T.charcoal, margin: "0 0 10px", lineHeight: 1.7 }}>
            &ldquo;To make faith fashionable, and fashion faithful.&rdquo;
          </p>
          <p style={{ fontSize: 13, color: T.muted }}>Headquartered in Nigeria 🇳🇬 · Shipping Worldwide 🌍</p>
          <div style={{ marginTop: 24 }}>
            <button className="btn-primary" onClick={() => navTo("shop")}>Shop the Movement →</button>
          </div>
        </div>
      </section>
    </div>
  );
}
