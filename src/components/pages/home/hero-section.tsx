"use client"

import Image from "next/image"
import { T } from "@/src/lib/tokens"
import Link from "next/link"
import { useEffect, useState } from "react"

const HERO_BGS = [
    "linear-gradient(135deg,#FDF0DC 0%,#F5D898 50%,#EFE4D0 100%)",
    "linear-gradient(135deg,#DCF0E6 0%,#A8D8BC 50%,#C8E6D6 100%)",
    "linear-gradient(135deg,#F5E0DC 0%,#F5B8A8 50%,#EDD4CC 100%)",
]
const HERO_ACCENTS = [T.gold, T.sage, T.rust]

type HeroSectionProps = {
    hero_badge: string
    hero_headline: string
    hero_subheadline: string
    hero_tagline: string
    hero_background_color: string
    hero_lifestyle_image: string
}

const HeroSection = ({ heroSection }: { heroSection: HeroSectionProps[] }) => {
    const [heroIdx, setHeroIdx] = useState(0)

    useEffect(() => {
        const t = setInterval(() => setHeroIdx((i) => (i + 1) % 3), 5000)
        return () => clearInterval(t)
    }, [])

    const accent = HERO_ACCENTS[heroIdx]
    const activeSection = heroSection[heroIdx]

    return (
        <section
            style={{
                minHeight: "92vh",
                background: HERO_BGS[heroIdx],
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "80px 24px 100px",
                position: "relative",
                overflow: "hidden",
                transition: "background 1.4s ease",
            }}
        >
            {/* Background decorations */}
            <div
                style={{
                    position: "absolute",
                    top: -120,
                    right: -120,
                    width: 480,
                    height: 480,
                    borderRadius: "50%",
                    background: accent + "15",
                    pointerEvents: "none",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: -80,
                    left: -80,
                    width: 320,
                    height: 320,
                    borderRadius: "50%",
                    background: accent + "10",
                    pointerEvents: "none",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    top: "12%",
                    left: "5%",
                    fontSize: 80,
                    opacity: 0.04,
                    pointerEvents: "none",
                    color: T.charcoal,
                }}
            >
                ✝
            </div>
            <div
                style={{
                    position: "absolute",
                    bottom: "14%",
                    right: "6%",
                    fontSize: 60,
                    opacity: 0.04,
                    pointerEvents: "none",
                    color: T.charcoal,
                }}
            >
                ✝
            </div>

            {/* Lifestyle image strip */}
            <div
                style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: "30%",
                    display: "flex",
                    flexDirection: "column",
                    opacity: 0.18,
                    pointerEvents: "none",
                    overflow: "hidden",
                }}
            >
                {heroSection.map((hero, i) => (
                    <div
                        key={hero.hero_headline + i}
                        style={{
                            flex: 1,
                            overflow: "hidden",
                            position: "relative",
                        }}
                    >
                        <Image
                            src={hero.hero_lifestyle_image ?? "/images/hoodie_lifestyle.png"}
                            alt=""
                            fill
                            style={{ objectFit: "cover", objectPosition: "center top" }}
                        />
                    </div>
                ))}
            </div>

            {/* Content */}
            <div
                style={{
                    position: "relative",
                    zIndex: 2,
                    maxWidth: 720,
                    animation: "slideUp .9s ease",
                }}
            >
                <div
                    style={{
                        display: "inline-block",
                        background: accent,
                        color: "#fff",
                        borderRadius: 20,
                        padding: "5px 20px",
                        fontSize: 11,
                        letterSpacing: "0.2em",
                        fontFamily: "monospace",
                        fontWeight: 700,
                        marginBottom: 22,
                    }}
                >
                    ✝ {activeSection.hero_badge}
                </div>
                <h1
                    style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: "clamp(52px,12vw,100px)",
                        fontWeight: 700,
                        margin: "0 0 16px",
                        lineHeight: 0.92,
                        color: T.ink,
                        letterSpacing: "-0.025em",
                    }}
                >
                    {activeSection.hero_headline}
                </h1>
                <p
                    style={{
                        fontFamily: "'EB Garamond',serif",
                        fontSize: "clamp(16px,2.5vw,21px)",
                        color: T.charcoal,
                        margin: "0 0 10px",
                        fontStyle: "italic",
                        lineHeight: 1.6,
                        maxWidth: 560,
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                >
                    {activeSection.hero_subheadline}
                </p>
                <p
                    style={{
                        fontSize: 13,
                        color: T.muted,
                        marginBottom: 36,
                        letterSpacing: "0.04em",
                    }}
                >
                    {activeSection.hero_tagline}
                </p>

                <div
                    style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}
                >
                    <Link
                        className="btn-primary"
                        style={{ fontSize: 14, padding: "14px 28px" }}
                        href={`/shop?gender=male`}
                    >
                        Shop Men
                    </Link>
                    <Link
                        className="btn-primary"
                        style={{ fontSize: 14, padding: "14px 28px", background: T.rust }}
                        href={`/shop?gender=female`}
                    >
                        Shop Women
                    </Link>
                    <Link
                        className="btn-secondary"
                        style={{ fontSize: 14, padding: "13px 26px" }}
                        href="/shop?badge=new collection"
                    >
                        New Collection
                    </Link>
                </div>
                <p style={{ fontSize: 12, color: T.muted, marginTop: 16 }}>
                    Free delivery in Lagos &nbsp;·&nbsp; Ships nationwide &nbsp;·&nbsp; WhatsApp
                    orders welcome
                </p>
            </div>

            {/* Hero dots */}
            <div style={{ position: "absolute", bottom: 28, display: "flex", gap: 8 }}>
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        style={{
                            width: i === heroIdx ? 32 : 8,
                            height: 8,
                            borderRadius: 4,
                            background: i === heroIdx ? accent : "#CCC",
                            transition: "all .45s",
                        }}
                    />
                ))}
            </div>
        </section>
    )
}

export default HeroSection
