import { getProducts } from "@/src/action/productController"
import { ShopPage } from "@/src/components/sections/ShopPage"

const HTWContactApp = async () => {
    const products = await getProducts()
    console.log(products[0].categories)
    return (
        <main>
            <ShopPage products={products} />
        </main>
    )
}

export default HTWContactApp
