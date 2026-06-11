"use client"

import { useState } from "react"
import { Product } from "@/src/lib/data"
import { useCart } from "@/src/lib/cart-context"
import { HeroSection } from "@/src/components/pages/home/hero-section"
import { ProductDetailModal } from "@/src/components/cards/ProductDetailModal"
import TrustBar from "../pages/home/trust-bar"
import BrandSection from "../pages/home/brand-section"
import BestSellers from "../pages/home/best-sellers"
import CategoriesNav from "../pages/home/categories-nav"
import LifestyleGallery from "../pages/home/lifestyle-gallery"
import FeaturedCollection from "../pages/home/featured-collection"
import PieceBanner from "../pages/home/piece-banner"
import Testimonials from "../pages/home/testimonials"
import AmbassadorsStrip from "../pages/home/ambassadors-strip"
import FAQSection from "../pages/home/faqs"
import WhyHTW from "../pages/home/why-htw"
import FinalCTA from "../pages/home/final-cta"


const HomePageContent = ({}) => {
    const { addToCart } = useCart()
    const [detailProd, setDetailProd] = useState<Product | null>(null)
    
    

    return (
        <div>
            {detailProd && (
                <ProductDetailModal
                    product={detailProd}
                    onClose={() => setDetailProd(null)}
                    onAdd={addToCart}
                />
            )}

            {/* ── 1. HERO ── */}
            <HeroSection />

            {/* ── 2. TRUST BAR ── */}
            <TrustBar />

            {/* ── 3. BRAND STATEMENT ── */}
            <BrandSection />

            {/* ── 4. BEST SELLERS ── */}
            <BestSellers />

            {/* ── 5. CATEGORY QUICK NAV ── */}
            <CategoriesNav />

            {/* ── 6. LIFESTYLE GALLERY ── */}
            <LifestyleGallery />

            {/* ── 7. FEATURED COLLECTION ── */}
            <FeaturedCollection />

            {/* ── 8. 2-PIECE BANNER ── */}
            <PieceBanner />

            {/* ── 9. WHY HTW ── */}
            <WhyHTW />

            {/* ── 10. TESTIMONIALS ── */}
            <Testimonials />

            {/* ── 11. AMBASSADORS STRIP ── */}
            <AmbassadorsStrip />

            {/* ── 12. FAQ ── */}
            <FAQSection />

            {/* ── 13. FINAL CTA ── */}
            <FinalCTA />

            {/* ── 14. EMAIL + WHATSAPP CAPTURE ── */}
            
        </div>
    )
}

export default HomePageContent