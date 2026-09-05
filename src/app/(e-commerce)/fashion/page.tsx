import { FashionPage } from "@/src/components/sections/FashionPage"
import { getFashionPage } from "@/src/action/pageController"
import { getArticles } from "@/src/action/articleController"

export const metadata = { title: "Fashion - HTW — Hope's Trendy World" }

const HTWFashionApp = async () => {
    const pageContent = await getFashionPage()
    const { articles } = await getArticles({})
    return (
        <main>
            <FashionPage pageContent={pageContent} articles={articles} />
        </main>
    )
}

export default HTWFashionApp
