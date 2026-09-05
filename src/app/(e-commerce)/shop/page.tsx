import { getNavbarandFooter } from "@/src/action/pageController"
import { getProducts } from "@/src/action/productController"
import { ShopPage } from "@/src/components/sections/ShopPage"
import { Suspense } from "react"

export const metadata = { title: "Shop - HTW — Hope's Trendy World" }

const HTWContactApp = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    const params = await searchParams
    const cat = params.cat as string
    const gender = params.gender as string
    const badge = params.badge as string
    const page = params.page as string
    const { products, pages } = await getProducts({
        badge: badge ? badge : undefined,
        category: cat ? cat : undefined,
        gender: gender ? gender : undefined,
        page: page ? parseInt(page) : undefined,
    })
    const navbarandfooter = await getNavbarandFooter()
    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <ShopPage
                    products={products}
                    mobileNumber={navbarandfooter.site_mobile_number}
                    pages={pages}
                />
            </Suspense>
        </main>
    )
}

export default HTWContactApp
