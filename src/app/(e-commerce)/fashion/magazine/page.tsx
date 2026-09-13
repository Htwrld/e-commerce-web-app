import { getFashionPage } from "@/src/action/pageController"
import { MagazineReader } from "@/src/components/sections/MagazineReader"

export const metadata = { title: "Read the Magazine - HTW — Hope's Trendy World" }

const MagazineReaderPage = async () => {
    const pageContent = await getFashionPage()
    return <MagazineReader pageContent={pageContent} />
}

export default MagazineReaderPage
