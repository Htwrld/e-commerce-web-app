import { getProducts } from "@/src/action/productController"
import { ShopPage } from "@/src/components/sections/ShopPage"

const HTWContactApp = async () => {
    const products = await getProducts()

    return (
        <main>
            <ShopPage products={products} />
        </main>
    )
}

export default HTWContactApp
