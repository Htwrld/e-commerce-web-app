import { getNavbarandFooter } from "@/src/action/pageController"
import { getProductById, getProducts } from "@/src/action/productController"
import { SingleProductView } from "@/src/components/sections/SingleProductView"
import { notFound } from "next/navigation"

const SingleProductPage = async ({
    params,
    searchParams,
}: {
    params: Promise<{ productId: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    const { productId } = await params
    const { from } = await searchParams
    const product = await getProductById(parseInt(productId))

    if (!product) return notFound()

    const [navbarandfooter, { products }] = await Promise.all([
        getNavbarandFooter(),
        getProducts({}),
    ])

    return (
        <SingleProductView
            product={product}
            products={products}
            mobileNumber={navbarandfooter.site_mobile_number}
        />
    )
}

export default SingleProductPage
