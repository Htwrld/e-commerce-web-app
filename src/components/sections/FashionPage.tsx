"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { T } from "@/src/lib/tokens"
import { sendMail } from "@/src/action/mailController"
import {
    FaBookOpen,
    FaHeart,
    FaTshirt,
    FaUsers,
    FaChevronRight,
    FaFacebookF,
    FaInstagram,
    FaTiktok,
} from "react-icons/fa"

const FEATURED_STORIES = [
    {
        tag: "STYLE GUIDE",
        title: "5 Ways to Style Ankara for Every Occasion",
        desc: "Versatile looks that take you from work to worship and everywhere in between.",
        img: "/images/hoodie_lifestyle.png",
    },
    {
        tag: "WARDROBE",
        title: "Building a Faith-Fueled Wardrobe",
        desc: "Essential pieces that blend modesty, elegance and everyday confidence.",
        img: "/images/polo_twopiece.jpg",
    },
    {
        tag: "BEHIND THE SCENES",
        title: "Crafted with Purpose",
        desc: "Go behind the seams and see how our pieces are designed with care, prayer, and precision.",
        img: "/images/tee_she.jpg",
    },
    {
        tag: "TREND SPOTLIGHT",
        title: "This Season's Must-Have Prints",
        desc: "The prints, colors and silhouettes making a statement this season.",
        img: "/images/polo_twopiece.jpg",
    },
]

const FASHION_STYLING = [
    {
        title: "Style Guides & Tips",
        desc: "Practical tips to help you look and feel your best.",
        img: "/images/hoodie_lifestyle.png",
    },
    {
        title: "Modest Fashion",
        desc: "Beautiful, modest fashion for every season.",
        img: "/images/polo_twopiece.jpg",
    },
    {
        title: "Trends & Inspiration",
        desc: "Stay inspired with the latest trends and timeless looks.",
        img: "/images/tee_she.jpg",
    },
]

const INTERVIEWS = [
    {
        title: "Ambassador Stories",
        desc: "Meet our brand ambassadors and their journeys of faith.",
        img: "/images/hoodie_lifestyle.png",
    },
    {
        title: "Designer Spotlight",
        desc: "Conversations with creatives shaping faith-inspired fashion.",
        img: "/images/polo_twopiece.jpg",
    },
    {
        title: "Voices That Inspire",
        desc: "Real stories. Real impact. Real purpose.",
        img: "/images/tee_she.jpg",
    },
]

const EDITIONS = [
    { q: "Q3 2026", issue: "Issue 02", title: "The Confidence Edit", eta: "Coming Sep 2026" },
    { q: "Q4 2026", issue: "Issue 03", title: "The Purpose Issue", eta: "Coming Dec 2026" },
    { q: "Q1 2027", issue: "Issue 04", title: "The Celebration Issue", eta: "Coming Mar 2027" },
]

const WHY_CARDS = [
    {
        icon: <FaHeart />,
        title: "Faith-Centered",
        desc: "Every story is rooted in truth and designed to uplift your spirit.",
    },
    {
        icon: <FaTshirt />,
        title: "Fashion with Purpose",
        desc: "Discover styles and trends that reflect identity, culture and conviction.",
    },
    {
        icon: <FaUsers />,
        title: "Real Stories",
        desc: "Inspiring interviews and features from people living out their purpose.",
    },
]

