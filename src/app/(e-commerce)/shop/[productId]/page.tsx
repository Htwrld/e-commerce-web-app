import { getProductById, getProducts } from "@/src/action/productController"
import { SingleProductView } from "@/src/components/sections/SingleProductView"
import { notFound } from "next/navigation"

const SingleProductPage = async ({
    params,
}: {
    params: Promise<{ productId: string }>
}) => {
    const { productId } = await params
    const product = await getProductById(parseInt(productId))

    if (!product) return notFound()

    const { products } = await getProducts({})

    return <SingleProductView product={product} products={products} />
}

export default SingleProductPage
