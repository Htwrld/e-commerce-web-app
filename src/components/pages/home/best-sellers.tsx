"use client"

import Link from "next/link"
import { ProductCard } from "../../cards/ProductCard"
import { T } from "@/src/lib/tokens"
import { useCart } from "@/src/lib/cart-context"
import { useProductDetail } from "@/src/hools/use-product-detail"
import { Product } from "@/src/action/productController"

const BestSellers = ({
    title,
    description,
    products,
    mobileNumber
}: {
    title: string
    description: string
    products: Product[]
    mobileNumber: string 
}) => {
    const { product: detailProd, setProduct: setDetailProd } = useProductDetail()
    const { addToCart } = useCart()
    const best = products.filter((p) => p.badge.toLowerCase().includes("bestseller")).slice(0, 8)
    return (
        <section style={{ background: T.warm, padding: "80px 28px" }}>
            <div style={{ maxWidth: 1160, margin: "0 auto" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        marginBottom: 40,
                        flexWrap: "wrap",
                        gap: 12,
                    }}
                >
                    <div>
                        <p className="section-label">🔥 TRENDING NOW</p>
                        <h2 className="section-title" style={{ fontSize: "clamp(28px,4vw,44px)" }}>
                            {title}
                        </h2>
                        <div className="divider" />
                        <p style={{ fontSize: 14, color: T.muted, marginTop: 8 }}>{description}</p>
                    </div>
                    <Link className="btn-outline-gold" href="/shop">
                        View All →
                    </Link>
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
                        gap: 18,
                    }}
                >
                    {best.map((p) => (
                        <ProductCard
                            key={p.id}
                            product={p}
                            onAdd={addToCart}
                            onClick={setDetailProd}
                            mobileNumber={mobileNumber}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default BestSellers
