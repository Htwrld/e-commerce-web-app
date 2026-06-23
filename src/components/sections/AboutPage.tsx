"use client"

import { T } from "@/src/lib/tokens"
import Link from "next/link"

type PageContent = {
    title: string
    bible_verse: string
    in_our_words: string
    why_we_exist: string
    our_product_range: string
    faith_at_the_center: string
    our_community: string
    our_vision: string
    call_to_action_title: string
    call_to_action_description: string
    call_to_action_tagline: string
}

export const AboutPage = ({ pageContent }: { pageContent: PageContent }) => {
    const sections = [
        {
            title: "Why We Exist",
            color: T.rust,
            text: pageContent.why_we_exist,
        },
        {
            title: "Our Product Range",
            color: T.cobalt,
            text: pageContent.our_product_range,
        },
        {
            title: "Faith at the Centre",
            color: T.sage,
            text: pageContent.faith_at_the_center,
        },
        {
            title: "Our Community",
            color: T.gold,
            text: pageContent.our_community,
        },
        {
            title: "Our Vision",
            color: T.rust,
            text: pageContent.our_vision,
        },
    ]

    return (
        <div>
            <section
                style={{
                    background: "linear-gradient(135deg,#DCF0E6,#A8D8BC)",
                    padding: "88px 28px",
                    textAlign: "center",
                }}
            >
                <p className="section-label" style={{ color: T.sage }}>
                    OUR STORY
                </p>
                <h1
                    className="section-title"
                    style={{ fontSize: "clamp(36px,7vw,66px)", marginBottom: 16 }}
                >
                    {pageContent.title}
                </h1>
                <p
                    style={{
                        fontFamily: "'EB Garamond',serif",
                        fontSize: "clamp(16px,2.5vw,22px)",
                        fontStyle: "italic",
                        color: "#444",
                        maxWidth: 560,
                        margin: "0 auto",
                    }}
                >
                    {pageContent.bible_verse}
                </p>
            </section>

            <section style={{ maxWidth: 860, margin: "0 auto", padding: "80px 28px" }}>
                <div style={{ marginBottom: 56, textAlign: "center" }}>
                    <p className="section-label" style={{ textAlign: "center" }}>
                        IN OUR OWN WORDS
                    </p>
                    <div className="divider" style={{ margin: "12px auto 24px" }} />
                    <p
                        style={{
                            fontFamily: "'EB Garamond',serif",
                            fontSize: "clamp(18px,3vw,26px)",
                            fontStyle: "italic",
                            color: T.charcoal,
                            lineHeight: 1.8,
                            margin: 0,
                        }}
                    >
                        {pageContent.in_our_words}
                    </p>
                </div>

                {sections.map((s, i) => (
                    <div
                        key={i}
                        style={{
                            marginBottom: 48,
                            display: "grid",
                            gridTemplateColumns: "4px 1fr",
                            gap: 20,
                            alignItems: "start",
                        }}
                    >
                        <div
                            style={{
                                background: s.color,
                                width: 4,
                                height: "100%",
                                borderRadius: 2,
                                marginTop: 6,
                            }}
                        />
                        <div>
                            <h2
                                style={{
                                    fontFamily: "'Cormorant Garamond',serif",
                                    fontSize: "clamp(20px,3vw,28px)",
                                    fontWeight: 600,
                                    margin: "0 0 12px",
                                    color: s.color,
                                }}
                            >
                                {s.title}
                            </h2>
                            <p
                                style={{
                                    fontSize: "clamp(14px,1.8vw,16px)",
                                    color: T.muted,
                                    lineHeight: 2,
                                    margin: 0,
                                    fontFamily: "'EB Garamond',serif",
                                    whiteSpace: 'pre-wrap'
                                }}
                            >
                                {s.text}
                            </p>
                        </div>
                    </div>
                ))}

                <div
                    style={{
                        background: `linear-gradient(135deg,${T.goldPale},#FFE8B8)`,
                        border: `2px solid ${T.gold}44`,
                        borderRadius: 16,
                        padding: 40,
                        textAlign: "center",
                        marginTop: 56,
                    }}
                >
                    <div style={{ fontSize: 56, marginBottom: 16 }}>✝</div>
                    <h3
                        style={{
                            fontFamily: "'Cormorant Garamond',serif",
                            fontSize: 30,
                            fontWeight: 600,
                            color: T.ink,
                            margin: "0 0 12px",
                        }}
                    >
                        {pageContent.call_to_action_title}
                    </h3>
                    <p
                        style={{
                            fontFamily: "'EB Garamond',serif",
                            fontSize: 20,
                            fontStyle: "italic",
                            color: T.charcoal,
                            margin: "0 0 10px",
                            lineHeight: 1.7,
                        }}
                    >
                        {pageContent.call_to_action_tagline}
                    </p>
                    <p style={{ fontSize: 13, color: T.muted }}>
                        {pageContent.call_to_action_description}
                    </p>
                    <div style={{ marginTop: 24 }}>
                        <Link className="btn-primary" href="/shop">
                            Shop the Movement →
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
