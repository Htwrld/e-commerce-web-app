import { getPageHomePage, getFashionPage } from "@/src/action/pageController"
import HeroSection from "../../components/pages/home/hero-section"
import { HomeEditorial } from "@/src/components/pages/home/home-editorial"
import { getProducts } from "@/src/action/productController"
import { getStyles } from "@/src/action/styleController"
import { getArticles } from "@/src/action/articleController"
import "@icon/dashicons/dashicons.css"

export const metadata = { title: "Home - HTW — Hope's Trendy World" }

const MainPage = async () => {
    const [homepage, { products }, styles, { articles }, publishing] = await Promise.all([
        getPageHomePage(),
        getProducts({ badge: "featured" }),
        getStyles(),
        getArticles(),
        getFashionPage(),
    ])
    return (
        <main>
            <HeroSection heroSection={homepage.heroSection} />
            <HomeEditorial
                products={products}
                styles={styles}
                articles={articles}
                publishing={publishing}
            />
        </main>
    )
}
export default MainPage
