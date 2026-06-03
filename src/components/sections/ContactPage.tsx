"use client"

import { useState } from "react"
import { T } from "@/src/lib/tokens"
import { WABtn } from "@/src/components/cards/WABtn"

export function ContactPage() {
    const [sent, setSent] = useState(false)

    const contacts = [
        {
            icon: "💬",
            title: "WhatsApp (Fastest)",
            val: "Chat with us instantly",
            sub: "Our team typically responds within 1 hour",
            color: T.sage,
            action: <WABtn text="Open WhatsApp Chat" />,
        },
        {
            icon: "📧",
            title: "Email",
            val: "hello@hopestrendyworld.com",
            sub: "We respond within 24 hours",
            color: T.cobalt,
            action: null,
        },
        {
            icon: "📍",
            title: "Location",
            val: "Lagos, Nigeria",
            sub: "Shipping nationwide & internationally",
            color: T.gold,
            action: null,
        },
        {
            icon: "📱",
            title: "Social Media",
            val: "@HopesTrendyWorld",
            sub: "Instagram · TikTok · Facebook",
            color: T.rust,
            action: null,
        },
    ]

    const fields = [
        { l: "Your Name", p: "Full name", t: "text" },
        { l: "Email Address", p: "your@email.com", t: "email" },
        { l: "Subject", p: "How can we help?", t: "text" },
    ]

    return (
        <div>
            <section
                style={{
                    background: "linear-gradient(135deg,#FDF0DC,#F5D898)",
                    padding: "72px 28px",
                    textAlign: "center",
                }}
            >
                <p className="section-label">GET IN TOUCH</p>
                <h1
                    className="section-title"
                    style={{ fontSize: "clamp(32px,6vw,56px)", marginBottom: 12 }}
                >
                    Contact Us
                </h1>
                <p style={{ fontSize: 15, color: T.muted }}>We&rsquo;d love to hear from you.</p>
            </section>

            <div
                style={{
                    maxWidth: 1000,
                    margin: "0 auto",
                    padding: "72px 28px",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
                    gap: 40,
                }}
            >
                {/* Contact info */}
                <div>
                    <h2
                        style={{
                            fontFamily: "'Cormorant Garamond',serif",
                            fontSize: 28,
                            fontWeight: 600,
                            marginBottom: 20,
                            color: T.ink,
                        }}
                    >
                        Reach Us Directly
                    </h2>
                    {contacts.map((c, i) => (
                        <div
                            key={i}
                            style={{
                                background: T.white,
                                border: `1px solid ${T.border}`,
                                borderRadius: 12,
                                padding: "18px 20px",
                                marginBottom: 12,
                                display: "flex",
                                gap: 14,
                                alignItems: "flex-start",
                            }}
                        >
                            <div style={{ fontSize: 28, flexShrink: 0 }}>{c.icon}</div>
                            <div style={{ flex: 1 }}>
                                <div
                                    style={{
                                        fontSize: 12,
                                        color: c.color,
                                        fontWeight: 700,
                                        letterSpacing: "0.06em",
                                        marginBottom: 3,
                                    }}
                                >
                                    {c.title}
                                </div>
                                <div
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                        color: T.ink,
                                        marginBottom: 2,
                                    }}
                                >
                                    {c.val}
                                </div>
                                <div
                                    style={{
                                        fontSize: 12,
                                        color: T.muted,
                                        marginBottom: c.action ? 10 : 0,
                                    }}
                                >
                                    {c.sub}
                                </div>
                                {c.action}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact form */}
                <div>
                    <h2
                        style={{
                            fontFamily: "'Cormorant Garamond',serif",
                            fontSize: 28,
                            fontWeight: 600,
                            marginBottom: 20,
                            color: T.ink,
                        }}
                    >
                        Send a Message
                    </h2>
                    {sent ? (
                        <div
                            style={{
                                textAlign: "center",
                                padding: "48px 24px",
                                background: `${T.gold}14`,
                                border: `2px solid ${T.gold}44`,
                                borderRadius: 14,
                            }}
                        >
                            <div style={{ fontSize: 52, marginBottom: 14 }}>🙏</div>
                            <h3
                                style={{
                                    fontFamily: "'Cormorant Garamond',serif",
                                    fontSize: 22,
                                    fontWeight: 600,
                                    marginBottom: 8,
                                }}
                            >
                                Message Sent!
                            </h3>
                            <p style={{ fontSize: 14, color: T.muted }}>
                                We&rsquo;ll be in touch within 24 hours. Thank you for reaching out!
                            </p>
                        </div>
                    ) : (
                        <div
                            style={{
                                background: T.white,
                                border: `1px solid ${T.border}`,
                                borderRadius: 14,
                                padding: "28px 24px",
                            }}
                        >
                            {fields.map((f, i) => (
                                <div key={i} style={{ marginBottom: 14 }}>
                                    <label
                                        style={{
                                            fontSize: 12,
                                            color: T.gold,
                                            fontWeight: 700,
                                            letterSpacing: "0.07em",
                                            display: "block",
                                            marginBottom: 5,
                                        }}
                                    >
                                        {f.l}
                                    </label>
                                    <input
                                        type={f.t}
                                        placeholder={f.p}
                                        style={{
                                            width: "100%",
                                            background: T.warm,
                                            border: `1.5px solid ${T.border}`,
                                            color: T.ink,
                                            padding: "11px 14px",
                                            fontSize: 14,
                                            borderRadius: 7,
                                        }}
                                    />
                                </div>
                            ))}
                            <div style={{ marginBottom: 16 }}>
                                <label
                                    style={{
                                        fontSize: 12,
                                        color: T.gold,
                                        fontWeight: 700,
                                        letterSpacing: "0.07em",
                                        display: "block",
                                        marginBottom: 5,
                                    }}
                                >
                                    Message
                                </label>
                                <textarea
                                    placeholder="Tell us what's on your mind…"
                                    rows={4}
                                    style={{
                                        width: "100%",
                                        background: T.warm,
                                        border: `1.5px solid ${T.border}`,
                                        color: T.ink,
                                        padding: "11px 14px",
                                        fontSize: 14,
                                        borderRadius: 7,
                                        resize: "vertical",
                                    }}
                                />
                            </div>
                            <button
                                className="btn-primary"
                                style={{ width: "100%", justifyContent: "center" }}
                                onClick={() => setSent(true)}
                            >
                                Send Message →
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
