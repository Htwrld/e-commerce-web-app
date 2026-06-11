"use client"

import Link from "next/link"
import { ProductCard } from "../../cards/ProductCard"
import { Product, PRODUCTS } from "@/src/lib/data"
import { T } from "@/src/lib/tokens"
import { useCart } from "@/src/lib/cart-context"
import { useState } from "react"

const FeaturedCollection = () => {
    const [detailProd, setDetailProd] = useState<Product | null>(null)
    const { addToCart } = useCart()
    const newArr = PRODUCTS.filter((p) => p.badge === "NEW").slice(0, 4)
    return (
        <section style={{ padding: "80px 28px", maxWidth: 1160, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
                <p className="section-label">FEATURED COLLECTION</p>
                <h2
                    className="section-title"
                    style={{ fontSize: "clamp(30px,5vw,50px)", marginBottom: 12 }}
                >
                    Grace Season Collection
                </h2>
                <div className="divider" style={{ margin: "14px auto" }} />
                <p
                    style={{
                        fontFamily: "'EB Garamond',serif",
                        fontSize: "clamp(15px,2vw,19px)",
                        fontStyle: "italic",
                        color: T.muted,
                        maxWidth: 600,
                        margin: "0 auto 8px",
                    }}
                >
                    Every season tells a story — and this one is yours.
                </p>
                <p style={{ fontSize: 14, color: T.muted, maxWidth: 560, margin: "0 auto" }}>
                    Crafted for individuals stepping into their purpose with confidence and clarity.
                </p>
            </div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
                    gap: 18,
                }}
            >
                {newArr.map((p) => (
                    <ProductCard key={p.id} product={p} onAdd={addToCart} onClick={setDetailProd} />
                ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 36 }}>
                <Link className="btn-primary" href="/shop">
                    Shop the Collection →
                </Link>
            </div>
        </section>
    )
}

export default FeaturedCollection