export const FashionPage = () => {
    const [tab, setTab] = useState<"email" | "whatsapp">("email")
    const [email, setEmail] = useState("")
    const [wa, setWa] = useState("")
    const [done, setDone] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubscribe = async () => {
        if (tab === "email" && !email) return
        if (tab === "whatsapp" && !wa) return
        try {
            setLoading(true)
            await sendMail({
                to: "host",
                subject:
                    tab === "email"
                        ? "I want to subscribe to HTW Fashion Magazine"
                        : "I want WhatsApp updates for HTW Fashion Magazine",
                body:
                    tab === "email"
                        ? `Please subscribe my email address to HTW Fashion Magazine: ${email}.`
                        : `Please subscribe my WhatsApp number to HTW Fashion Magazine updates: ${wa}.`,
                replyTo: tab === "email" ? email : undefined,
                name: "",
            })
            setDone(true)
            setEmail("")
            setWa("")
        } catch (error) {
            return
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            {/* Hero */}
            <section style={{ padding: "72px 28px", background: T.cream, overflow: "hidden" }}>
                <div
                    style={{
                        maxWidth: 1160,
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "minmax(260px,420px) 1fr",
                        gap: 56,
                        alignItems: "center",
                    }}
                    className="max-md:!grid-cols-1"
                >
                    {/* Magazine cover mockup */}
                    <div
                        style={{
                            position: "relative",
                            aspectRatio: "3/4",
                            borderRadius: 10,
                            overflow: "hidden",
                            boxShadow: "0 30px 70px rgba(26,22,18,0.28)",
                            background: T.ink,
                        }}
                    >
                        <Image
                            src="/images/hoodie_lifestyle.png"
                            alt="HTW Fashion Magazine, Volume 1, Issue 1"
                            fill
                            style={{ objectFit: "cover", opacity: 0.75 }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background:
                                    "linear-gradient(180deg,rgba(26,22,18,0.55) 0%,rgba(26,22,18,0.1) 30%,rgba(26,22,18,0.15) 60%,rgba(26,22,18,0.75) 100%)",
                                padding: 24,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <div>
                                    <div
                                        style={{
                                            fontFamily: "'Cormorant Garamond',serif",
                                            fontSize: 30,
                                            fontWeight: 700,
                                            color: "#fff",
                                            lineHeight: 1,
                                        }}
                                    >
                                        HTW
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 10,
                                            letterSpacing: "0.3em",
                                            color: "#fff",
                                            opacity: 0.85,
                                            marginTop: 2,
                                        }}
                                    >
                                        FASHION
                                    </div>
                                </div>
                                <div style={{ textAlign: "right", fontSize: 9, color: "#fff", opacity: 0.8, letterSpacing: "0.08em" }}>
                                    VOL 01 | ISSUE 01
                                </div>
                            </div>
                            <div>
                                <div
                                    style={{
                                        fontFamily: "'Cormorant Garamond',serif",
                                        fontSize: 20,
                                        color: "#fff",
                                        fontWeight: 600,
                                        marginBottom: 4,
                                    }}
                                >
                                    Bold Faith. Timeless Style.
                                </div>
                                <div style={{ fontSize: 11, color: "#fff", opacity: 0.75, marginBottom: 18 }}>
                                    Ankara Reimagined — modern silhouettes, heritage prints.
                                </div>
                                <div
                                    style={{
                                        fontFamily: "'Cormorant Garamond',serif",
                                        fontSize: 27,
                                        fontWeight: 700,
                                        color: "#fff",
                                        lineHeight: 1.08,
                                        textTransform: "uppercase",
                                    }}
                                >
                                    Rooted In Faith.
                                    <br />
                                    Styled For Greatness.
                                </div>
                                <div
                                    style={{
                                        marginTop: 16,
                                        paddingTop: 12,
                                        borderTop: "1px solid rgba(255,255,255,0.25)",
                                        fontSize: 9,
                                        letterSpacing: "0.25em",
                                        color: "#fff",
                                        opacity: 0.7,
                                    }}
                                >
                                    FASHION &nbsp;·&nbsp; FAITH &nbsp;·&nbsp; PURPOSE
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hero copy */}
                    <div>
                        <p className="section-label">HTW FASHION MAGAZINE</p>
                        <h1
                            className="section-title"
                            style={{ fontSize: "clamp(34px,5vw,54px)", marginBottom: 20 }}
                        >
                            Style with Purpose.
                            <br />
                            Live with Faith.
                        </h1>
                        <p
                            style={{
                                fontFamily: "'EB Garamond',serif",
                                fontSize: "clamp(15px,2vw,18px)",
                                color: T.charcoal,
                                lineHeight: 1.8,
                                maxWidth: 480,
                                marginBottom: 28,
                            }}
                        >
                            HTW Fashion is a quarterly digital magazine that celebrates
                            faith-inspired fashion, creativity, and stories that empower you to
                            live bold and dress with meaning.
                        </p>
                        <Link
                            className="btn-primary"
                            style={{ fontSize: 14, padding: "14px 30px" }}
                            href="#featured-stories"
                        >
                            <FaBookOpen /> Read Now
                        </Link>
                        <p style={{ fontSize: 12, color: T.muted, marginTop: 18, letterSpacing: "0.04em" }}>
                            Vol 01 &nbsp;|&nbsp; Issue 01
                        </p>
                    </div>
                </div>
            </section>

            {/* Editor's welcome */}
            <section style={{ padding: "72px 28px", background: T.white }}>
                <div
                    style={{
                        maxWidth: 1160,
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "minmax(200px,280px) 1fr auto",
                        gap: 48,
                        alignItems: "center",
                    }}
                    className="max-md:!grid-cols-1"
                >
                    <div
                        style={{
                            position: "relative",
                            aspectRatio: "4/5",
                            borderRadius: 10,
                            overflow: "hidden",
                        }}
                    >
                        <Image
                            src="/images/tee_she.jpg"
                            alt="Blessing E., Editor-in-Chief"
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <div>
                        <p className="section-label">EDITOR&rsquo;S WELCOME</p>
                        <h2
                            className="section-title"
                            style={{ fontSize: "clamp(26px,4vw,40px)", marginBottom: 16 }}
                        >
                            A Note From The Editor
                        </h2>
                        <p
                            style={{
                                fontFamily: "'EB Garamond',serif",
                                fontSize: 15,
                                color: T.muted,
                                lineHeight: 1.9,
                                marginBottom: 18,
                            }}
                        >
                            Welcome to the very first edition of HTW Fashion. This magazine was
                            born from a deep passion to merge faith, fashion, and purpose. Our
                            prayer is that every page inspires you to walk confidently in who
                            you are and whose you are.
                        </p>
                        <div
                            style={{
                                fontFamily: "cursive",
                                fontSize: 22,
                                color: T.ink,
                            }}
                        >
                            Blessing E.
                        </div>
                        <div style={{ fontSize: 12, color: T.muted, letterSpacing: "0.06em" }}>
                            EDITOR-IN-CHIEF
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                        {WHY_CARDS.map((c) => (
                            <div key={c.title} style={{ display: "flex", gap: 14, maxWidth: 260 }}>
                                <div
                                    style={{
                                        flexShrink: 0,
                                        width: 40,
                                        height: 40,
                                        borderRadius: "50%",
                                        background: T.rust,
                                        color: "#fff",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 16,
                                    }}
                                >
                                    {c.icon}
                                </div>
                                <div>
                                    <div
                                        style={{
                                            fontSize: 12,
                                            letterSpacing: "0.1em",
                                            fontWeight: 700,
                                            color: T.ink,
                                            marginBottom: 4,
                                        }}
                                    >
                                        {c.title.toUpperCase()}
                                    </div>
                                    <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.6 }}>
                                        {c.desc}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured stories */}
            <section id="featured-stories" style={{ padding: "72px 28px", background: T.warm }}>
                <div style={{ maxWidth: 1160, margin: "0 auto" }}>
                    <p className="section-label">FEATURED STORIES</p>
                    <div className="divider" />
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
                            gap: 20,
                            marginTop: 32,
                            marginBottom: 40,
                        }}
                    >
                        {FEATURED_STORIES.map((s) => (
                            <div
                                key={s.title}
                                className="card"
                                style={{
                                    background: T.white,
                                    border: `1px solid ${T.border}`,
                                    borderRadius: 12,
                                    overflow: "hidden",
                                }}
                            >
                                <div style={{ position: "relative", aspectRatio: "4/3" }}>
                                    <Image src={s.img} alt={s.title} fill style={{ objectFit: "cover" }} />
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: 12,
                                            bottom: 12,
                                            background: T.rust,
                                            color: "#fff",
                                            fontSize: 9,
                                            fontWeight: 700,
                                            letterSpacing: "0.08em",
                                            padding: "4px 10px",
                                            borderRadius: 4,
                                        }}
                                    >
                                        {s.tag}
                                    </div>
                                </div>
                                <div style={{ padding: "18px 18px 22px" }}>
                                    <h3
                                        style={{
                                            fontFamily: "'Cormorant Garamond',serif",
                                            fontSize: 19,
                                            fontWeight: 600,
                                            color: T.ink,
                                            margin: "0 0 8px",
                                            lineHeight: 1.3,
                                        }}
                                    >
                                        {s.title}
                                    </h3>
                                    <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.6, margin: 0 }}>
                                        {s.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <Link className="btn-outline-gold" href="/shop">
                            Explore All Articles →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Fashion & styling / Interviews / Ambassadors */}
            <section style={{ padding: "72px 28px", background: T.cream }}>
                <div
                    style={{
                        maxWidth: 1160,
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: 40,
                    }}
                    className="max-lg:!grid-cols-1"
                >
                    <div>
                        <p className="section-label">FASHION & STYLING</p>
                        <div className="divider" />
                        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 14 }}>
                            {FASHION_STYLING.map((f) => (
                                <div key={f.title} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                    <div
                                        style={{
                                            position: "relative",
                                            width: 56,
                                            height: 56,
                                            borderRadius: 8,
                                            overflow: "hidden",
                                            flexShrink: 0,
                                        }}
                                    >
                                        <Image src={f.img} alt={f.title} fill style={{ objectFit: "cover" }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div
                                            style={{
                                                fontFamily: "'Cormorant Garamond',serif",
                                                fontSize: 16,
                                                fontWeight: 600,
                                                color: T.ink,
                                            }}
                                        >
                                            {f.title}
                                        </div>
                                        <div style={{ fontSize: 12, color: T.muted }}>{f.desc}</div>
                                    </div>
                                    <FaChevronRight style={{ color: T.muted, fontSize: 12, flexShrink: 0 }} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="section-label">INTERVIEWS & FEATURES</p>
                        <div className="divider" />
                        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 14 }}>
                            {INTERVIEWS.map((f) => (
                                <div key={f.title} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                    <div
                                        style={{
                                            position: "relative",
                                            width: 56,
                                            height: 56,
                                            borderRadius: "50%",
                                            overflow: "hidden",
                                            flexShrink: 0,
                                        }}
                                    >
                                        <Image src={f.img} alt={f.title} fill style={{ objectFit: "cover" }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div
                                            style={{
                                                fontFamily: "'Cormorant Garamond',serif",
                                                fontSize: 16,
                                                fontWeight: 600,
                                                color: T.ink,
                                            }}
                                        >
                                            {f.title}
                                        </div>
                                        <div style={{ fontSize: 12, color: T.muted }}>{f.desc}</div>
                                    </div>
                                    <FaChevronRight style={{ color: T.muted, fontSize: 12, flexShrink: 0 }} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="section-label">OUR AMBASSADORS</p>
                        <div className="divider" />
                        <div
                            style={{
                                position: "relative",
                                aspectRatio: "4/3",
                                borderRadius: 12,
                                overflow: "hidden",
                                marginTop: 20,
                                marginBottom: 16,
                            }}
                        >
                            <Image
                                src="/images/polo_twopiece.jpg"
                                alt="HTW Ambassadors"
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                        <div
                            style={{
                                fontFamily: "'Cormorant Garamond',serif",
                                fontSize: 18,
                                fontWeight: 600,
                                color: T.ink,
                                marginBottom: 6,
                            }}
                        >
                            Empowered. Elegant. Purpose Driven.
                        </div>
                        <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.6, marginBottom: 12 }}>
                            Get to know the incredible women representing HTW Fashion across the
                            world.
                        </p>
                        <Link
                            href="/ambassadors"
                            style={{ fontSize: 13, color: T.rust, fontWeight: 700 }}
                        >
                            Meet Our Ambassadors →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Forthcoming editions + stay connected */}
            <section style={{ padding: "72px 28px", background: T.warm }}>
                <div
                    style={{
                        maxWidth: 1160,
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "1.4fr 1fr",
                        gap: 48,
                    }}
                    className="max-lg:!grid-cols-1"
                >
                    <div>
                        <p className="section-label">FORTHCOMING EDITIONS</p>
                        <div className="divider" />
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                marginTop: 28,
                                marginBottom: 24,
                                flexWrap: "wrap",
                            }}
                        >
                            {EDITIONS.map((e, i) => (
                                <div key={e.q} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <div
                                        style={{
                                            background: T.white,
                                            border: `1px solid ${T.border}`,
                                            borderRadius: 12,
                                            padding: "16px 18px",
                                            minWidth: 130,
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: 30,
                                                height: 30,
                                                borderRadius: "50%",
                                                background: `${T.gold}22`,
                                                color: T.gold,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: 14,
                                                marginBottom: 10,
                                            }}
                                        >
                                            ✦
                                        </div>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>
                                            {e.q}
                                        </div>
                                        <div style={{ fontSize: 12, color: T.muted }}>{e.issue}</div>
                                        <div style={{ fontSize: 12, color: T.muted }}>{e.title}</div>
                                        <div style={{ fontSize: 11, color: T.rust, marginTop: 4 }}>
                                            {e.eta}
                                        </div>
                                    </div>
                                    {i < EDITIONS.length - 1 && (
                                        <FaChevronRight style={{ color: T.muted, fontSize: 14 }} />
                                    )}
                                </div>
                            ))}
                        </div>
                        <p
                            style={{
                                fontFamily: "'EB Garamond',serif",
                                fontSize: 15,
                                fontStyle: "italic",
                                color: T.charcoal,
                                lineHeight: 1.8,
                                maxWidth: 480,
                            }}
                        >
                            A new edition every quarter, filled with fresh inspiration, exclusive
                            stories, and style guides just for you.
                        </p>
                    </div>

                    <div>
                        <p className="section-label">STAY CONNECTED</p>
                        <div className="divider" />
                        <p style={{ fontSize: 13, color: T.muted, marginBottom: 20, lineHeight: 1.7 }}>
                            Subscribe for early access to every new issue, exclusive content, and
                            special offers.
                        </p>
                        <div
                            style={{
                                background: T.white,
                                border: `1px solid ${T.border}`,
                                borderRadius: 14,
                                padding: 24,
                            }}
                        >
                            <div style={{ display: "flex", gap: 20, marginBottom: 16, borderBottom: `1px solid ${T.border}` }}>
                                {(["email", "whatsapp"] as const).map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setTab(t)}
                                        style={{
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                            padding: "0 0 10px",
                                            fontSize: 13,
                                            fontWeight: 700,
                                            letterSpacing: "0.04em",
                                            color: tab === t ? T.rust : T.muted,
                                            borderBottom: tab === t ? `2px solid ${T.rust}` : "2px solid transparent",
                                            marginBottom: -1,
                                            textTransform: "capitalize",
                                        }}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>

                            {done ? (
                                <div
                                    style={{
                                        background: `${T.sage}18`,
                                        border: `1px solid ${T.sage}44`,
                                        borderRadius: 8,
                                        padding: 14,
                                        fontSize: 13,
                                        color: T.sage,
                                        fontWeight: 700,
                                        textAlign: "center",
                                    }}
                                >
                                    ✓ You&rsquo;re subscribed! Welcome to HTW Fashion.
                                </div>
                            ) : tab === "email" ? (
                                <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", border: `1.5px solid ${T.border}` }}>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your email address"
                                        style={{
                                            flex: 1,
                                            border: "none",
                                            padding: "12px 14px",
                                            fontSize: 13,
                                            background: T.warm,
                                            color: T.ink,
                                        }}
                                    />
                                    <button
                                        className="btn-primary"
                                        style={{ borderRadius: 0, padding: "0 20px", fontSize: 13 }}
                                        onClick={onSubscribe}
                                        disabled={loading}
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            ) : (
                                <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", border: "1.5px solid #25D36688" }}>
                                    <input
                                        type="tel"
                                        value={wa}
                                        onChange={(e) => setWa(e.target.value)}
                                        placeholder="+234 XXX XXX XXXX"
                                        style={{
                                            flex: 1,
                                            border: "none",
                                            padding: "12px 14px",
                                            fontSize: 13,
                                            background: T.warm,
                                            color: T.ink,
                                        }}
                                    />
                                    <button
                                        style={{
                                            background: "#25D366",
                                            color: "#fff",
                                            border: "none",
                                            padding: "0 20px",
                                            fontSize: 13,
                                            fontWeight: 700,
                                            cursor: "pointer",
                                            fontFamily: "'Georgia',serif",
                                        }}
                                        onClick={onSubscribe}
                                        disabled={loading}
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            )}

                            <button
                                style={{
                                    width: "100%",
                                    marginTop: 14,
                                    background: "#EDFAF3",
                                    border: "1.5px solid #25D36644",
                                    color: "#1A8A3C",
                                    borderRadius: 8,
                                    padding: "12px 0",
                                    fontSize: 13,
                                    fontWeight: 700,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 8,
                                }}
                                onClick={() => setTab("whatsapp")}
                            >
                                💬 Subscribe on WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
