import { T } from "@/src/lib/tokens"
import { CartProvider } from "@/src/lib/cart-context"
import { CartDrawer } from "@/src/components/layouts/CartDrawer"
import { Navbar } from "@/src/components/layouts/Navbar"
import { Ticker } from "@/src/components/layouts/Ticker"
import { Footer } from "@/src/components/layouts/Footer"
import { getNavbarandFooter, getNavbarMenu } from "@/src/action/pageController"
import ToastCard from "@/src/components/cards/toast-card"
import { FaWhatsapp } from "react-icons/fa"

const EcommerceLayout = async ({ children }: { children: React.ReactNode }) => {
    const [footerandnavbar, navItems] = await Promise.all([getNavbarandFooter(), getNavbarMenu()])
    return (
        <div
            style={{
                position: 'relative',
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
                    <FaWhatsapp className="text-white" />
                </a>
                <CartDrawer />
                <Navbar footerandnavbar={footerandnavbar} navItems={navItems} />
                <Ticker footerandnavbar={footerandnavbar} />
                {children}
                <Footer footerandnavbar={footerandnavbar} />
                <ToastCard />
            </CartProvider>
        </div>
    )
}

export default EcommerceLayout
