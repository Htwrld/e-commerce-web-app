"use client"

import Image from "next/image"
import { T } from "@/src/lib/tokens"
import Link from "next/link"
import { useEffect, useState } from "react"

const HERO_ACCENTS = [T.gold, T.rust, T.sage]

import type { HeroSection as HeroSlide } from "@/src/action/pageController"

const HERO_BG = "linear-gradient(135deg,#FDF0DC 0%,#F5D898 50%,#EFE4D0 100%)"

const DEFAULT_LIFESTYLE_IMGS = [
    "/images/hoodie_lifestyle.png",
    "/images/tee_she.jpg",
    "/images/polo_twopiece.jpg",
]

const HeroSection = ({ heroSection }: { heroSection: HeroSlide[] }) => {
    const [heroIdx, setHeroIdx] = useState(0)
    const slideCount = heroSection.length
    const [paused, setPaused] = useState(false)
    const [interacting, setInteracting] = useState(false)

    useEffect(() => {
        if (slideCount < 2 || paused || interacting) return
        const t = setInterval(() => setHeroIdx((i) => (i + 1) % slideCount), 5000)
        return () => clearInterval(t)
    }, [slideCount, paused, interacting])

    if (!slideCount) return null

    const activeSlideIndex = heroIdx % slideCount
    const activeSection = heroSection[activeSlideIndex]
    const accent = HERO_ACCENTS[heroIdx % HERO_ACCENTS.length]

    const images = activeSection.hero_images.length
        ? activeSection.hero_images
        : DEFAULT_LIFESTYLE_IMGS.map((_, index) => ({
              url: DEFAULT_LIFESTYLE_IMGS[(index + activeSlideIndex) % DEFAULT_LIFESTYLE_IMGS.length],
              alt: "",
          }))
    const background = /^#[a-f0-9]{6}$/i.test(activeSection.hero_background_color)
        ? activeSection.hero_background_color
        : HERO_BG

    return (
        <section
            aria-label="Featured collections"
            aria-roledescription="carousel"
            onMouseEnter={() => setInteracting(true)}
            onMouseLeave={() => setInteracting(false)}
            onFocusCapture={() => setInteracting(true)}
            onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false)
            }}
            style={{
                minHeight: "92vh",
                background,
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
                key={`slide-images-${activeSlideIndex}`}
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
                {images.map((image, i) => (
                    <div
                        key={`${image.url}-${i}`}
                        style={{ flex: 1, overflow: "hidden", position: "relative" }}
                    >
                        <Image
                            src={image.url}
                            alt={image.alt}
                            sizes="30vw"
                            loading="eager"
                            fill
                            style={{ objectFit: "cover", objectPosition: "center top" }}
                        />
                    </div>
                ))}
            </div>

            {/* Content */}
            <div
                role="group"
                aria-roledescription="slide"
                aria-label={`${(heroIdx % slideCount) + 1} of ${slideCount}`}
                key={heroIdx}
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

            {/* Slide dots */}
            {slideCount > 1 && (
                <div
                    style={{
                        position: "relative",
                        zIndex: 2,
                        display: "flex",
                        justifyContent: "center",
                        gap: 8,
                        marginTop: 32,
                    }}
                >
                    <button
                        type="button"
                        onClick={() => setPaused((value) => !value)}
                        aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                        style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                            color: T.ink,
                            fontSize: 12,
                        }}
                    >
                        {paused ? "Play" : "Pause"}
                    </button>
                    {heroSection.map((_, i) => (
                        <button
                            key={i}
                            aria-label={`Show slide ${i + 1}`}
                            aria-current={i === heroIdx % slideCount ? "true" : undefined}
                            onClick={() => setHeroIdx(i)}
                            style={{
                                width: i === heroIdx % slideCount ? 32 : 8,
                                height: 8,
                                borderRadius: 4,
                                border: "none",
                                cursor: "pointer",
                                background: i === heroIdx % slideCount ? accent : "#CCC",
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
