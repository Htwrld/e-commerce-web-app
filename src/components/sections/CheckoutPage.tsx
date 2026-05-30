"use client";

import { useState } from "react";
import Image from "next/image";
import { T } from "@/lib/tokens";
import { useCart } from "@/lib/cart-context";
import { useNav } from "@/lib/nav-context";
import { WABtn } from "@/components/ui/WABtn";

export function CheckoutPage() {
  const { cart, cartTotal } = useCart();
  const { navTo } = useNav();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name:"", address:"", phone:"", payment:"paystack" });

  const PAYMENT_METHODS = [
    { k:"paystack",    l:"Paystack",             desc:"Pay with card or bank transfer via Paystack" },
    { k:"flutterwave", l:"Flutterwave",           desc:"Pay with card, mobile money, or bank" },
    { k:"transfer",    l:"Direct Bank Transfer",  desc:"Transfer directly to our account" },
    { k:"whatsapp",    l:"WhatsApp Order",        desc:"Complete your order via WhatsApp chat" },
  ];

  const DELIVERY_FIELDS = [
    { k:"name",    l:"Full Name",         p:"Your full name",        t:"text" },
    { k:"address", l:"Delivery Address",  p:"Street, City, State",   t:"text" },
    { k:"phone",   l:"Phone Number",      p:"+234 000 000 0000",      t:"tel" },
  ] as const;

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "44px 28px" }}>
      <div style={{ marginBottom: 32 }}>
        <p className="section-label">CHECKOUT</p>
        <h1 className="section-title" style={{ fontSize: "clamp(26px,4vw,40px)" }}>Complete Your Order</h1>
        <div className="divider" />
      </div>

      {/* Steps */}
      <div style={{ display: "flex", gap: 0, marginBottom: 36 }}>
        {["Delivery Details","Payment","Confirmation"].map((s, i) => (
          <div key={s} style={{ flex: 1, textAlign: "center", position: "relative" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: step > i ? T.sage : step === i + 1 ? T.gold : T.border, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, margin: "0 auto 6px" }}>
              {step > i ? "✓" : i + 1}
            </div>
            <div style={{ fontSize: 11, color: step === i + 1 ? T.gold : step > i ? T.sage : T.muted, fontWeight: 700, letterSpacing: "0.06em" }}>{s.toUpperCase()}</div>
            {i < 2 && <div style={{ position: "absolute", top: 16, left: "50%", right: 0, height: 2, background: step > i + 1 ? T.sage : T.border, zIndex: -1 }} />}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 28, alignItems: "start" }}>
        <div>
          {/* Step 1: Delivery */}
          {step === 1 && (
            <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 14, padding: "28px 24px" }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 600, marginBottom: 20 }}>Delivery Details</h3>
              {DELIVERY_FIELDS.map(f => (
                <div key={f.k} style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, color: T.gold, fontWeight: 700, letterSpacing: "0.07em", display: "block", marginBottom: 5 }}>{f.l}</label>
                  <input type={f.t} value={form[f.k]} onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))} placeholder={f.p}
                    style={{ width: "100%", background: T.warm, border: `1.5px solid ${T.border}`, color: T.ink, padding: "12px 16px", fontSize: 14, borderRadius: 8 }} />
                </div>
              ))}
              <button className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={() => setStep(2)}>Continue to Payment →</button>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 14, padding: "28px 24px" }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 600, marginBottom: 20 }}>Payment Method</h3>
              {PAYMENT_METHODS.map(pm => (
                <div key={pm.k} onClick={() => setForm(f => ({ ...f, payment: pm.k }))}
                  style={{ background: form.payment === pm.k ? `${T.gold}14` : T.warm, border: `2px solid ${form.payment === pm.k ? T.gold : T.border}`, borderRadius: 10, padding: "14px 16px", marginBottom: 10, cursor: "pointer", transition: "all .2s" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: T.ink }}>{pm.l}</div>
                  <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{pm.desc}</div>
                </div>
              ))}
              <p style={{ fontSize: 12, color: T.sage, marginTop: 14, fontWeight: 600 }}>🔒 Secure checkout · Your payment details are encrypted</p>
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setStep(1)}>← Back</button>
                <button className="btn-primary" style={{ flex: 2, justifyContent: "center" }} onClick={() => setStep(3)}>Place Order →</button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div style={{ textAlign: "center", padding: "52px 28px", background: `${T.sage}12`, border: `2px solid ${T.sage}44`, borderRadius: 16 }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 700, color: T.ink, marginBottom: 10 }}>Order Confirmed!</h2>
              <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.8, marginBottom: 20 }}>Thank you for your order! We&rsquo;ll confirm via WhatsApp and send tracking details within 24 hours.</p>
              <WABtn text="Track Order on WhatsApp" />
              <div style={{ marginTop: 20 }}>
                <button className="btn-outline-gold" onClick={() => navTo("home")}>Continue Shopping →</button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div style={{ minWidth: 280, maxWidth: 320 }}>
          <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 14, padding: "22px 20px" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 600, marginBottom: 18, borderBottom: `1px solid ${T.border}`, paddingBottom: 12 }}>Order Summary</h3>
            {cart.map(item => (
              <div key={item.id} style={{ display: "flex", gap: 10, marginBottom: 12, paddingBottom: 12, borderBottom: `1px solid ${T.sand}` }}>
                <div style={{ width: 44, height: 44, borderRadius: 8, background: item.bg, overflow: "hidden", flexShrink: 0, position: "relative" }}>
                  {item.img ? (
                    <Image src={item.img} alt={item.name} fill style={{ objectFit: "cover", objectPosition: "center top" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>👕</div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: T.muted }}>Qty: {item.qty}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.rust }}>{item.price}</div>
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: T.muted }}>Subtotal</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>₦{cartTotal.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: T.muted }}>Delivery</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: T.sage }}>{cartTotal > 0 ? "₦1,500" : "—"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: `2px solid ${T.border}`, paddingTop: 10, marginTop: 4 }}>
                <span style={{ fontSize: 15, fontWeight: 700 }}>Total</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: T.rust }}>₦{(cartTotal + 1500).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
