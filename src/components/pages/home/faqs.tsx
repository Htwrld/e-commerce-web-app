"use client"

import { T } from "@/src/lib/tokens"
import { useState } from "react"

interface FAQ {
    question: string
    answer: string
}

const FAQSection = ({ faqs }: { faqs: FAQ[] }) => {
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
                    {faqs.map((f, i) => (
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
                                    {f.question}
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
                                        {f.answer}
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
