import { getProducts } from "@/src/action/productController"
import { ShopPage } from "@/src/components/sections/ShopPage"
import { Suspense } from "react"

const HTWContactApp = async () => {
    const products = await getProducts()

    return (
        <main>
            <Suspense fallback={<div></div>}>
                <ShopPage products={products} />
            </Suspense>
        </main>
    )
}

export default HTWContactApp
