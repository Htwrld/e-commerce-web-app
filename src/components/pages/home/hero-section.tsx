"use client"

import Image from "next/image"
import { T } from "@/src/lib/tokens"
import Link from "next/link"

type HeroSectionProps = {
    hero_badge: string
    hero_headline: string
    hero_subheadline: string
    hero_tagline: string
    hero_background_color: string
    hero_lifestyle_image: string
    hero_button_1_text: string
    hero_button_1_link: string
    hero_button_2_text: string
    hero_button_2_link: string
}

const HERO_BG =
    "linear-gradient(135deg,#FDF0DC 0%,#F5D898 50%,#EFE4D0 100%)"

const DEFAULT_LIFESTYLE_IMGS = [
    "/images/hoodie_lifestyle.png",
    "/images/tee_she.png",
    "/images/polo_twopiece.jpg",
]

const HeroSection = ({ heroSection }: { heroSection: HeroSectionProps[] }) => {
    if (!heroSection.length) return null

    const activeSection = heroSection[0]
    const accent = T.gold

    const lifestyleImages = heroSection
        .map((s) => s.hero_lifestyle_image)
        .filter(Boolean)
        .slice(0, 3)
    const images = lifestyleImages.length ? lifestyleImages : DEFAULT_LIFESTYLE_IMGS

    return (
        <section
            style={{
                minHeight: "92vh",
                background: HERO_BG,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "80px 24px 100px",
                position: "relative",
                overflow: "hidden",
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
                {images.map((src, i) => (
                    <div key={i} style={{ flex: 1, overflow: "hidden", position: "relative" }}>
                        <Image
                            src={src}
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
                    {activeSection.hero_badge}
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
                    {activeSection.hero_button_1_text && activeSection.hero_button_1_link && (
                        <Link
                            className="btn-primary"
                            style={{ fontSize: 14, padding: "14px 28px", background: T.rust }}
                            href={activeSection.hero_button_1_link}
                        >
                            {activeSection.hero_button_1_text}
                        </Link>
                    )}
                    {activeSection.hero_button_2_text && activeSection.hero_button_2_link && (
                        <Link
                            className="btn-primary"
                            style={{ fontSize: 14, padding: "14px 28px", background: T.ink }}
                            href={activeSection.hero_button_2_link}
                        >
                            {activeSection.hero_button_2_text}
                        </Link>
                    )}
                </div>
                <p style={{ fontSize: 12, color: T.muted, marginTop: 16 }}>
                    Free delivery in Lagos &nbsp;·&nbsp; Ships nationwide &nbsp;·&nbsp; WhatsApp
                    orders welcome
                </p>
            </div>
        </section>
    )
}

export default HeroSection
