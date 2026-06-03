"use client"

import { useState } from "react"
import { T } from "@/src/lib/tokens"
import { PRODUCTS, AMBASSADORS, TESTIMONIALS, WHY_HTW, Product } from "@/src/lib/data"
import { useCart } from "@/src/lib/cart-context"
import { HeroSection } from "@/src/components/sections/HeroSection"
import { ProductCard } from "@/src/components/cards/ProductCard"
import { ProductDetailModal } from "@/src/components/cards/ProductDetailModal"
import { Stars } from "@/src/components/cards/Stars"
import Image from "next/image"
import Link from "next/link"

const LIFESTYLE_SHOTS = [
    {
        img: "/images/hoodie_lifestyle.png",
        label: "Street Style",
        tag: "@tunde.w — London",
        col: T.ink,
    },
    {
        img: "/images/tee_walkbyfaith.png",
        label: "Walk By Faith",
        tag: "@emeka.t — Abuja",
        col: "#1A1612",
    },
    {
        img: "/images/tee_she.png",
        label: "She Prays. She Wins.",
        tag: "@chisom.b — Port Harcourt",
        col: "#7BA8C9",
    },
    {
        img: "/images/polo_twopiece.jpg",
        label: "Kingdom Living",
        tag: "@adaeze.k — Lagos",
        col: T.gold,
    },
    {
        img: "/images/twopiece_black.jpg",
        label: "Prestige Set",
        tag: "@pastor_c — Enugu",
        col: "#1A1612",
    },
    {
        img: "/images/hoodie_mockup.jpg",
        label: "Trust God Bro",
        tag: "@blessing.a — Lagos",
        col: T.ink,
    },
]

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

interface HomePageProps {
    heroIdx: number
}

