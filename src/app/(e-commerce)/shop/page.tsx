import { getNavbarandFooter } from "@/src/action/pageController"
import { getProducts } from "@/src/action/productController"
import { ShopPage } from "@/src/components/sections/ShopPage"
import { Suspense } from "react"

const HTWContactApp = async () => {
    const products = await getProducts()
    const navbarandfooter = await getNavbarandFooter()
    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <ShopPage products={products} mobileNumber={navbarandfooter.site_mobile_number} />
            </Suspense>
        </main>
    )
}

export default HTWContactApp
