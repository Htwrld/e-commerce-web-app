"use client"

import { useState } from "react"
import { T } from "@/src/lib/tokens"
import { Ambassador } from "@/src/action/ambassadorController"
import Image from "next/image"

type AmbassadorStrip = {
    icon: string
    ambassador_benefit_title: string
    ambassador_benefit_description: string
    color: string
}

type PageContent = {
    title: string
    bible_verse: string
    page_description: string
    ambassador_benefits_title: string
    ambassadorsStrip: AmbassadorStrip[]
}

export const AmbassadorsPage = ({
    pageContent,
    ambassadors,
}: {
    pageContent: PageContent
    ambassadors: Ambassador[]
}) => {
    const [form, setForm] = useState({ name: "", email: "", city: "", ig: "" })
    const [formSent, setFormSent] = useState(false)

    const fields = [
        { k: "name", l: "Full Name", p: "Your name", t: "text" },
        { k: "email", l: "Email Address", p: "your@email.com", t: "email" },
        { k: "city", l: "City / Country", p: "Lagos, Nigeria", t: "text" },
        { k: "ig", l: "Instagram / TikTok Handle", p: "@yourhandle", t: "text" },
    ] as const

    return (
        <div>
            <section
                style={{
                    background: "linear-gradient(135deg,#DCE8F5,#A8C4E8)",
                    padding: "88px 28px",
                    textAlign: "center",
                }}
            >
                <p className="section-label" style={{ color: T.cobalt }}>
                    JOIN THE MOVEMENT
                </p>
                <h1
                    className="section-title"
                    style={{ fontSize: "clamp(32px,6vw,58px)", marginBottom: 16 }}
                >
                    Become an HTW Ambassador
                </h1>
                <p
                    style={{
                        fontFamily: "'EB Garamond',serif",
                        fontSize: "clamp(15px,2vw,20px)",
                        fontStyle: "italic",
                        color: "#444",
                        maxWidth: 580,
                        margin: "0 auto",
                    }}
                >
                    &ldquo;You are the light of the world… let your light shine before
                    others.&rdquo; — Matthew 5:14-16
                </p>
                <p
                    style={{
                        fontSize: 14,
                        color: "#666",
                        marginTop: 10,
                        maxWidth: 500,
                        margin: "10px auto 0",
                    }}
                >
                    This isn&rsquo;t just a brand partnership. It&rsquo;s a kingdom assignment.
                </p>
            </section>

            <div style={{ maxWidth: 1160, margin: "0 auto", padding: "80px 28px" }}>
                {/* Benefits */}
                <div style={{ textAlign: "center", marginBottom: 44 }}>
                    <p className="section-label">AMBASSADOR BENEFITS</p>
                    <h2 className="section-title" style={{ fontSize: "clamp(26px,4vw,42px)" }}>
                        What You Get
                    </h2>
                    <div className="divider" style={{ margin: "14px auto" }} />
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
                        gap: 16,
                        marginBottom: 72,
                    }}
                >
                    {pageContent.ambassadorsStrip.map((b, i) => (
                        <div
                            key={i}
                            className="card"
                            style={{
                                background: `${b.color}12`,
                                border: `2px solid ${b.color}33`,
                                borderRadius: 14,
                                padding: "26px 20px",
                                textAlign: "center",
                            }}
                        >
                            <div style={{ fontSize: 38, marginBottom: 12 }}>{b.icon}</div>
                            <h3
                                style={{
                                    fontFamily: "'Cormorant Garamond',serif",
                                    fontSize: 19,
                                    fontWeight: 600,
                                    color: T.ink,
                                    marginBottom: 8,
                                }}
                            >
                                {b.ambassador_benefit_title}
                            </h3>
                            <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.7, margin: 0 }}>
                                {b.ambassador_benefit_description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Meet Ambassadors */}
                <div style={{ marginBottom: 72 }}>
                    <div style={{ textAlign: "center", marginBottom: 36 }}>
                        <p className="section-label">OUR TEAM</p>
                        <h2 className="section-title" style={{ fontSize: "clamp(24px,4vw,38px)" }}>
                            Meet Our Ambassadors
                        </h2>
                        <div className="divider" style={{ margin: "14px auto" }} />
                    </div>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
                            gap: 14,
                        }}
                    >
                        {ambassadors.map((a, i) => (
                            <div
                                key={i}
                                className="card"
                                style={{
                                    background: `${a.color}12`,
                                    border: `2px solid ${a.color}33`,
                                    borderRadius: 14,
                                    padding: "26px 22px",
                                }}
                            >
                                <div className="h-12 w-12 overflow-hidden rounded-sm border p-1">
                                    <Image
                                        src={a.photo}
                                        alt={a.name}
                                        height={120}
                                        width={120}
                                        className="h-full w-full rounded-sm object-cover object-center"
                                        onError={(e) =>
                                            ((e.currentTarget as HTMLImageElement).style.display =
                                                "none")
                                        }
                                    />
                                </div>
                                <h3
                                    style={{
                                        fontFamily: "'Cormorant Garamond',serif",
                                        fontSize: 20,
                                        fontWeight: 600,
                                        color: T.ink,
                                        marginBottom: 2,
                                    }}
                                >
                                    {a.name}
                                </h3>
                                <div className="flex items-center justify-between">
                                    <div
                                        style={{
                                            fontSize: 13,
                                            color: a.color,
                                            fontWeight: 700,
                                            marginBottom: 4,
                                        }}
                                    >
                                        @{a.social_handle}
                                    </div>
                                    <div style={{ fontSize: 12, color: T.muted, marginBottom: 10 }}>
                                        {a.city}
                                    </div>
                                </div>
                                <p
                                    style={{
                                        fontFamily: "'EB Garamond',serif",
                                        fontSize: 14,
                                        fontStyle: "italic",
                                        color: T.charcoal,
                                        lineHeight: 1.7,
                                        margin: 0,
                                    }}
                                >
                                    {a.quote}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Application Form */}
                <div style={{ maxWidth: 560, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 30 }}>
                        <p className="section-label">APPLICATIONS</p>
                        <h2
                            className="section-title"
                            style={{ fontSize: "clamp(24px,4vw,38px)", marginBottom: 8 }}
                        >
                            Apply to Join
                        </h2>
                        <p style={{ fontSize: 14, color: T.muted }}>
                            Our team will respond within 48 hours.
                        </p>
                    </div>
                    {formSent ? (
                        <div
                            style={{
                                textAlign: "center",
                                padding: "52px 28px",
                                background: `${T.sage}14`,
                                border: `2px solid ${T.sage}44`,
                                borderRadius: 16,
                            }}
                        >
                            <div style={{ fontSize: 56, marginBottom: 14 }}>🙌🏾</div>
                            <h3
                                style={{
                                    fontFamily: "'Cormorant Garamond',serif",
                                    fontSize: 26,
                                    fontWeight: 600,
                                    color: T.ink,
                                    marginBottom: 8,
                                }}
                            >
                                Application Received!
                            </h3>
                            <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.7 }}>
                                We&rsquo;ll review your application and get back to you within 48
                                hours. Welcome to the HTW family!
                            </p>
                        </div>
                    ) : (
                        <div
                            style={{
                                background: T.white,
                                border: `1px solid ${T.border}`,
                                borderRadius: 16,
                                padding: "36px 30px",
                                boxShadow: "0 6px 32px rgba(0,0,0,0.07)",
                            }}
                        >
                            {fields.map((f) => (
                                <div key={f.k} style={{ marginBottom: 18 }}>
                                    <label
                                        style={{
                                            fontSize: 12,
                                            color: T.gold,
                                            letterSpacing: "0.08em",
                                            display: "block",
                                            marginBottom: 6,
                                            fontWeight: 700,
                                        }}
                                    >
                                        {f.l}
                                    </label>
                                    <input
                                        type={f.t}
                                        value={form[f.k]}
                                        onChange={(e) =>
                                            setForm((p) => ({ ...p, [f.k]: e.target.value }))
                                        }
                                        placeholder={f.p}
                                        style={{
                                            width: "100%",
                                            background: T.warm,
                                            border: `1.5px solid ${T.border}`,
                                            color: T.ink,
                                            padding: "12px 16px",
                                            fontSize: 14,
                                            borderRadius: 8,
                                            transition: "border-color .2s",
                                        }}
                                    />
                                </div>
                            ))}
                            <button
                                className="btn-primary"
                                style={{
                                    width: "100%",
                                    justifyContent: "center",
                                    padding: 14,
                                    fontSize: 14,
                                    marginTop: 6,
                                }}
                                onClick={() => setFormSent(true)}
                            >
                                Submit Application ✝
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
