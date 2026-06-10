import { T } from "@/src/lib/tokens"
import { Navbar } from "@/src/components/layouts/Navbar"
import { Ticker } from "@/src/components/layouts/Ticker"
import { CartDrawer } from "@/src/components/layouts/CartDrawer"
import { Footer } from "@/src/components/layouts/Footer"
import { HomePage } from "@/src/components/sections/HomePage"
import { getPageById } from "@/src/action/pageController"

const MainPage = async () => {
    const homepage = await getPageById(24)
    console.log(homepage)
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
            {/* Floating WhatsApp */}
            <a
                href="https://wa.me/2348000000000"
                target="_blank"
                rel="noreferrer"
                className="wa-float"
                title="Chat with us"
            >
                💬
            </a>

            

            <CartDrawer />
            <Navbar />
            <Ticker />

            <main>
                <HomePage   />
            </main>

            <Footer />
        </div>
    )
}

export default MainPage
