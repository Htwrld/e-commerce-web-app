"use client"

import Image from "next/image"
import { T } from "@/src/lib/tokens"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FaTruck, FaShieldAlt, FaWhatsapp } from "react-icons/fa"

const HERO_ACCENTS = [T.rust, T.sage, T.gold]

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

const HeroSection = ({ heroSection }: { heroSection: HeroSectionProps[] }) => {
    const [heroIdx, setHeroIdx] = useState(0)
    const slideCount = heroSection.length

    useEffect(() => {
        if (slideCount < 2) return
        const t = setInterval(() => setHeroIdx((i) => (i + 1) % slideCount), 5000)
        return () => clearInterval(t)
    }, [slideCount])

    if (!slideCount) return null

    const accent = HERO_ACCENTS[heroIdx % HERO_ACCENTS.length]
    const activeSection = heroSection[heroIdx]
    const image = activeSection.hero_lifestyle_image || "/images/hoodie_lifestyle.png"

    const headlineLines = activeSection.hero_headline
        .split(".")
        .map((s) => s.trim())
        .filter(Boolean)

    return (
        <section
            style={{
                background: T.cream,
                position: "relative",
                overflow: "hidden",
                padding: "56px 24px 64px",
            }}
        >
            <div
                style={{
                    maxWidth: 1280,
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    gap: 48,
                    flexWrap: "wrap-reverse",
                }}
            >
                {/* Text column */}
                <div
                    key={heroIdx}
                    style={{
                        flex: "1 1 460px",
                        textAlign: "left",
                        animation: "slideUp .9s ease",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 22,
                        }}
                    >
                        <span style={{ width: 28, height: 1, background: accent }} />
                        <span
                            style={{
                                display: "inline-block",
                                background: accent + "1A",
                                color: accent,
                                borderRadius: 20,
                                padding: "5px 16px",
                                fontSize: 11,
                                letterSpacing: "0.14em",
                                fontFamily: "monospace",
                                fontWeight: 700,
                                textTransform: "uppercase",
                            }}
                        >
                            {activeSection.hero_badge}
                        </span>
                        <span style={{ width: 28, height: 1, background: accent }} />
                    </div>

                    <h1
                        style={{
                            fontFamily: "'Cormorant Garamond',serif",
                            fontSize: "clamp(44px,6vw,72px)",
                            fontWeight: 700,
                            margin: "0 0 16px",
                            lineHeight: 1.02,
                            letterSpacing: "-0.02em",
                        }}
                    >
                        {headlineLines.length > 1 ? (
                            headlineLines.map((line, i) => (
                                <span
                                    key={i}
                                    style={{
                                        display: "block",
                                        color: i === 0 ? T.ink : accent,
                                    }}
                                >
                                    {line}
                                    {i < headlineLines.length - 1 ? "." : ""}
                                </span>
                            ))
                        ) : (
                            <span style={{ color: T.ink }}>{activeSection.hero_headline}</span>
                        )}
                    </h1>

                    <p
                        style={{
                            fontFamily: "'EB Garamond',serif",
                            fontSize: "clamp(16px,2vw,20px)",
                            color: T.charcoal,
                            margin: "0 0 20px",
                            fontStyle: "italic",
                            lineHeight: 1.6,
                            maxWidth: 480,
                        }}
                    >
                        {activeSection.hero_subheadline}
                    </p>

                    <div
                        style={{
                            display: "flex",
                            gap: 24,
                            flexWrap: "wrap",
                            marginBottom: 28,
                        }}
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

                    <div
                        style={{
                            display: "flex",
                            gap: 18,
                            flexWrap: "wrap",
                            fontSize: 12.5,
                            color: T.muted,
                        }}
                    >
                        <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
                            <FaTruck /> Free delivery in Lagos
                        </span>
                        <span
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 7,
                                borderLeft: `1px solid ${T.border}`,
                                paddingLeft: 18,
                            }}
                        >
                            <FaShieldAlt /> Ships nationwide
                        </span>
                        <span
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 7,
                                borderLeft: `1px solid ${T.border}`,
                                paddingLeft: 18,
                            }}
                        >
                            <FaWhatsapp /> WhatsApp orders welcome
                        </span>
                    </div>
                </div>

                {/* Image column */}
                <div
                    style={{
                        flex: "1 1 480px",
                        position: "relative",
                        height: "clamp(380px,52vw,620px)",
                        maxWidth: 680,
                        marginLeft: "auto",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: "-8%",
                            right: "-10%",
                            width: "60%",
                            height: "42%",
                            background: accent,
                            opacity: 0.12,
                            borderRadius: "40% 60% 55% 45%/50% 45% 55% 50%",
                            pointerEvents: "none",
                        }}
                    />

                    <div
                        key={heroIdx}
                        style={{
                            position: "absolute",
                            inset: 0,
                            right: "18%",
                            borderRadius: 18,
                            overflow: "hidden",
                            boxShadow: "0 24px 48px rgba(26,22,18,.18)",
                            animation: "slideUp 1s ease",
                        }}
                    >
                        <Image
                            src={image}
                            alt={activeSection.hero_headline}
                            fill
                            priority
                            style={{ objectFit: "cover", objectPosition: "center top" }}
                        />
                    </div>

                    <div
                        style={{
                            position: "absolute",
                            top: "4%",
                            right: 0,
                            width: "46%",
                            height: "44%",
                            borderRadius: 12,
                            overflow: "hidden",
                            border: "4px solid " + T.white,
                            boxShadow: "0 16px 32px rgba(26,22,18,.2)",
                            transform: "rotate(3deg)",
                        }}
                    >
                        <Image
                            src={image}
                            alt=""
                            fill
                            style={{ objectFit: "cover", objectPosition: "center 20%" }}
                        />
                    </div>

                    <div
                        style={{
                            position: "absolute",
                            bottom: "6%",
                            right: 0,
                            width: "40%",
                            fontFamily: "'Cormorant Garamond',serif",
                            fontStyle: "italic",
                            fontSize: 22,
                            lineHeight: 1.15,
                            color: T.ink,
                            transform: "rotate(-2deg)",
                        }}
                    >
                        Faith
                        <br />
                        Fashion
                        <br />
                        Community
                        <span
                            style={{
                                display: "block",
                                width: 60,
                                height: 3,
                                background: accent,
                                marginTop: 6,
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Slide dots */}
            {slideCount > 1 && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 8,
                        marginTop: 40,
                    }}
                >
                    {heroSection.map((_, i) => (
                        <button
                            key={i}
                            aria-label={`Show slide ${i + 1}`}
                            onClick={() => setHeroIdx(i)}
                            style={{
                                width: i === heroIdx ? 32 : 8,
                                height: 8,
                                borderRadius: 4,
                                border: "none",
                                cursor: "pointer",
                                background: i === heroIdx ? accent : "#CCC",
                                transition: "all .45s",
                            }}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}

export default HeroSection
