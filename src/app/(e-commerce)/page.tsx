import { getNavbarandFooter, getPageHomePage } from "@/src/action/pageController"
import HeroSection from "../../components/pages/home/hero-section"
import BestSellers from "../../components/pages/home/best-sellers"
import CategoriesNav from "../../components/pages/home/categories-nav"
import LifestyleGallery from "../../components/pages/home/lifestyle-gallery"
import FeaturedCollection from "../../components/pages/home/featured-collection"
import PieceBanner from "../../components/pages/home/piece-banner"
import WhyHTW from "../../components/pages/home/why-htw"
import Testimonials from "../../components/pages/home/testimonials"
import AmbassadorsStrip from "../../components/pages/home/ambassadors-strip"
import FAQSection from "../../components/pages/home/faqs"
import FinalCTA from "../../components/pages/home/final-cta"
import BrandSection from "../../components/pages/home/brand-section"
import TrustBar from "../../components/pages/home/trust-bar"
import EmailNWhatsApp from "../../components/pages/home/email-n-whatsapp"
import { ProductDetailProvider } from "../../hools/use-product-detail"
import { getProducts } from "@/src/action/productController"
import { getHashtags } from "@/src/action/hashtagController"
import { getStyles } from "@/src/action/styleController"
import { getAmbassadors } from "@/src/action/ambassadorController"
import { getTestimonials } from "@/src/action/testimonialController"
import "@icon/dashicons/dashicons.css"

export const metadata = { title: "Home - HTW — Hope's Trendy World" }

const MainPage = async () => {
    const homepage = await getPageHomePage()
    const { products:bestSellers } = await getProducts({
        badge: "bestseller",
    })
    const { products:featured } = await getProducts({
        badge: "featured",
    })
    const hashtags = await getHashtags()
    const styles = await getStyles()
    const ambassadors = await getAmbassadors()
    const testimonials = await getTestimonials()
    const navbarandfooter = await getNavbarandFooter()
    return (
        <main>
            <ProductDetailProvider mobileNumber={navbarandfooter.site_mobile_number}>
                <HeroSection heroSection={homepage.heroSection} />
                <TrustBar trustBar={homepage.trustBar} />
                <BrandSection ourMission={homepage.ourMission} />
                <BestSellers
                    title={homepage.otherTitles.trending_now_title}
                    description={homepage.otherTitles.trending_now_description}
                    mobileNumber={navbarandfooter.site_mobile_number}
                    products={bestSellers}
                />
                <CategoriesNav />
                <LifestyleGallery
                    title={homepage.otherTitles.styled_by_community_title}
                    description={homepage.otherTitles.styled_by_community_description}
                    hashtag={homepage.otherTitles.styled_by_community_hashtag}
                    facebookLink={homepage.otherTitles.styled_by_community_facebook_link}
                    instagramLink={homepage.otherTitles.styled_by_community_instagram_link}
                    styles={styles}
                />
                <FeaturedCollection
                    title={homepage.otherTitles.featured_collection_title}
                    description={homepage.otherTitles.featured_collection_description}
                    tagline={homepage.otherTitles.featured_collection_tagline}
                    mobileNumber={navbarandfooter.site_mobile_number}
                    products={featured}
                />
                <PieceBanner
                    title={homepage.otherTitles.shop_the_look_title}
                    description={homepage.otherTitles.shop_the_look_description}
                />
                <WhyHTW ourDifferences={homepage.ourDifferences} />
                <Testimonials
                    title={homepage.otherTitles.social_proof_title}
                    testimonials={testimonials}
                    hashtag={homepage.otherTitles.community_post_hashtag}
                    hashtags={hashtags}
                />
                <AmbassadorsStrip
                    title={homepage.otherTitles.representing_the_kingdom_title}
                    tagline={homepage.otherTitles.representing_the_kingdom_tagline}
                    ambassadors={ambassadors}
                />
                <FAQSection faqs={homepage.faqs} />
                <FinalCTA
                    title={homepage.otherTitles.call_to_action_title}
                    description={homepage.otherTitles.call_to_action_description}
                    buttonTitle={homepage.otherTitles.call_to_action_button_title}
                />
                <EmailNWhatsApp
                    title={homepage.otherTitles.stay_connected_title}
                    stayInTheLoop={homepage.otherTitles.stay_in_the_loop_title}
                    stayInTheLoopDescription={homepage.otherTitles.stay_in_the_loop_description}
                    getLaunched={homepage.otherTitles.get_launched_title}
                    getLaunchedDescription={homepage.otherTitles.get_launched_description}
                />
            </ProductDetailProvider>
        </main>
    )
}

export default MainPage
