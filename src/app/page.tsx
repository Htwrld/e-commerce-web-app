import { T } from "@/src/lib/tokens"
import { Navbar } from "@/src/components/layouts/Navbar"
import { Ticker } from "@/src/components/layouts/Ticker"
import { CartDrawer } from "@/src/components/layouts/CartDrawer"
import { Footer } from "@/src/components/layouts/Footer"
import { getPageById } from "@/src/action/pageController"
import { HeroSection } from "../components/pages/home/hero-section"
import BestSellers from "../components/pages/home/best-sellers"
import CategoriesNav from "../components/pages/home/categories-nav"
import LifestyleGallery from "../components/pages/home/lifestyle-gallery"
import FeaturedCollection from "../components/pages/home/featured-collection"
import PieceBanner from "../components/pages/home/piece-banner"
import WhyHTW from "../components/pages/home/why-htw"
import Testimonials from "../components/pages/home/testimonials"
import AmbassadorsStrip from "../components/pages/home/ambassadors-strip"
import FAQSection from "../components/pages/home/faqs"
import FinalCTA from "../components/pages/home/final-cta"
import BrandSection from "../components/pages/home/brand-section"
import TrustBar from "../components/pages/home/trust-bar"
import EmailNWhatsApp from "../components/pages/home/email-n-whatsapp"
import { ProductDetailProvider } from "../hools/use-product-detail"

const MainPage = async () => {
    const homepage = await getPageById(24)
    
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
                <ProductDetailProvider>
                    <HeroSection />
                    <TrustBar />
                    <BrandSection />
                    <BestSellers />
                    <CategoriesNav />
                    <LifestyleGallery />
                    <FeaturedCollection />
                    <PieceBanner />
                    <WhyHTW />
                    <Testimonials />
                    <AmbassadorsStrip />
                    <FAQSection />
                    <FinalCTA />
                    <EmailNWhatsApp />
                </ProductDetailProvider>
            </main>
            <Footer />
        </div>
    )
}

export default MainPage
