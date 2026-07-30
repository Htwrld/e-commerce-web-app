"use client"

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


export const ProductDetailProvider = ({
    children,
    mobileNumber,
}: {
    children: React.ReactNode
    mobileNumber: string
}) => { 
    const [product, setProduct] = useState<Product | null>(null)
    const { addToCart } = useCart()
    const open = product !== null
    return (
        <productDetailContext.Provider value={{ product, setProduct }}>
            {product && (
                <ProductDetailModal
                    product={product}
                    open
                    onClose={() => setProduct(null)}
                    onAdd={addToCart}
                    mobileNumber={mobileNumber}
                />
            )}
            {children}
        </productDetailContext.Provider>
    )
}

export const useProductDetail = () => {
    return useContext(productDetailContext)
}
