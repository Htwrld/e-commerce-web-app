"use client"

import Image from "next/image"
import { T } from "@/src/lib/tokens"
import { Badge } from "@/src/components/cards/Badge"
import { VerseChip } from "@/src/components/cards/VerseChip"
import { WABtn } from "@/src/components/cards/WABtn"
import { Product } from "@/src/action/productController"

interface ProductCardProps {
    product: Product
    onAdd: (product: Product) => void
    onClick: (product: Product) => void
}

export function ProductCard({ product: p, onAdd, onClick }: ProductCardProps) {
    return (
        <div
            onClick={() => onClick(p)}
            className="card"
            style={{
                background: T.white,
                border: `1px solid ${T.border}`,
                borderRadius: 14,
                overflow: "hidden",
                cursor: "pointer",
            }}
        >
            {/* Image area */}
            <div style={{ height: 220, position: "relative", overflow: "hidden" }}>
                {p.photo ? (
                    <Image
                        src={p.photo}
                        alt={p.name}
                        height={700}
                        width={500}
                        className="h-full w-full object-cover object-center"
                        onError={(e) =>
                            ((e.currentTarget as HTMLImageElement).style.display = "none")
                        }
                    />
                ) : (
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 64,
                        }}
                    >
                        👕
                    </div>
                )}
                <div className="absolute top-0 z-10 flex w-full items-center justify-between p-3">
                    <Badge text={p.badge.toUpperCase()} color={T.gold} />
                    <div
                        style={{
                            background: "rgba(255,255,255,0.9)",
                            color: T.muted,
                            borderRadius: 5,
                            padding: "2px 10px",
                            fontSize: 10,
                            fontFamily: "monospace",
                            fontWeight: 700,
                        }}
                    >
                        {p.gender.toUpperCase()}
                    </div>
                </div>
            </div>

            {/* Info area */}
            <div style={{ padding: "16px 18px 18px" }}>
                <div
                    style={{
                        fontSize: 10,
                        color: T.muted,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: 3,
                    }}
                >
                    {p.badge}
                </div>
                <h3
                    style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: 18,
                        fontWeight: 600,
                        margin: "0 0 2px",
                        color: T.ink,
                        lineHeight: 1.2,
                    }}
                >
                    {p.name}
                </h3>
                <div style={{ fontSize: 12, color: T.muted, marginBottom: 8, fontStyle: "italic" }}>
                    {p.description.replaceAll("\n", " ")}
                </div>
                <p
                    style={{
                        fontSize: 12,
                        color: T.muted,
                        lineHeight: 1.6,
                        margin: "0 0 10px",
                        fontStyle: "italic",
                    }}
                >
                    {p.quotes}
                </p>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 10,
                    }}
                >
                    <span style={{ fontSize: 18, color: T.rust, fontWeight: 700 }}>{p.price}</span>
                    <span style={{ fontSize: 12, color: "#BBB" }}>{p.price}</span>
                </div>
                <div style={{ marginBottom: 12 }}>
                    <VerseChip verse={p.bible_verse} verseText={p.bible_verse_content} />
                </div>
                <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
                    {p.colors.map((c, i) => (
                        <div
                            key={i}
                            style={{
                                width: 14,
                                height: 14,
                                borderRadius: "50%",
                                background: c,
                                border: `2px solid ${T.border}`,
                            }}
                        />
                    ))}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onAdd(p)
                        }}
                        className="btn-primary"
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            padding: "9px 0",
                            fontSize: 12,
                        }}
                    >
                        Add to Cart
                    </button>
                    <WABtn text="Order" product={p.name} />
                </div>
            </div>
        </div>
    )
}
