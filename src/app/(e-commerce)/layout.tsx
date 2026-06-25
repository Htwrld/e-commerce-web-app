import { T } from "@/src/lib/tokens"
import { CartProvider } from "@/src/lib/cart-context"
import { CartDrawer } from "@/src/components/layouts/CartDrawer"
import { Navbar } from "@/src/components/layouts/Navbar"
import { Ticker } from "@/src/components/layouts/Ticker"
import { Footer } from "@/src/components/layouts/Footer"
import { getNavbarandFooter } from "@/src/action/pageController"
import ToastCard from "@/src/components/cards/toast-card"

const EcommerceLayout = async ({ children }: { children: React.ReactNode }) => {
    const footerandnavbar = await getNavbarandFooter()
    return (
        <div
            style={{
                fontFamily: "'Georgia','Times New Roman',serif",
                background: T.cream,
                color: T.ink,
                minHeight: "100vh",
                overflowX: "hidden",
            }}
        >
            <CartProvider>
                <a
                    href={`https://wa.me/${footerandnavbar.site_mobile_number}`}
                    target="_blank"
                    rel="noreferrer"
                    className="wa-float"
                    title="Chat with us"
                >
                    💬
                </a>
                <CartDrawer />
                <Navbar footerandnavbar={footerandnavbar} />
                <Ticker footerandnavbar={footerandnavbar} />
                {children}
                <Footer footerandnavbar={footerandnavbar} />
                <ToastCard />
            </CartProvider>
        </div>
    )
}

export default EcommerceLayout
