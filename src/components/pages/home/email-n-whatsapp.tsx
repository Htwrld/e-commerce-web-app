'use client'

import { useState } from "react"
import { T } from "@/src/lib/tokens"

const EmailNWhatsApp = () => {
    const [emailSub, setEmailSub] = useState("")
    const [subDone, setSubDone] = useState(false)
    const [waNumber, setWaNumber] = useState("")
    const [waDone, setWaDone] = useState(false)

    return (
        <section style={{ padding: "80px 28px", background: T.warm }}>
            <div style={{ maxWidth: 960, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 40 }}>
                    <p className="section-label" style={{ textAlign: "center" }}>
                        STAY CONNECTED
                    </p>
                    <h2
                        className="section-title"
                        style={{ fontSize: "clamp(26px,4vw,40px)", marginBottom: 8 }}
                    >
                        Never Miss a Drop
                    </h2>
                    <div className="divider" style={{ margin: "14px auto 0" }} />
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(380px,1fr))",
                        gap: 24,
                    }}
                >
                    {/* Email */}
                    <div
                        style={{
                            background: T.white,
                            border: `1px solid ${T.border}`,
                            borderRadius: 16,
                            padding: "36px 32px",
                            textAlign: "center",
                        }}
                    >
                        <div style={{ fontSize: 40, marginBottom: 12 }}>📧</div>
                        <p className="section-label" style={{ textAlign: "center" }}>
                            STAY IN THE LOOP
                        </p>
                        <h3
                            style={{
                                fontFamily: "'Cormorant Garamond',serif",
                                fontSize: "clamp(22px,3vw,30px)",
                                fontWeight: 400,
                                margin: "0 0 8px",
                                color: T.ink,
                            }}
                        >
                            Join the HTW Community
                        </h3>
                        <p
                            style={{
                                fontSize: 13,
                                color: T.muted,
                                marginBottom: 20,
                                lineHeight: 1.7,
                            }}
                        >
                            Get early access to drops, exclusive discounts, and weekly devotional
                            style inspiration.
                        </p>
                        {subDone ? (
                            <div
                                style={{
                                    background: `${T.sage}18`,
                                    border: `1px solid ${T.sage}44`,
                                    borderRadius: 8,
                                    padding: 14,
                                    fontSize: 14,
                                    color: T.sage,
                                    fontWeight: 700,
                                }}
                            >
                                ✓ You&rsquo;re in! Welcome to the HTW family 🙏
                            </div>
                        ) : (
                            <div
                                style={{
                                    display: "flex",
                                    borderRadius: 8,
                                    overflow: "hidden",
                                    border: `2px solid ${T.gold}`,
                                }}
                            >
                                <input
                                    type="email"
                                    value={emailSub}
                                    onChange={(e) => setEmailSub(e.target.value)}
                                    placeholder="your@email.com"
                                    style={{
                                        flex: 1,
                                        background: T.cream,
                                        border: "none",
                                        color: T.ink,
                                        padding: "12px 16px",
                                        fontSize: 14,
                                        fontFamily: "'Georgia',serif",
                                    }}
                                />
                                <button
                                    className="btn-primary"
                                    style={{ borderRadius: 0, padding: "0 18px", fontSize: 13 }}
                                    onClick={() => setSubDone(true)}
                                >
                                    Subscribe
                                </button>
                            </div>
                        )}
                    </div>
                    {/* WhatsApp */}
                    <div
                        style={{
                            background: "#EDFAF3",
                            border: "2px solid #25D36644",
                            borderRadius: 16,
                            padding: "36px 32px",
                            textAlign: "center",
                        }}
                    >
                        <div style={{ fontSize: 40, marginBottom: 12 }}>💬</div>
                        <p
                            style={{
                                fontSize: 10,
                                letterSpacing: "0.2em",
                                color: "#1A8A3C",
                                fontWeight: 700,
                                marginBottom: 8,
                            }}
                        >
                            GET LAUNCH UPDATES
                        </p>
                        <h3
                            style={{
                                fontFamily: "'Cormorant Garamond',serif",
                                fontSize: "clamp(22px,3vw,30px)",
                                fontWeight: 400,
                                margin: "0 0 8px",
                                color: T.ink,
                            }}
                        >
                            WhatsApp Updates
                        </h3>
                        <p
                            style={{
                                fontSize: 13,
                                color: T.muted,
                                marginBottom: 20,
                                lineHeight: 1.7,
                            }}
                        >
                            Get new drops, restock alerts, and exclusive offers — straight to your
                            WhatsApp. No spam. Ever.
                        </p>
                        {waDone ? (
                            <div
                                style={{
                                    background: "#D4F0E0",
                                    border: "1px solid #25D36644",
                                    borderRadius: 8,
                                    padding: 14,
                                    fontSize: 14,
                                    color: "#1A8A3C",
                                    fontWeight: 700,
                                }}
                            >
                                ✓ Signed up! We&rsquo;ll send updates soon 🎉
                            </div>
                        ) : (
                            <div>
                                <div
                                    style={{
                                        display: "flex",
                                        borderRadius: 8,
                                        overflow: "hidden",
                                        border: "2px solid #25D366",
                                        marginBottom: 10,
                                    }}
                                >
                                    <input
                                        type="tel"
                                        value={waNumber}
                                        onChange={(e) => setWaNumber(e.target.value)}
                                        placeholder="+234 XXX XXX XXXX"
                                        style={{
                                            flex: 1,
                                            background: T.white,
                                            border: "none",
                                            color: T.ink,
                                            padding: "12px 16px",
                                            fontSize: 14,
                                            fontFamily: "'Georgia',serif",
                                        }}
                                    />
                                    <button
                                        style={{
                                            background: "#25D366",
                                            color: "#fff",
                                            border: "none",
                                            padding: "0 18px",
                                            fontSize: 13,
                                            fontWeight: 700,
                                            cursor: "pointer",
                                            fontFamily: "'Georgia',serif",
                                        }}
                                        onClick={() => setWaDone(true)}
                                    >
                                        Sign Up
                                    </button>
                                </div>
                                <p style={{ fontSize: 11, color: "#888", margin: 0 }}>
                                    By signing up you agree to receive WhatsApp messages from HTW.
                                    Unsubscribe anytime.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EmailNWhatsApp