export function HomePage({ heroIdx }: HomePageProps) {
    const { addToCart } = useCart()
    const [detailProd, setDetailProd] = useState<Product | null>(null)
    const [faqOpen, setFaqOpen] = useState<number | null>(null)
    const [emailSub, setEmailSub] = useState("")
    const [subDone, setSubDone] = useState(false)
    const [waNumber, setWaNumber] = useState("")
    const [waDone, setWaDone] = useState(false)

    const newArr = PRODUCTS.filter((p) => p.badge === "NEW").slice(0, 4)
    const best = PRODUCTS.filter((p) => p.badge === "BESTSELLER" || p.badge === "POPULAR")

    return (
        <div>
            {detailProd && (
                <ProductDetailModal
                    product={detailProd}
                    onClose={() => setDetailProd(null)}
                    onAdd={addToCart}
                />
            )}

            {/* ── 1. HERO ── */}
            <HeroSection heroIdx={heroIdx} />

            {/* ── 2. TRUST BAR ── */}
            <section style={{ background: T.ink, padding: "28px 24px" }}>
                <div style={{ maxWidth: 1160, margin: "0 auto" }}>
                    <p
                        style={{
                            textAlign: "center",
                            fontSize: 10,
                            letterSpacing: "0.22em",
                            color: T.gold,
                            fontWeight: 700,
                            marginBottom: 16,
                            textTransform: "uppercase",
                        }}
                    >
                        Why Shop With HTW
                    </p>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
                            gap: 12,
                        }}
                    >
                        {[
                            ["🔒", "Secure Checkout", "Paystack & Flutterwave"],
                            ["🚚", "Free Lagos Delivery", "On orders ₦50,000+"],
                            ["↩️", "Easy Returns", "14-day return policy"],
                            ["💬", "WhatsApp Support", "Order & track via chat"],
                            ["🌍", "Ships Worldwide", "UK · USA · Canada & more"],
                        ].map(([ico, title, sub]) => (
                            <div
                                key={title}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                    padding: "12px 16px",
                                    background: "rgba(255,255,255,0.05)",
                                    borderRadius: 8,
                                    border: "1px solid rgba(255,255,255,0.08)",
                                }}
                            >
                                <span style={{ fontSize: 22, flexShrink: 0 }}>{ico}</span>
                                <div>
                                    <div
                                        style={{
                                            fontSize: 12,
                                            fontWeight: 700,
                                            color: "#FFF",
                                            letterSpacing: "0.03em",
                                        }}
                                    >
                                        {title}
                                    </div>
                                    <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>
                                        {sub}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 3. BRAND STATEMENT ── */}
            <section style={{ background: T.white, padding: "72px 28px", textAlign: "center" }}>
                <div style={{ maxWidth: 780, margin: "0 auto" }}>
                    <p className="section-label" style={{ textAlign: "center" }}>
                        OUR MISSION
                    </p>
                    <h2
                        className="section-title"
                        style={{ fontSize: "clamp(24px,4vw,38px)", marginBottom: 16 }}
                    >
                        Fashion with Purpose
                    </h2>
                    <div className="divider" style={{ margin: "14px auto 24px" }} />
                    <p
                        style={{
                            fontFamily: "'EB Garamond',serif",
                            fontSize: "clamp(18px,3vw,26px)",
                            fontStyle: "italic",
                            color: T.charcoal,
                            lineHeight: 1.75,
                            marginBottom: 20,
                        }}
                    >
                        What you wear should say something — before you even speak.
                    </p>
                    <p
                        style={{
                            fontSize: "clamp(14px,2vw,17px)",
                            color: T.muted,
                            lineHeight: 1.9,
                            marginBottom: 32,
                            maxWidth: 640,
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                    >
                        At Hope&rsquo;s Trendy World, we create more than clothing. We create pieces
                        that reflect identity, ignite confidence, and carry a message of faith into
                        everyday life.
                    </p>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 40,
                            flexWrap: "wrap",
                        }}
                    >
                        {[
                            ["500+", "Happy Customers"],
                            ["12+", "Pieces in Store"],
                            ["4", "Seasonal Drops"],
                            ["100%", "Faith-Driven"],
                        ].map(([num, lbl]) => (
                            <div key={lbl} style={{ textAlign: "center" }}>
                                <div
                                    style={{
                                        fontFamily: "'Cormorant Garamond',serif",
                                        fontSize: "clamp(28px,5vw,44px)",
                                        fontWeight: 700,
                                        color: T.rust,
                                    }}
                                >
                                    {num}
                                </div>
                                <div
                                    style={{
                                        fontSize: 11,
                                        color: T.muted,
                                        letterSpacing: "0.1em",
                                        textTransform: "uppercase",
                                        marginTop: 2,
                                    }}
                                >
                                    {lbl}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 4. BEST SELLERS ── */}
            <section style={{ background: T.warm, padding: "80px 28px" }}>
                <div style={{ maxWidth: 1160, margin: "0 auto" }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            marginBottom: 40,
                            flexWrap: "wrap",
                            gap: 12,
                        }}
                    >
                        <div>
                            <p className="section-label">🔥 TRENDING NOW</p>
                            <h2
                                className="section-title"
                                style={{ fontSize: "clamp(28px,4vw,44px)" }}
                            >
                                Most Loved Pieces
                            </h2>
                            <div className="divider" />
                            <p style={{ fontSize: 14, color: T.muted, marginTop: 8 }}>
                                Worn by a growing community of bold believers — every single day.
                            </p>
                        </div>
                        <Link className="btn-outline-gold" href="/shop">
                            View All →
                        </Link>
                    </div>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
                            gap: 18,
                        }}
                    >
                        {best.map((p) => (
                            <ProductCard
                                key={p.id}
                                product={p}
                                onAdd={addToCart}
                                onClick={setDetailProd}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 5. CATEGORY QUICK NAV ── */}
            <section
                style={{
                    background: T.white,
                    padding: "32px 28px",
                    borderTop: `1px solid ${T.border}`,
                    borderBottom: `1px solid ${T.border}`,
                }}
            >
                <div style={{ maxWidth: 1160, margin: "0 auto" }}>
                    <p
                        style={{
                            textAlign: "center",
                            fontSize: 10,
                            letterSpacing: "0.22em",
                            color: T.gold,
                            fontWeight: 700,
                            marginBottom: 14,
                            textTransform: "uppercase",
                        }}
                    >
                        Shop by Category
                    </p>
                    <div
                        style={{
                            display: "flex",
                            gap: 10,
                            flexWrap: "wrap",
                            justifyContent: "center",
                        }}
                    >
                        {[
                            ["Sweatshirts", "🧥"],
                            ["Hoodies", "🫙"],
                            ["Joggers", "👟"],
                            ["Polos & Tees", "👔"],
                            ["2-Piece Sets", "👗"],
                        ].map(([cat, ico]) => (
                            <Link
                                key={cat}
                                className="btn-outline-gold"
                                href={`/shop?cat=${cat}`}
                                style={{
                                    padding: "9px 20px",
                                    borderRadius: 24,
                                    fontSize: 13,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                }}
                            >
                                {ico} {cat}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 6. LIFESTYLE GALLERY ── */}
            <section style={{ background: T.sand, padding: "80px 28px" }}>
                <div style={{ maxWidth: 1160, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 40 }}>
                        <p className="section-label">STYLED BY THE COMMUNITY</p>
                        <h2
                            className="section-title"
                            style={{ fontSize: "clamp(28px,5vw,46px)", marginBottom: 10 }}
                        >
                            Bold Living Looks Like This
                        </h2>
                        <div className="divider" style={{ margin: "14px auto" }} />
                        <p
                            style={{
                                fontSize: 14,
                                color: T.muted,
                                maxWidth: 520,
                                margin: "0 auto",
                            }}
                        >
                            Real HTW community — real moments. From Lagos streets to London church
                            steps.
                        </p>
                    </div>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))",
                            gap: 10,
                            marginBottom: 24,
                        }}
                    >
                        {LIFESTYLE_SHOTS.map((shot, i) => (
                            <div
                                key={i}
                                className="card"
                                style={{
                                    borderRadius: 12,
                                    overflow: "hidden",
                                    position: "relative",
                                    aspectRatio: "3/4",
                                    background: shot.col,
                                }}
                            >
                                <Image
                                    src={shot.img}
                                    alt={shot.label}
                                    fill
                                    style={{ objectFit: "cover", objectPosition: "center top" }}
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        background:
                                            "linear-gradient(transparent 40%,rgba(0,0,0,0.8))",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "flex-end",
                                        padding: 12,
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: 12,
                                            fontWeight: 700,
                                            color: "#fff",
                                            lineHeight: 1.3,
                                        }}
                                    >
                                        {shot.label}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 11,
                                            color: "rgba(255,255,255,0.65)",
                                            marginTop: 2,
                                        }}
                                    >
                                        {shot.tag}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 13, color: T.muted, marginBottom: 6 }}>
                            Share your HTW look and get featured:
                        </div>
                        <div
                            style={{
                                fontFamily: "'Cormorant Garamond',serif",
                                fontSize: 26,
                                color: T.rust,
                                fontWeight: 700,
                                marginBottom: 16,
                            }}
                        >
                            #WearHopeLiveBold
                        </div>
                        <div
                            style={{
                                display: "flex",
                                gap: 12,
                                justifyContent: "center",
                                flexWrap: "wrap",
                            }}
                        >
                            <a
                                href="#"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    background:
                                        "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
                                    color: "#fff",
                                    padding: "9px 20px",
                                    borderRadius: 8,
                                    textDecoration: "none",
                                    fontSize: 13,
                                    fontWeight: 700,
                                }}
                            >
                                📸 Instagram
                            </a>
                            <a
                                href="#"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    background: "#000",
                                    color: "#fff",
                                    padding: "9px 20px",
                                    borderRadius: 8,
                                    textDecoration: "none",
                                    fontSize: 13,
                                    fontWeight: 700,
                                }}
                            >
                                🎵 TikTok
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 7. FEATURED COLLECTION ── */}
            <section style={{ padding: "80px 28px", maxWidth: 1160, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 48 }}>
                    <p className="section-label">FEATURED COLLECTION</p>
                    <h2
                        className="section-title"
                        style={{ fontSize: "clamp(30px,5vw,50px)", marginBottom: 12 }}
                    >
                        Grace Season Collection
                    </h2>
                    <div className="divider" style={{ margin: "14px auto" }} />
                    <p
                        style={{
                            fontFamily: "'EB Garamond',serif",
                            fontSize: "clamp(15px,2vw,19px)",
                            fontStyle: "italic",
                            color: T.muted,
                            maxWidth: 600,
                            margin: "0 auto 8px",
                        }}
                    >
                        Every season tells a story — and this one is yours.
                    </p>
                    <p style={{ fontSize: 14, color: T.muted, maxWidth: 560, margin: "0 auto" }}>
                        Crafted for individuals stepping into their purpose with confidence and
                        clarity.
                    </p>
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
                        gap: 18,
                    }}
                >
                    {newArr.map((p) => (
                        <ProductCard
                            key={p.id}
                            product={p}
                            onAdd={addToCart}
                            onClick={setDetailProd}
                        />
                    ))}
                </div>
                <div style={{ textAlign: "center", marginTop: 36 }}>
                    <Link className="btn-primary" href="/shop">
                        Shop the Collection →
                    </Link>
                </div>
            </section>

            {/* ── 8. 2-PIECE BANNER ── */}
            <section
                style={{
                    background: "linear-gradient(135deg,#E0ECF8 0%,#C4D8F0 50%,#DCF0E6 100%)",
                    padding: "72px 28px",
                    textAlign: "center",
                }}
            >
                <div style={{ maxWidth: 700, margin: "0 auto" }}>
                    <p className="section-label" style={{ color: T.cobalt }}>
                        SHOP THE LOOK
                    </p>
                    <h2
                        className="section-title"
                        style={{ fontSize: "clamp(28px,5vw,48px)", marginBottom: 14 }}
                    >
                        Matching 2-Piece Sets
                    </h2>
                    <p
                        style={{
                            fontFamily: "'EB Garamond',serif",
                            fontSize: "clamp(15px,2vw,19px)",
                            fontStyle: "italic",
                            color: T.muted,
                            marginBottom: 28,
                            lineHeight: 1.7,
                        }}
                    >
                        &ldquo;Two are better than one.&rdquo; — Ecclesiastes 4:9
                    </p>
                    <div
                        style={{
                            display: "flex",
                            gap: 12,
                            justifyContent: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <Link className="btn-primary" href="/shop">
                            Shop Women&rsquo;s Sets
                        </Link>
                        <Link className="btn-secondary" href="/shop">
                            Shop Men&rsquo;s Sets
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── 9. WHY HTW ── */}
            <section style={{ padding: "80px 28px", maxWidth: 1160, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 48 }}>
                    <p className="section-label">OUR DIFFERENCE</p>
                    <h2
                        className="section-title"
                        style={{ fontSize: "clamp(28px,5vw,48px)", marginBottom: 8 }}
                    >
                        Why Hope&rsquo;s Trendy World?
                    </h2>
                    <div className="divider" style={{ margin: "14px auto" }} />
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
                        gap: 20,
                    }}
                >
                    {WHY_HTW.map((w, i) => (
                        <div
                            key={i}
                            className="card"
                            style={{
                                background: T.white,
                                border: `1px solid ${T.border}`,
                                borderRadius: 14,
                                padding: "28px 24px",
                                textAlign: "center",
                            }}
                        >
                            <div style={{ fontSize: 42, marginBottom: 14 }}>{w.icon}</div>
                            <h3
                                style={{
                                    fontFamily: "'Cormorant Garamond',serif",
                                    fontSize: 20,
                                    fontWeight: 600,
                                    margin: "0 0 10px",
                                    color: T.ink,
                                }}
                            >
                                {w.title}
                            </h3>
                            <p
                                style={{
                                    fontSize: 14,
                                    color: T.muted,
                                    lineHeight: 1.75,
                                    margin: 0,
                                }}
                            >
                                {w.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── 10. TESTIMONIALS ── */}
            <section style={{ background: T.white, padding: "80px 28px" }}>
                <div style={{ maxWidth: 1160, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 44 }}>
                        <p className="section-label">SOCIAL PROOF</p>
                        <h2
                            className="section-title"
                            style={{ fontSize: "clamp(28px,5vw,46px)", marginBottom: 8 }}
                        >
                            What People Are Saying
                        </h2>
                        <div className="divider" style={{ margin: "14px auto" }} />
                    </div>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
                            gap: 16,
                            marginBottom: 48,
                        }}
                    >
                        {TESTIMONIALS.map((t, i) => (
                            <div
                                key={i}
                                className="card"
                                style={{
                                    background: T.warm,
                                    border: `1px solid ${T.border}`,
                                    borderRadius: 14,
                                    padding: "24px 22px",
                                }}
                            >
                                <Stars n={t.stars} />
                                <p
                                    style={{
                                        fontFamily: "'EB Garamond',serif",
                                        fontSize: 16,
                                        fontStyle: "italic",
                                        color: T.charcoal,
                                        lineHeight: 1.8,
                                        margin: "12px 0 16px",
                                    }}
                                >
                                    &ldquo;{t.text}&rdquo;
                                </p>
                                <div style={{ fontSize: 14, fontWeight: 700, color: T.ink }}>
                                    {t.name}
                                </div>
                                <div style={{ fontSize: 12, color: T.muted }}>{t.city}</div>
                            </div>
                        ))}
                    </div>

                    {/* Community posts */}
                    <div style={{ textAlign: "center", margin: "56px 0 28px" }}>
                        <p className="section-label">COMMUNITY POSTS</p>
                        <h3
                            style={{
                                fontFamily: "'Cormorant Garamond',serif",
                                fontSize: "clamp(22px,3vw,32px)",
                                fontWeight: 400,
                                color: T.ink,
                                margin: "0 0 8px",
                            }}
                        >
                            #WearHopeLiveBold
                        </h3>
                        <div className="divider" style={{ margin: "12px auto 0" }} />
                    </div>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
                            gap: 10,
                        }}
                    >
                        {[
                            {
                                e: "🤩",
                                n: "Blessing A.",
                                c: "Wore the Royal Cord set to Easter service — 40 compliments 🙏",
                                h: 312,
                                col: T.rust,
                            },
                            {
                                e: "🥰",
                                n: "Ngozi E.",
                                c: "HTW puts a verse on every piece. I cry every time I read them 💛",
                                h: 204,
                                col: T.gold,
                            },
                            {
                                e: "✨",
                                n: "Femi J.",
                                c: "Arrived in 2 days to the UK! Quality is insane for the price",
                                h: 187,
                                col: T.sage,
                            },
                            {
                                e: "👑",
                                n: "Amara O.",
                                c: "The Crowned Sweatshirt is giving EXACTLY what it's supposed to give",
                                h: 445,
                                col: T.cobalt,
                            },
                            {
                                e: "🙌🏾",
                                n: "Pastor C.",
                                c: "My whole family wore HTW sets for Christmas. Best decision!",
                                h: 289,
                                col: T.gold,
                            },
                            {
                                e: "🔥",
                                n: "Temi R.",
                                c: "The He Wore It First Zip Hoodie had the whole church talking",
                                h: 521,
                                col: T.rust,
                            },
                        ].map((post, i) => (
                            <div
                                key={i}
                                className="card"
                                style={{
                                    background: T.cream,
                                    border: `1px solid ${T.border}`,
                                    borderRadius: 12,
                                    padding: 14,
                                    borderTop: `3px solid ${post.col}`,
                                }}
                            >
                                <div style={{ fontSize: 32, marginBottom: 8 }}>{post.e}</div>
                                <div
                                    style={{
                                        fontSize: 13,
                                        fontWeight: 700,
                                        color: T.ink,
                                        marginBottom: 4,
                                    }}
                                >
                                    {post.n}
                                </div>
                                <p
                                    style={{
                                        fontSize: 12,
                                        color: T.muted,
                                        lineHeight: 1.6,
                                        margin: "0 0 8px",
                                    }}
                                >
                                    {post.c}
                                </p>
                                <div style={{ fontSize: 11, color: post.col, fontWeight: 700 }}>
                                    ❤ {post.h}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 11. AMBASSADORS STRIP ── */}
            <section style={{ background: T.warm, padding: "64px 28px" }}>
                <div style={{ maxWidth: 1160, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 32 }}>
                        <p className="section-label">REPRESENTING THE KINGDOM</p>
                        <h2
                            className="section-title"
                            style={{ fontSize: "clamp(24px,4vw,38px)", marginBottom: 8 }}
                        >
                            HTW Ambassadors
                        </h2>
                        <div className="divider" style={{ margin: "14px auto" }} />
                        <p style={{ fontSize: 14, color: T.muted }}>
                            Real people. Real faith. Real style.
                        </p>
                    </div>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                            gap: 12,
                            marginBottom: 28,
                        }}
                    >
                        {AMBASSADORS.map((a, i) => (
                            <div
                                key={i}
                                className="card"
                                style={{
                                    background: `${a.color}12`,
                                    border: `2px solid ${a.color}33`,
                                    borderRadius: 14,
                                    padding: "22px 18px",
                                    textAlign: "center",
                                }}
                            >
                                <div style={{ fontSize: 44, marginBottom: 10 }}>{a.emoji}</div>
                                <div
                                    style={{
                                        fontSize: 16,
                                        fontFamily: "'Cormorant Garamond',serif",
                                        color: T.ink,
                                        marginBottom: 3,
                                        fontWeight: 600,
                                    }}
                                >
                                    {a.name}
                                </div>
                                <div
                                    style={{
                                        fontSize: 12,
                                        color: a.color,
                                        fontWeight: 700,
                                        marginBottom: 4,
                                    }}
                                >
                                    {a.handle}
                                </div>
                                <div style={{ fontSize: 12, color: T.muted, marginBottom: 8 }}>
                                    {a.city}
                                </div>
                                <p
                                    style={{
                                        fontSize: 12,
                                        fontStyle: "italic",
                                        color: T.charcoal,
                                        margin: 0,
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {a.quote}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <Link href="/ambassadors" className="btn-primary">
                            Join the Ambassador Family →
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── 12. FAQ ── */}
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
                                            transform:
                                                faqOpen === i ? "rotate(45deg)" : "rotate(0)",
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

            {/* ── 13. FINAL CTA ── */}
            <section
                style={{
                    background: `linear-gradient(135deg,${T.charcoal},#3A3228)`,
                    padding: "100px 28px",
                    textAlign: "center",
                }}
            >
                <div style={{ maxWidth: 680, margin: "0 auto" }}>
                    <div style={{ fontSize: 52, marginBottom: 20, opacity: 0.6, color: T.gold }}>
                        ✝
                    </div>
                    <h2
                        style={{
                            fontFamily: "'Cormorant Garamond',serif",
                            fontSize: "clamp(28px,6vw,54px)",
                            fontWeight: 700,
                            color: "#fff",
                            margin: "0 0 18px",
                            lineHeight: 1.05,
                        }}
                    >
                        Don&rsquo;t just wear clothes.
                        <br />
                        Wear a message.
                    </h2>
                    <p
                        style={{
                            fontFamily: "'EB Garamond',serif",
                            fontSize: "clamp(16px,2.5vw,20px)",
                            fontStyle: "italic",
                            color: "#B0A898",
                            lineHeight: 1.7,
                            marginBottom: 36,
                        }}
                    >
                        You weren&rsquo;t made to blend in. You were created to stand out — with
                        purpose.
                    </p>
                    <Link
                        className="btn-primary"
                        href="/shop"
                        style={{ fontSize: 16, padding: "16px 40px" }}
                    >
                        Start Your Journey With HTW →
                    </Link>
                </div>
            </section>

            {/* ── 14. EMAIL + WHATSAPP CAPTURE ── */}
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
                                Get early access to drops, exclusive discounts, and weekly
                                devotional style inspiration.
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
                                Get new drops, restock alerts, and exclusive offers — straight to
                                your WhatsApp. No spam. Ever.
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
                                        By signing up you agree to receive WhatsApp messages from
                                        HTW. Unsubscribe anytime.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
