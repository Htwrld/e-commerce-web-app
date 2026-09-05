import { AmbassadorsPage } from "@/src/components/sections/AmbassadorsPage"
import { getAmbassadorsPage } from "@/src/action/pageController"
import { getAmbassadors } from "@/src/action/ambassadorController"

export const metadata = { title: "Ambassadors - HTW — Hope's Trendy World" }

const HTWContactApp = async () => {
    const pageContent = await getAmbassadorsPage()
    const ambassadors = await getAmbassadors()
    return (
        <main>
            <AmbassadorsPage pageContent={pageContent} ambassadors={ambassadors} />
        </main>
    )
}

export default HTWContactApp
