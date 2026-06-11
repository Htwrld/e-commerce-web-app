'use client'

import { T } from "@/src/lib/tokens"
import { useState } from "react"

const FAQS = [
    {
        q: "What sizes do you carry?",
        a: "All HTW pieces come in XS, S, M, L, XL, and XXL. Check the size guide on each product page for measurements. When in doubt, size up — our pieces are designed with a modern relaxed fit.",
    },
    {
        q: "How long does delivery take?",
        a: "Lagos: 1–3 business days (free on orders ₦50,000+). Nationwide: 3–7 business days. International (UK, US, Canada): 7–14 business days. You'll get a tracking update via WhatsApp once your order ships.",
    },
    {
        q: "What is your return policy?",
        a: "We accept returns within 14 days of delivery. Items must be unworn and in original packaging with tags attached. Contact us via WhatsApp with your order number to start a return.",
    },
    {
        q: "What fabrics do you use?",
        a: "Our hoodies and sweatshirts are 380gsm premium cotton-polyester blend — thick, soft, and built to last. Tees and polos are 100% combed ringspun cotton. 2-piece sets vary by design.",
    },
    {
        q: "Can I order via WhatsApp?",
        a: "Absolutely — in fact it's one of our most popular order methods. Just tap the WhatsApp button on any product page or use the floating button, and our team will process your order directly.",
    },
    {
        q: "Do you ship internationally?",
        a: "Yes! We ship to the UK, USA, Canada, Europe, and more. International customers can pay via Flutterwave using USD or GBP. Delivery takes 7–14 business days.",
    },
    {
        q: "Are the scripture verses printed or embroidered?",
        a: "Depending on the piece — graphic tees use high-quality screen printing, while premium sweatshirts and hoodies use embroidered verse tags. Details are listed on each product page.",
    },
]


const FAQSection = () => {
    const [faqOpen, setFaqOpen] = useState<number | null>(null)
    return (
        <section style={{ background: T.cream, padding: "80px 28px" }}>
            <div style={{ maxWidth: 760, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 44 }}>
                    <p className="section-label">GOT QUESTIONS?</p>
                    <h2
                        className="section-title"
                        style={{ fontSize: "clamp(26px,4vw,42px)", marginBottom: 8 }}
                    >
                        Frequently Asked Questions
                    </h2>
                    <div className="divider" style={{ margin: "14px auto" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {FAQS.map((f, i) => (
                        <div
                            key={i}
                            style={{
                                background: T.white,
                                border: `1px solid ${T.border}`,
                                borderRadius: 10,
                                overflow: "hidden",
                            }}
                        >
                            <button
                                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                                style={{
                                    width: "100%",
                                    background: "none",
                                    border: "none",
                                    padding: "16px 20px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    textAlign: "left",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 700,
                                        color: T.ink,
                                        fontFamily: "'Georgia',serif",
                                    }}
                                >
                                    {f.q}
                                </span>
                                <span
                                    style={{
                                        fontSize: 20,
                                        color: T.gold,
                                        flexShrink: 0,
                                        marginLeft: 12,
                                        transition: "transform 0.3s",
                                        transform: faqOpen === i ? "rotate(45deg)" : "rotate(0)",
                                    }}
                                >
                                    +
                                </span>
                            </button>
                            {faqOpen === i && (
                                <div
                                    style={{
                                        padding: "0 20px 16px",
                                        borderTop: `1px solid ${T.border}`,
                                    }}
                                >
                                    <p
                                        style={{
                                            fontSize: 14,
                                            color: T.muted,
                                            lineHeight: 1.8,
                                            margin: "12px 0 0",
                                        }}
                                    >
                                        {f.a}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FAQSection
