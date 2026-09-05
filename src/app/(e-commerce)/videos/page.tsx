import { getVideos } from "@/src/action/videoController"
import { VideosPage } from "@/src/components/sections/VideosPage"
import { Suspense } from "react"

export const metadata = { title: "Videos" }

const VideosRoute = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    const params = await searchParams
    const page = params.page as string
    const { videos, pages } = await getVideos({
        page: page ? parseInt(page) : undefined,
    })

    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <VideosPage videos={videos} pages={pages} />
            </Suspense>
        </main>
    )
}

export default VideosRoute
