"use client"

import { T } from "@/src/lib/tokens"
import { Badge } from "@/src/components/cards/Badge"
import Link from "next/link"

const COLLECTIONS = [
    {
        id: "easter",
        name: "He Wore It First",
        subtitle: "Easter 2026 Collection",
        verse: '"He humbled himself… therefore God exalted him." — Philippians 2:8–9',
        tag: "NEW DROP",
        bg: "linear-gradient(135deg,#F5E0DC,#F5B8A8)",
        accent: T.rust,
        emoji: "🧥",
        cat: "Hoodies",
    },
    {
        id: "grace",
        name: "Grace Season",
        subtitle: "Summer 2026",
        verse: '"My grace is sufficient for you." — 2 Corinthians 12:9',
        tag: "COMING SOON",
        bg: "linear-gradient(135deg,#DCF0E6,#A8D8BC)",
        accent: T.sage,
        emoji: "🟩",
        cat: "Joggers",
    },
    {
        id: "crowned",
        name: "Crowned",
        subtitle: "Signature Classics",
        verse: '"You are a chosen people, a royal priesthood." — 1 Peter 2:9',
        tag: "BESTSELLER",
        bg: "linear-gradient(135deg,#DCE8F5,#A8C4E8)",
        accent: T.cobalt,
        emoji: "👑",
        cat: "Sweatshirts",
    },
]

export function CollectionsPage() {
    return (
        <div>
            <section
                style={{
                    background: "linear-gradient(135deg,#FDF0DC,#F5D898)",
                    padding: "72px 28px",
                    textAlign: "center",
                }}
            >
                <p className="section-label">SEASON DROPS</p>
                <h1 className="section-title" style={{ fontSize: "clamp(32px,7vw,60px)" }}>
                    Our Collections
                </h1>
                <div className="divider" style={{ margin: "14px auto" }} />
                <p style={{ fontSize: 15, color: T.muted, maxWidth: 500, margin: "0 auto" }}>
                    Every collection is a season. Every season tells a story rooted in faith.
                </p>
            </section>

            {COLLECTIONS.map((col, i) => (
                <div
                    key={col.id}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                    }}
                >
                    <div
                        style={{
                            background: col.bg,
                            minHeight: 320,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 100,
                            order: i % 2 === 0 ? 0 : 1,
                        }}
                    >
                        {col.emoji}
                    </div>
                    <div
                        style={{
                            background: T.white,
                            padding: "52px 44px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            order: i % 2 === 0 ? 1 : 0,
                        }}
                    >
                        <Badge text={col.tag} />
                        <h2
                            style={{
                                fontFamily: "'Cormorant Garamond',serif",
                                fontSize: "clamp(26px,4vw,44px)",
                                fontWeight: 600,
                                margin: "14px 0 6px",
                                color: T.ink,
                            }}
                        >
                            {col.name}
                        </h2>
                        <div style={{ fontSize: 13, color: T.muted, marginBottom: 16 }}>
                            {col.subtitle}
                        </div>
                        <p
                            style={{
                                fontFamily: "'EB Garamond',serif",
                                fontSize: 17,
                                fontStyle: "italic",
                                color: T.charcoal,
                                lineHeight: 1.8,
                                margin: "0 0 28px",
                            }}
                        >
                            {col.verse}
                        </p>
                        <Link
                            className="btn-primary"
                            style={{ alignSelf: "flex-start" }}
                            href={`/shop?cat=${col.cat}`}
                        >
                            Shop This Collection →
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}
