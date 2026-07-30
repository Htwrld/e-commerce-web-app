'use client'

import { Product } from "@/src/action/productController"
import { ProductDetailModal } from "@/src/components/cards/ProductDetailModal"
import { useEffect, useState } from "react"

const SingleProductPage = ({ productId }: { productId: string }) => {
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true)
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/wp-json/wp/v2/product/${productId}?acf_format=standard`
            )
            const data = await res.json()
            setProduct(data)
            setLoading(false)
        }
        fetchProduct()
    }, [productId])

    if (loading) return <div>Loading...</div>

    if (!product) return <div>Product not found</div>

    return (
        <div>
            <ProductDetailModal
                product={product}
                onAdd={() => console.log("Adding to cart")}
                mobileNumber={'3232232'}
            />
            SingleProductPage
        </div>
    )
}

export default SingleProductPage
