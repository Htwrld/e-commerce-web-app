"use client"

import { useState } from "react"
import { T } from "@/src/lib/tokens"
import { CATS, GENDERS, PRODUCTS } from "@/src/lib/data"
import { useCart } from "@/src/lib/cart-context"
import { ProductCard } from "@/src/components/cards/ProductCard"
import { ProductDetailModal } from "@/src/components/cards/ProductDetailModal"
import { getProducts, Product } from "@/src/action/productController"
import { useSearchParams } from "next/navigation"
import Pagination from "../cards/pagination"

export const ShopPage = ({
    products,
    mobileNumber,
    pages,
}: {
    products: Product[]
    mobileNumber: string
    pages: number
}) => {
    const [currProducts, setCurrProducts] = useState(products)
    const searchParams = useSearchParams()
    const cat = searchParams.get("cat")
    const [activeCat, setActiveCat] = useState(cat ? cat : "all")
    const [activeGen, setActiveGen] = useState("all")
    const { addToCart } = useCart()
    const [detailProd, setDetailProd] = useState<Product | null>(null)

    const filtered = currProducts.filter((p) => {
        const newCats = p.categories.map((c) => (c === "polos &amp; tees" ? "polos & tees" : c))
        const isCat = newCats.includes(activeCat)
        const isGen = p.gender.toLowerCase() === activeGen || p.gender.toLowerCase() === "unisex"
        return (activeCat === "all" || isCat) && (activeGen === "all" || isGen)
    })

    const handlePageChange = async (page: number) => {
        const { products, pages } = await getProducts(undefined, page)
        setCurrProducts(products)
    }

    return (
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "44px 28px" }}>
            {detailProd && (
                <ProductDetailModal
                    product={detailProd}
                    onClose={() => setDetailProd(null)}
                    onAdd={addToCart}
                    mobileNumber={mobileNumber}
                />
            )}

            <div style={{ marginBottom: 32 }}>
                <p className="section-label">Shop</p>
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
                {CATS.map((c) => {
                    return (
                        <button
                            key={c}
                            onClick={() => setActiveCat(c.toLowerCase())}
                            style={{
                                background: activeCat === c.toLowerCase() ? T.rust : "none",
                                border: `2px solid ${activeCat === c.toLowerCase() ? T.rust : T.border}`,
                                color: activeCat === c.toLowerCase() ? "#fff" : T.muted,
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
                    )
                })}
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
                        onClick={() => setActiveGen(g.toLowerCase())}
                        style={{
                            background: activeGen === g.toLowerCase() ? T.cobalt : "none",
                            border: `2px solid ${activeGen === g.toLowerCase() ? T.cobalt : T.border}`,
                            color: activeGen === g.toLowerCase() ? "#fff" : T.muted,
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
                            mobileNumber={mobileNumber}
                        />
                    ))}
                </div>
            )}
            <div className="mt-8">
                <Pagination pages={pages} handlePageChange={handlePageChange} />
            </div>
        </div>
    )
}
