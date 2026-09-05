import { AboutPage } from "@/src/components/sections/AboutPage"
import { getOurStoryPage } from "@/src/action/pageController"

export const metadata = { title: "About - HTW — Hope's Trendy World" }

const HTWContactApp = async () => {
    const pageContent = await getOurStoryPage()
    return (
        <main>
            <AboutPage pageContent={pageContent} />
        </main>
    )
}

export default HTWContactApp