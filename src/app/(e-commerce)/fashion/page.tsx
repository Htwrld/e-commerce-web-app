import { FashionPage } from "@/src/components/sections/FashionPage"
import { getFashionPage } from "@/src/action/pageController"

export const metadata = { title: "Fashion - HTW — Hope's Trendy World" }

const HTWFashionApp = async () => {
    const pageContent = await getFashionPage()
    return (
        <main>
            <FashionPage pageContent={pageContent} />
        </main>
    )
}

export default HTWFashionApp
