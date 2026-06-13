"use client"

import Link from "next/link"
import { ProductCard } from "../../cards/ProductCard"
import { T } from "@/src/lib/tokens"
import { useCart } from "@/src/lib/cart-context"
import { useProductDetail } from "@/src/hools/use-product-detail"
import { getProducts } from "@/src/action/productController"

const FeaturedCollection = async ({
    title,
    description,
    tagline,
}: {
    title: string
    description: string
    tagline: string
}) => {
    const { product: detailProd, setProduct: setDetailProd } = useProductDetail()
    const { addToCart } = useCart()
    const newArr = (await getProducts()).filter((p) => p.badge === "NEW").slice(0, 4)
    return (
        <section style={{ padding: "80px 28px", maxWidth: 1160, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
                <p className="section-label">FEATURED COLLECTION</p>
                <h2
                    className="section-title"
                    style={{ fontSize: "clamp(30px,5vw,50px)", marginBottom: 12 }}
                >
                    {title}
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
                    {tagline}
                </p>
                <p style={{ fontSize: 14, color: T.muted, maxWidth: 560, margin: "0 auto" }}>
                    {description}
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
