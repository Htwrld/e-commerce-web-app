import { AmbassadorsPage } from "@/src/components/sections/AmbassadorsPage"
import { getAmbassadorsPage } from "@/src/action/pageController"

const HTWContactApp = async () => {
    const pageContent = await getAmbassadorsPage()
    return (
        <main>
            <AmbassadorsPage pageContent={pageContent} />
        </main>
    )
}

export default HTWContactApp
