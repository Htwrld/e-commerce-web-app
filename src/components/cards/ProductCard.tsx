"use client"

import Image from "next/image"
import { T } from "@/src/lib/tokens"
import { Badge } from "@/src/components/cards/Badge"
import { VerseChip } from "@/src/components/cards/VerseChip"
import { WABtn } from "@/src/components/cards/WABtn"
import { Product } from "@/src/action/productController"
import { useCart } from "@/src/lib/cart-context"
import { useState } from "react"
import { reduceWords } from "@/src/lib/utils"
import Link from "next/link"

interface ProductCardProps {
    product: Product
    onAdd: (product: { product: Product; selectedColor: string; selectedSize: string }) => void
    onClick?: (product: Product) => void
    mobileNumber: string
    backHref?: string
}

export function ProductCard({ product: p, onAdd, onClick, mobileNumber, backHref }: ProductCardProps) {
    const [selectedColor, setSelectedColor] = useState<string>(p.colors[0])
    const [selectedSize, setSelectedSize] = useState<string>(p.sizes[0])
    const { cart, updateQty, removeFromCart } = useCart()
    const isInCart = cart.find((c) => c.id === p.id)
    const href = `/shop/${p.id}`
    return (
        <div
            className="card"
            style={{
                background: T.white,
                border: `1px solid ${T.border}`,
                borderRadius: 14,
                overflow: "hidden",
                cursor: "pointer",
            }}
        >
            <Link className="" href={href}>
                {/* Image area */}
                <div style={{ height: 220, position: "relative", overflow: "hidden" }}>
                    {p.photo ? (
                        <Image
                            src={p.photo}
                            alt={p.name}
                            className="h-full w-full object-cover object-center static!"
                            fill
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
                <div className="px-4 pt-4">
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
                    <div
                        style={{
                            fontSize: 12,
                            color: T.muted,
                            marginBottom: 8,
                            fontStyle: "italic",
                        }}
                    >
                        {reduceWords(p.description, 20)}
                    </div>
                    <p
                        style={{
                            fontSize: 8,
                            color: T.muted,
                            lineHeight: 1.6,
                            margin: "0 0 10px",
                            fontStyle: "italic",
                        }}
                    >
                        {p.quotes.length > 0 && `"${p.quotes}"`}
                    </p>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 10,
                        }}
                    >
                        <span style={{ fontSize: 18, color: T.rust, fontWeight: 700 }}>
                            ₦{parseFloat(p.price).toFixed(2)}
                        </span>
                        <span style={{ fontSize: 12, color: "#BBB" }}>
                            ${parseFloat(p.usd_price).toFixed(2)}
                        </span>
                    </div>
                    <div style={{ marginBottom: 12 }}>
                        <VerseChip verse={p.bible_verse} verseText={p.bible_verse_content} />
                    </div>
                    <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
                        {p.colors.map((c, i) => (
                            <div
                                key={i}
                                onClick={() => setSelectedColor(c)}
                                style={{
                                    width: 14,
                                    height: 14,
                                    borderRadius: "50%",
                                    background: c,
                                    border: `2px solid ${c} 80%`,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </Link>
            <div className="px-4 pb-4" style={{ display: "flex", gap: 8 }}>
                {isInCart ? (
                    <div
                        style={{
                            display: "flex",
                            flex: 1,
                            justifyContent: "between",
                            alignItems: "center",
                            gap: 8,
                        }}
                    >
                        <button
                            onClick={() => {
                                if (isInCart.qty === 1) {
                                    removeFromCart({
                                        id: isInCart.id,
                                        color: selectedColor,
                                        size: selectedSize,
                                    })
                                } else {
                                    updateQty({
                                        id: isInCart.id,
                                        qty: isInCart.qty - 1,
                                        color: selectedColor,
                                        size: selectedSize,
                                    })
                                }
                            }}
                            style={{
                                background: T.sand,
                                border: "none",
                                padding: "5px 15px",
                                borderRadius: 4,
                                cursor: "pointer",
                                fontSize: 14,
                                fontWeight: 700,
                            }}
                        >
                            -
                        </button>
                        <span style={{ fontSize: 13, fontWeight: 700 }}>{isInCart.qty}</span>
                        <button
                            onClick={() =>
                                updateQty({
                                    id: isInCart.id,
                                    qty: isInCart.qty + 1,
                                    color: selectedColor,
                                    size: selectedSize,
                                })
                            }
                            style={{
                                background: T.sand,
                                border: "none",
                                padding: "5px 15px",
                                borderRadius: 4,
                                cursor: "pointer",
                                fontSize: 14,
                                fontWeight: 700,
                            }}
                        >
                            +
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onAdd({
                                product: p,
                                selectedColor,
                                selectedSize,
                            })
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
                )}
                <WABtn text="Order" product={p.name} number={mobileNumber} />
            </div>
        </div>
    )
}
