"use client"

import { Product } from "@/src/action/productController"
import { ProductCard } from "@/src/components/cards/ProductCard"
import { ProductDetailModal } from "@/src/components/cards/ProductDetailModal"
import { useCart } from "@/src/lib/cart-context"

export const SingleProductView = ({
    product,
    products,
    mobileNumber,
}: {
    product: Product
    products: Product[]
    mobileNumber: string
}) => {
    const { addToCart } = useCart()
    const background = products.filter((p) => p.id !== product.id)

    return (
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "44px 28px" }}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
                    gap: 18,
                }}
            >
                {background.map((p) => (
                    <ProductCard
                        key={p.id}
                        product={p}
                        onAdd={addToCart}
                        mobileNumber={mobileNumber}
                    />
                ))}
            </div>
            <ProductDetailModal
                product={product}
                onAdd={addToCart}
                mobileNumber={mobileNumber}
            />
        </div>
    )
}
