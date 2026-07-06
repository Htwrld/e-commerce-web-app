"use client"

import { useState } from "react"
import { T } from "@/src/lib/tokens"
import { CATS, GENDERS } from "@/src/lib/data"
import { useCart } from "@/src/lib/cart-context"
import { ProductCard } from "@/src/components/cards/ProductCard"
import { ProductDetailModal } from "@/src/components/cards/ProductDetailModal"
import { Product } from "@/src/action/productController"
import { useSearchParams } from "next/navigation"
import Pagination from "../cards/pagination"
import Link from "next/link"

export const ShopPage = ({
    products,
    mobileNumber,
    pages,
}: {
    products: Product[]
    mobileNumber: string
    pages: number
}) => {
    const searchParams = useSearchParams()
    const activeCat = searchParams.get("cat") ?? "all"
    const activeGen = searchParams.get("gender") ?? "all"
    const activeBadge = searchParams.get("badge") ?? "all"
    const activePage = parseInt(searchParams.get("page") ?? "1")
    const { addToCart } = useCart()
    const [detailProd, setDetailProd] = useState<Product | null>(null)

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
                        <Link
                            key={c.slug}
                            href={
                                c.slug === "all"
                                    ? `/shop`
                                    : `/shop?cat=${c.slug}${activeGen && activeGen !== "all" ? `&gender=${activeGen}` : ""}${activeBadge && activeBadge !== "all" ? `&badge=${activeBadge}` : ""}`
                            }
                            style={{
                                background: activeCat === c.slug ? T.rust : "none",
                                border: `2px solid ${activeCat === c.slug ? T.rust : T.border}`,
                                color: activeCat === c.slug ? "#fff" : T.muted,
                                padding: "8px 20px",
                                borderRadius: 24,
                                fontSize: 13,
                                cursor: "pointer",
                                fontFamily: "'Georgia',serif",
                                letterSpacing: "0.04em",
                                transition: "all .2s",
                            }}
                        >
                            {c.name}
                        </Link>
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
                    <Link
                        key={g}
                        href={
                            g.toLowerCase() === "all"
                                ? `/shop`
                                : `/shop?gender=${g.toLowerCase()}${activeCat && activeCat !== "all" ? `&cat=${activeCat}` : ""}${activeBadge && activeBadge !== "all" ? `&badge=${activeBadge}` : ""}`
                        }
                        style={{
                            background:
                                activeGen?.toLowerCase() === g.toLowerCase() ? T.cobalt : "none",
                            border: `2px solid ${activeGen?.toLowerCase() === g.toLowerCase() ? T.cobalt : T.border}`,
                            color: activeGen?.toLowerCase() === g.toLowerCase() ? T.white : T.muted,
                            padding: "7px 16px",
                            borderRadius: 20,
                            fontSize: 12,
                            cursor: "pointer",
                            fontFamily: "'Georgia',serif",
                            transition: "all .2s",
                        }}
                    >
                        {g}
                    </Link>
                ))}
            </div>

            {products.length === 0 ? (
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
                    {products.map((p) => (
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
                <Pagination
                    pages={pages}
                    activePage={activePage}
                    activeBadge={activeBadge}
                    activeCat={activeCat}
                    activeGen={activeGen}
                />
            </div>
        </div>
    )
}
