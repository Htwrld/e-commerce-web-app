import { getContactPage } from "@/src/action/pageController"
import { ContactPage } from "@/src/components/sections/ContactPage"

export const metadata = { title: "Contact - HTW — Hope's Trendy World" }

const HTWContactApp = async () => {
    const pageContent = await getContactPage()
    return (
        <main>
            <ContactPage pageContent={pageContent} />
        </main>
    )
}

export default HTWContactApp
