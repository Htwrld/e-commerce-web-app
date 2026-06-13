import { getContactPage } from "@/src/action/pageController"
import { ContactPage } from "@/src/components/sections/ContactPage"

const HTWContactApp = async () => {
    const pageContent = await getContactPage()
    return (
        <main>
            <ContactPage pageContent={pageContent} />
        </main>
    )
}

export default HTWContactApp
