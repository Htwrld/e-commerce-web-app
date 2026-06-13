import { AboutPage } from "@/src/components/sections/AboutPage"
import { getOurStoryPage } from "@/src/action/pageController"

const HTWContactApp = async () => {
    const pageContent = await getOurStoryPage()
    return (
        <main>
            <AboutPage pageContent={pageContent} />
        </main>
    )
}

export default HTWContactApp