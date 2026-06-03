"use client"

import { useState } from "react"
import { T } from "@/src/lib/tokens"
import { CATS, GENDERS, PRODUCTS, Product } from "@/src/lib/data"
import { useCart } from "@/src/lib/cart-context"
import { ProductCard } from "@/src/components/cards/ProductCard"
import { ProductDetailModal } from "@/src/components/cards/ProductDetailModal"

export function ShopPage() {
	const [activeCat, setActiveCat] = useState("All")
	const [activeGen, setActiveGen] = useState("All")
    const { addToCart } = useCart()
    const [detailProd, setDetailProd] = useState<Product | null>(null)

    const filtered = PRODUCTS.filter(
        (p) =>
            (activeCat === "All" || p.cat === activeCat) &&
            (activeGen === "All" || p.gender === activeGen || p.gender === "Unisex")
    )

    return (
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "44px 28px" }}>
            {detailProd && (
                <ProductDetailModal
                    product={detailProd}
                    onClose={() => setDetailProd(null)}
                    onAdd={addToCart}
                />
            )}

            <div style={{ marginBottom: 32 }}>
                <p className="section-label">SHOP</p>
                <h1 className="section-title" style={{ fontSize: "clamp(30px,5vw,50px)" }}>
                    All Pieces
                </h1>
                <div className="divider" />
            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flexWrap: "wrap",
                    marginBottom: 10,
                }}
            >
                <span
                    style={{
                        fontSize: 11,
                        letterSpacing: "0.14em",
                        color: T.gold,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        marginRight: 4,
                    }}
                >
                    Category:
                </span>
                {CATS.map((c) => (
                    <button
                        key={c}
                        onClick={() => setActiveCat(c)}
                        style={{
                            background: activeCat === c ? T.rust : "none",
                            border: `2px solid ${activeCat === c ? T.rust : T.border}`,
                            color: activeCat === c ? "#fff" : T.muted,
                            padding: "8px 20px",
                            borderRadius: 24,
                            fontSize: 13,
                            cursor: "pointer",
                            fontFamily: "'Georgia',serif",
                            letterSpacing: "0.04em",
                            transition: "all .2s",
                        }}
                    >
                        {c}
                    </button>
                ))}
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flexWrap: "wrap",
                    marginBottom: 36,
                }}
            >
                <span
                    style={{
                        fontSize: 11,
                        letterSpacing: "0.14em",
                        color: T.cobalt,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        marginRight: 4,
                    }}
                >
                    Gender:
                </span>
                {GENDERS.map((g) => (
                    <button
                        key={g}
                        onClick={() => setActiveGen(g)}
                        style={{
                            background: activeGen === g ? T.cobalt : "none",
                            border: `2px solid ${activeGen === g ? T.cobalt : T.border}`,
                            color: activeGen === g ? "#fff" : T.muted,
                            padding: "7px 16px",
                            borderRadius: 20,
                            fontSize: 12,
                            cursor: "pointer",
                            fontFamily: "'Georgia',serif",
                            transition: "all .2s",
                        }}
                    >
                        {g}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div
                    style={{
                        textAlign: "center",
                        padding: "80px 0",
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: 22,
                        color: T.muted,
                    }}
                >
                    No products match this filter.
                </div>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
                        gap: 18,
                    }}
                >
                    {filtered.map((p) => (
                        <ProductCard
                            key={p.id}
                            product={p}
                            onAdd={addToCart}
                            onClick={setDetailProd}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
