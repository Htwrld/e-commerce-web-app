'use client'

import { createContext, useContext, useState } from "react"
import { ProductDetailModal } from "../components/cards/ProductDetailModal"
import { useCart } from "../lib/cart-context"
import { Product } from "../action/productController"

type ProductDetailContext = {
    product: Product | null
    setProduct: React.Dispatch<React.SetStateAction<Product | null>>
}

const productDetailContext = createContext<ProductDetailContext>({
    product: null,
    setProduct: () => {},
})

export const ProductDetailProvider = ({ children }: { children: React.ReactNode }) => {
    const [product, setProduct] = useState<Product | null>(null)
    const { addToCart } = useCart()

    return (
        <productDetailContext.Provider value={{ product, setProduct }}>
            {product && (
                <ProductDetailModal
                    product={product}
                    onClose={() => setProduct(null)}
                    onAdd={addToCart}
                />
            )}
            {children}
        </productDetailContext.Provider>
    )
}

export const useProductDetail = () => {
    return useContext(productDetailContext)
}
