import { getLocations } from "@/src/action/productController"
import { CheckoutPage } from "@/src/components/sections/CheckoutPage"

export const metadata = { title: "Checkout - HTW — Hope's Trendy World" }

const CheckoutRoute = async () => {
    const locations = await getLocations()
    return (
        <main>
            <CheckoutPage locations={locations} />
        </main>
    )
}

export default CheckoutRoute
