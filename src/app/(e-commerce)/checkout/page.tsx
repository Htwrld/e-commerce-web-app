import { getLocations } from "@/src/action/productController"
import { CheckoutPage } from "@/src/components/sections/CheckoutPage"

export const metadata = { title: "Checkout" }

const CheckoutRoute = async () => {
    const locations = await getLocations()
    return (
        <main>
            <CheckoutPage locations={locations} />
        </main>
    )
}

export default CheckoutRoute
