import { FashionPage } from "@/src/components/sections/FashionPage"
import { getFashionPage } from "@/src/action/pageController"
import { getArticles } from "@/src/action/articleController"
import { getVideos } from "@/src/action/videoController"

export const metadata = { title: "Publishing - HTW — Hope's Trendy World" }

const HTWFashionApp = async () => {
    const [pageContent, { articles }, { videos }] = await Promise.all([
        getFashionPage(),
        getArticles(),
        getVideos(),
    ])
    return (
        <main>
            <FashionPage pageContent={pageContent} articles={articles} videos={videos} />
        </main>
    )
}

export default HTWFashionApp
