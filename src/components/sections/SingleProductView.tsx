"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { T } from "@/src/lib/tokens"
import { Product } from "@/src/action/productController"
import { Badge } from "@/src/components/cards/Badge"
import { VerseChip } from "@/src/components/cards/VerseChip"
import { useCart } from "@/src/lib/cart-context"
import { reduceWords } from "@/src/lib/utils"
import { CommentsSection } from "@/src/components/sections/CommentsSection"

export const SingleProductView = ({
    product: p,
    products,
}: {
    product: Product
    products: Product[]
}) => {
    const { cart, addToCart, updateQty, removeFromCart } = useCart()
    const [selectedColor, setSelectedColor] = useState<string>(p.colors[0])
    const [selectedSize, setSelectedSize] = useState<string>(p.sizes[0])
    const isInCart = cart.find((c) => c.id === p.id)
    const related = products.filter((product) => product.id !== p.id).slice(0, 3)

    return (
        <main>
            <div
                style={{
                    maxWidth: 1160,
                    margin: "0 auto",
                    padding: "44px 28px 60px",
                    display: "flex",
                    gap: 48,
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                }}
            >
                <div style={{ flex: "1 1 640px", minWidth: 0 }}>
                    <div
                        style={{
                            position: "relative",
                            width: "100%",
                            height: 420,
                            borderRadius: 14,
                            overflow: "hidden",
                            marginBottom: 24,
                            background: T.warm,
                        }}
                    >
                        {p.photo ? (
                            <Image
                                src={p.photo}
                                alt={p.name}
                                fill
                                className="h-full w-full object-cover object-center static!"
                            />
                        ) : (
                            <div
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 80,
                                }}
                            >
                                👕
                            </div>
                        )}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <Badge text={p.badge} />
                        {!(
                            p.gender.toLowerCase() === "unisex" &&
                            p.categories.some((c) => c.toLowerCase() === "ankara")
                        ) && (
                            <span style={{ fontSize: 11, color: T.muted, fontFamily: "monospace" }}>
                                {p.gender.toUpperCase()}
                            </span>
                        )}
                    </div>

                    <h1
                        className="section-title"
                        style={{ fontSize: "clamp(28px,4.5vw,42px)", marginBottom: 6 }}
                    >
                        {p.name}
                    </h1>

                    <div
                        style={{
                            fontSize: 14,
                            color: T.muted,
                            fontStyle: "italic",
                            marginBottom: 16,
                        }}
                    >
                        {reduceWords(p.description, 30)}
                    </div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            marginBottom: 16,
                        }}
                    >
                        <span style={{ fontSize: 26, color: T.rust, fontWeight: 700 }}>
                            ₦{parseFloat(p.price).toFixed(2)}
                        </span>
                        <span style={{ fontSize: 15, color: T.muted }}>
                            ${parseFloat(p.usd_price).toFixed(2)}
                        </span>
                    </div>

                    {p.quotes && (
                        <p
                            style={{
                                fontSize: 15,
                                color: T.charcoal,
                                lineHeight: 1.8,
                                marginBottom: 16,
                                fontStyle: "italic",
                            }}
                        >
                            &ldquo;{p.quotes}&rdquo;
                        </p>
                    )}

                    <div style={{ marginBottom: 20 }}>
                        <VerseChip verse={p.bible_verse} verseText={p.bible_verse_content} />
                    </div>

                    {p.colors.length > 0 && (
                        <div style={{ marginBottom: 18 }}>
                            <div
                                style={{
                                    fontSize: 12,
                                    color: T.muted,
                                    marginBottom: 8,
                                    letterSpacing: "0.05em",
                                }}
                            >
                                AVAILABLE COLOURS
                            </div>
                            <div style={{ display: "flex", gap: 8 }}>
                                {p.colors.map((c, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setSelectedColor(c)}
                                        style={{
                                            width: 24,
                                            height: 24,
                                            borderRadius: "50%",
                                            background: c,
                                            border: `2px solid ${selectedColor === c ? T.gold : T.border}`,
                                            cursor: "pointer",
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {p.sizes.length > 0 && (
                        <div style={{ marginBottom: 22 }}>
                            <div
                                style={{
                                    fontSize: 12,
                                    color: T.muted,
                                    marginBottom: 8,
                                    letterSpacing: "0.05em",
                                }}
                            >
                                SELECT SIZE
                            </div>
                            <div style={{ display: "flex", gap: 8 }}>
                                {p.sizes.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setSelectedSize(s)}
                                        style={{
                                            background: T.sand,
                                            border: `1px solid ${selectedSize === s ? T.gold : T.border}`,
                                            color: T.ink,
                                            padding: "6px 12px",
                                            borderRadius: 6,
                                            fontSize: 12,
                                            cursor: "pointer",
                                            fontFamily: "'Georgia',serif",
                                        }}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div style={{ display: "flex", gap: 10, marginBottom: 32 }}>
                        {isInCart ? (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: 8,
                                    width: "100%",
                                    maxWidth: 220,
                                }}
                            >
                                <button
                                    className="px-10 py-1"
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
                                        borderRadius: 4,
                                        cursor: "pointer",
                                        fontSize: 14,
                                        fontWeight: 700,
                                    }}
                                >
                                    -
                                </button>
                                <span style={{ fontSize: 16, fontWeight: 700 }}>
                                    {isInCart.qty}
                                </span>
                                <button
                                    className="px-10 py-1"
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
                                className="btn-primary"
                                style={{ justifyContent: "center", padding: "12px 32px" }}
                                onClick={() =>
                                    addToCart({
                                        product: p,
                                        selectedColor,
                                        selectedSize,
                                    })
                                }
                            >
                                Add to Cart
                            </button>
                        )}
                    </div>

                    <div
                        style={{ padding: 14, background: T.warm, borderRadius: 8 }}
                    >
                        <div
                            style={{
                                fontSize: 12,
                                fontWeight: 700,
                                color: T.charcoal,
                                marginBottom: 10,
                                letterSpacing: "0.06em",
                            }}
                        >
                            PRODUCT DETAILS
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                            {[
                                ["🧵 Fabric", p.fabric],
                                ["📐 Fit", p.fit],
                                ["✂️ Care", p.care],
                                ["🚚 Delivery", p.delivery],
                            ]
                                .filter(([, val]) => val)
                                .map(([label, val]) => (
                                    <div
                                        key={label}
                                        style={{
                                            background: T.white,
                                            borderRadius: 6,
                                            padding: "8px 10px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: 11,
                                                fontWeight: 700,
                                                color: T.gold,
                                                marginBottom: 2,
                                            }}
                                        >
                                            {label}
                                        </div>
                                        <div style={{ fontSize: 12, color: T.muted }}>{val}</div>
                                    </div>
                                ))}
                        </div>
                        {p.size_guide && (
                            <div style={{ marginTop: 10, fontSize: 12, color: T.muted }}>
                                📏 Size guide: {p.size_guide}
                            </div>
                        )}
                    </div>

                    <CommentsSection postId={p.id} />
                </div>

                {related.length > 0 && (
                    <aside style={{ flex: "1 1 280px", maxWidth: 340, width: "100%" }}>
                        <h2 className="section-title" style={{ fontSize: 20, marginBottom: 18 }}>
                            More Products
                        </h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                            {related.map((product) => (
                                <SidebarProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </aside>
                )}
            </div>
        </main>
    )
}

const SidebarProductCard = ({ product: p }: { product: Product }) => {
    return (
        <Link
            href={`/shop/${p.id}`}
            style={{
                display: "flex",
                gap: 14,
                textDecoration: "none",
                paddingBottom: 18,
                borderBottom: `1px solid ${T.border}`,
            }}
        >
            <div
                style={{
                    position: "relative",
                    flex: "0 0 84px",
                    width: 84,
                    height: 84,
                    borderRadius: 10,
                    overflow: "hidden",
                    background: T.warm,
                }}
            >
                {p.photo ? (
                    <Image
                        src={p.photo}
                        alt={p.name}
                        fill
                        className="h-full w-full object-cover object-center static!"
                    />
                ) : (
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 22,
                        }}
                    >
                        👕
                    </div>
                )}
            </div>
            <div style={{ minWidth: 0 }}>
                <h3
                    style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: 16,
                        fontWeight: 600,
                        margin: "0 0 6px",
                        color: T.ink,
                        lineHeight: 1.3,
                    }}
                >
                    {p.name}
                </h3>
                <div style={{ fontSize: 11, color: T.muted }}>
                    ₦{parseFloat(p.price).toFixed(2)}
                </div>
            </div>
        </Link>
    )
}
